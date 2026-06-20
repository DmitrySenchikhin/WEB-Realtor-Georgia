// Sends FCM push notifications when a favorited property's price changes.
//
// Compares the committed public/catalog.json against its previous git revision
// and publishes a message to topic `price_<id>` for each property whose price
// changed. iOS clients subscribe to these topics for their favorites.
//
// Auth: set the FCM_SERVICE_ACCOUNT env var to the JSON of a Firebase service
// account with the "Firebase Cloud Messaging API" enabled. The script no-ops
// (exit 0) when the secret or a previous catalog revision is unavailable, so it
// never blocks deploys.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import crypto from "node:crypto";

const CATALOG_PATH = "public/catalog.json";
const FCM_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";

function log(message) {
  console.log(`[notify-price-changes] ${message}`);
}

function readCurrentCatalog() {
  return JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
}

function readPreviousCatalog() {
  try {
    const raw = execSync(`git show HEAD~1:${CATALOG_PATH}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Reference price used for change detection and percentage calculation.
function referencePrice(property) {
  if (property.priceKind === "per") {
    return property.priceFromTotalGel ?? property.priceGel;
  }
  return property.priceGel;
}

function indexByID(catalog) {
  const map = new Map();
  for (const group of Object.values(catalog.groups ?? {})) {
    for (const property of group) {
      map.set(property.id, property);
    }
  }
  return map;
}

function titleFor(catalog, id) {
  const byLang = catalog.descriptions?.[id];
  return byLang?.ru?.title || byLang?.en?.title || id;
}

function detectChanges(previous, current) {
  const prevByID = indexByID(previous);
  const changes = [];

  for (const [id, property] of indexByID(current)) {
    const before = prevByID.get(id);
    if (!before) continue;

    const oldPrice = referencePrice(before);
    const newPrice = referencePrice(property);
    if (!oldPrice || !newPrice || oldPrice === newPrice) continue;

    const percent = Math.round((Math.abs(newPrice - oldPrice) / oldPrice) * 100);
    if (percent < 1) continue;

    changes.push({
      id,
      direction: newPrice < oldPrice ? "down" : "up",
      percent,
      title: titleFor(current, id),
    });
  }

  return changes;
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function fetchAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: FCM_SCOPE,
      aud: serviceAccount.token_uri,
      iat: now,
      exp: now + 3600,
    })
  );

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = base64url(signer.sign(serviceAccount.private_key));
  const assertion = `${header}.${claim}.${signature}`;

  const response = await fetch(serviceAccount.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${await response.text()}`);
  }

  return (await response.json()).access_token;
}

function buildMessage(change) {
  return {
    message: {
      topic: `price_${change.id}`,
      apns: {
        payload: {
          aps: {
            alert: {
              "title-loc-key": change.direction === "down" ? "PRICE_DROP_TITLE" : "PRICE_RISE_TITLE",
              "loc-key": "PRICE_BODY",
              "loc-args": [change.title, `${change.direction === "down" ? "\u2212" : "+"}${change.percent}%`],
            },
            sound: "default",
          },
        },
      },
      data: { property: change.id },
    },
  };
}

async function sendMessage(projectId, accessToken, change) {
  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildMessage(change)),
    }
  );

  if (!response.ok) {
    throw new Error(`Send failed for ${change.id}: ${response.status} ${await response.text()}`);
  }
}

async function main() {
  const rawServiceAccount = process.env.FCM_SERVICE_ACCOUNT;
  if (!rawServiceAccount) {
    log("FCM_SERVICE_ACCOUNT is not set; skipping notifications.");
    return;
  }

  const previous = readPreviousCatalog();
  if (!previous) {
    log("No previous catalog revision; skipping notifications.");
    return;
  }

  const changes = detectChanges(previous, readCurrentCatalog());
  if (changes.length === 0) {
    log("No price changes detected.");
    return;
  }

  const serviceAccount = JSON.parse(rawServiceAccount);
  const accessToken = await fetchAccessToken(serviceAccount);

  for (const change of changes) {
    await sendMessage(serviceAccount.project_id, accessToken, change);
    log(`Sent price_${change.id} (${change.direction} ${change.percent}%).`);
  }

  log(`Done. ${changes.length} notification(s) sent.`);
}

main().catch((error) => {
  console.error(`[notify-price-changes] ${error.message}`);
  process.exit(1);
});
