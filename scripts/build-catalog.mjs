#!/usr/bin/env node
/**
 * Сборка public/catalog.json из js/objects-catalog.js и description {ru,en,geo}/.
 * Сайт продолжает использовать objects-catalog.js; iOS-приложение — catalog.json.
 *
 * Запуск: node scripts/build-catalog.mjs
 *        npm run build:catalog
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const LANG_DIRS = {
  ru: "description ru",
  en: "description en",
  geo: "description geo",
};

function readObjectGroups() {
  const src = readFileSync(join(ROOT, "js/objects-catalog.js"), "utf8");
  const marker = "var DEFAULT_REALTOR_OBJECT_GROUPS = ";
  const start = src.indexOf(marker);
  if (start === -1) {
    throw new Error("DEFAULT_REALTOR_OBJECT_GROUPS not found in js/objects-catalog.js");
  }

  const objStart = start + marker.length;
  const endMarker = "\n  function cloneDefaultArray";
  const end = src.indexOf(endMarker, objStart);
  if (end === -1) {
    throw new Error("End of DEFAULT_REALTOR_OBJECT_GROUPS not found");
  }

  let objCode = src.slice(objStart, end).trim();
  if (objCode.endsWith(";")) {
    objCode = objCode.slice(0, -1);
  }

  return vm.runInNewContext("(" + objCode + ")", {}, {
    filename: "objects-catalog-groups.js",
  });
}

function readDescriptionIds() {
  const src = readFileSync(join(ROOT, "js/description-ids.js"), "utf8");
  const match = src.match(/REALTOR_DESCRIPTION_IDS\s*=\s*\[([\s\S]*?)\]/);
  if (!match) {
    throw new Error("REALTOR_DESCRIPTION_IDS not found in js/description-ids.js");
  }

  const ids = [];
  const re = /"([^"]+)"/g;
  let m;
  while ((m = re.exec(match[1])) !== null) {
    ids.push(m[1]);
  }
  return ids;
}

function loadDescriptions(ids) {
  const descriptions = {};
  const warnings = [];

  for (const id of ids) {
    descriptions[id] = {};
    for (const [lang, dirName] of Object.entries(LANG_DIRS)) {
      const filePath = join(ROOT, dirName, id + ".json");
      if (!existsSync(filePath)) {
        warnings.push("Missing " + dirName + "/" + id + ".json");
        continue;
      }
      descriptions[id][lang] = JSON.parse(readFileSync(filePath, "utf8"));
    }
  }

  return { descriptions, warnings };
}

function collectGroupIds(groups) {
  const ids = new Set();
  Object.values(groups).forEach(function (items) {
    if (!Array.isArray(items)) return;
    items.forEach(function (item) {
      if (item && item.id) ids.add(item.id);
    });
  });
  return ids;
}

function main() {
  const groups = readObjectGroups();
  const descriptionIds = readDescriptionIds();
  const { descriptions, warnings } = loadDescriptions(descriptionIds);

  const groupIds = collectGroupIds(groups);
  groupIds.forEach(function (id) {
    if (!descriptions[id]) {
      warnings.push('Object "' + id + '" is in catalog groups but missing from descriptions');
    }
  });

  descriptionIds.forEach(function (id) {
    if (!groupIds.has(id)) {
      warnings.push('Description "' + id + '" is registered but not present in any catalog group');
    }
  });

  const catalog = {
    version: new Date().toISOString().slice(0, 10),
    groups,
    descriptions,
  };

  const outPath = join(ROOT, "public/catalog.json");
  writeFileSync(outPath, JSON.stringify(catalog, null, 2) + "\n", "utf8");

  const objectCount = Object.values(groups).reduce(function (n, arr) {
    return n + (Array.isArray(arr) ? arr.length : 0);
  }, 0);

  console.log("Wrote " + outPath);
  console.log("  version: " + catalog.version);
  console.log("  objects: " + objectCount + " in " + Object.keys(groups).length + " groups");
  console.log("  descriptions: " + Object.keys(descriptions).length + " ids × 3 langs");

  if (warnings.length) {
    console.warn("Warnings:");
    warnings.forEach(function (w) {
      console.warn("  - " + w);
    });
    process.exitCode = 1;
  }
}

main();
