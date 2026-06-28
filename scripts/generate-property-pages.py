#!/usr/bin/env python3
"""Generate property/ share pages with Open Graph tags for messengers.

Reads public/catalog.json (same file as the iOS app). Run after build:catalog:

  npm run build:catalog
  python3 scripts/generate-property-pages.py

GitHub Actions runs this automatically before deploy.
"""

from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CATALOG = ROOT / "public" / "catalog.json"
DEFAULT_OUTPUT = ROOT / "property"
SITE_BASE = "https://realtorgeorgia.com"
GEL_PER_USD = 2.7
LANGS = ("ru", "en", "geo")

UI = {
    "ru": {
        "site_name": "RealtorGeorgia",
        "open_in_app": "Открыть в приложении",
        "area_label": "Площадь",
        "rooms_label": "Комнаты",
        "address_label": "Адрес",
        "from_prefix": "от",
        "per_m2": "м²",
        "app_cta_hint": "Скачайте RealtorGeorgia — недвижимость Батуми в кармане.",
    },
    "en": {
        "site_name": "RealtorGeorgia",
        "open_in_app": "Open in app",
        "area_label": "Area",
        "rooms_label": "Rooms",
        "address_label": "Address",
        "from_prefix": "from",
        "per_m2": "m²",
        "app_cta_hint": "Get RealtorGeorgia — Batumi real estate in your pocket.",
    },
    "geo": {
        "site_name": "RealtorGeorgia",
        "open_in_app": "აპში გახსნა",
        "area_label": "ფართობი",
        "rooms_label": "ოთახები",
        "address_label": "მისამართი",
        "from_prefix": "დან",
        "per_m2": "მ²",
        "app_cta_hint": "RealtorGeorgia — ბათუმის უძრავი ქონება თქვენს ტელეფონში.",
    },
}


def format_amount(value: float) -> str:
    return f"{int(round(value)):,}".replace(",", " ")


def display_value(gel: float, currency: str) -> float:
    return round(gel / GEL_PER_USD) if currency == "usd" else round(gel)


def format_line(gel: float, currency: str, kind: str, lang: str) -> str:
    symbol = "$" if currency == "usd" else "₾"
    amount = format_amount(display_value(gel, currency))
    if kind == "from":
        return f"{UI[lang]['from_prefix']} {symbol}{amount}"
    return f"{symbol}{amount}"


def format_per_square(gel: float, currency: str, lang: str, include_from: bool) -> str:
    symbol = "$" if currency == "usd" else "₾"
    amount = format_amount(display_value(gel, currency))
    price = f"{symbol}{amount}/{UI[lang]['per_m2']}"
    return f"{UI[lang]['from_prefix']} {price}" if include_from else price


def card_prices(property_data: dict, lang: str) -> tuple[str, str | None]:
    gel = float(property_data["priceGel"])
    price_kind = property_data.get("priceKind", "fixed")
    area = float(property_data.get("areaM2") or 0)

    if price_kind == "per":
        from_total = property_data.get("priceFromTotalGel")
        if from_total is None and area > 0:
            from_total = int(gel * area)
        if from_total is not None:
            return (
                format_line(float(from_total), "usd", "from", lang),
                format_per_square(gel, "usd", lang, include_from=False),
            )
        return format_per_square(gel, "usd", lang, include_from=True), None

    main = format_line(gel, "usd", "fixed", lang)
    if area <= 0:
        return main, None
    per_gel = gel / area
    sub = f"${format_amount(display_value(per_gel, 'usd'))}/м²"
    return main, sub


def formatted_area(area_m2: float, lang: str) -> str:
    suffix = UI[lang]["per_m2"]
    if area_m2 == int(area_m2):
        return f"{int(area_m2)} {suffix}"
    return f"{area_m2:.1f}".replace(".", ",") + f" {suffix}"


def resolve_photo_url(photo: dict) -> str:
    source = photo.get("thumb") or photo.get("src") or ""
    if source.startswith("http"):
        return source
    return f"{SITE_BASE}/{source.lstrip('/')}"


def page_url(property_id: str, lang: str) -> str:
    return f"{SITE_BASE}/property/{property_id}/{lang}.html"


def truncate(text: str, limit: int) -> str:
    text = re.sub(r"\s+", " ", text.strip())
    return text if len(text) <= limit else text[: limit - 1].rstrip() + "…"


def render_page(property_id: str, lang: str, property_data: dict, description: dict) -> str:
    title = description.get("title") or property_id
    address = description.get("address") or ""
    rooms = description.get("rooms") or ""
    body_text = description.get("description") or ""
    price_main, price_sub = card_prices(property_data, lang)
    area = formatted_area(float(property_data.get("areaM2") or 0), lang)
    specs = [price_main]
    if rooms:
        specs.append(rooms)
    specs.append(area)
    if price_sub:
        specs.append(price_sub)
    og_description = truncate(" · ".join(specs), 200)
    canonical = page_url(property_id, lang)
    photos = property_data.get("photos") or []
    image_url = resolve_photo_url(photos[0]) if photos else f"{SITE_BASE}/images/hero.jpg"
    ui = UI[lang]

    alt_links = "\n".join(
        f'  <link rel="alternate" hreflang="{alt}" href="{html.escape(page_url(property_id, alt))}">'
        for alt in LANGS
    )

    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)} — {html.escape(ui["site_name"])}</title>
  <meta name="description" content="{html.escape(og_description)}">
  <link rel="canonical" href="{html.escape(canonical)}">
{alt_links}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="{html.escape(ui["site_name"])}">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(og_description)}">
  <meta property="og:url" content="{html.escape(canonical)}">
  <meta property="og:image" content="{html.escape(image_url)}">
  <meta property="og:image:alt" content="{html.escape(title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(title)}">
  <meta name="twitter:description" content="{html.escape(og_description)}">
  <meta name="twitter:image" content="{html.escape(image_url)}">
  <style>
    :root {{ color-scheme: light dark; --bg: #fef6ee; --text: #2d1f1d; --muted: #6b5a57; --accent: #e05d2e; --card: #fff; --border: rgba(45,31,29,.12); }}
    @media (prefers-color-scheme: dark) {{ :root {{ --bg: #1a1413; --text: #f7efe8; --muted: #c4b5b0; --card: #241b19; }} }}
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); line-height: 1.5; }}
    main {{ max-width: 720px; margin: 0 auto; padding: 24px 16px 48px; }}
    .hero {{ width: 100%; aspect-ratio: 16/10; object-fit: cover; border-radius: 16px; display: block; }}
    h1 {{ font-size: 1.5rem; margin: 20px 0 8px; }}
    .price {{ font-size: 1.25rem; font-weight: 700; color: var(--accent); margin: 0 0 4px; }}
    .price-sub {{ color: var(--muted); margin: 0 0 16px; }}
    .specs {{ display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 0 0 16px; color: var(--muted); }}
    .card {{ background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; margin: 16px 0; }}
    .cta {{ display: inline-block; margin-top: 8px; padding: 12px 20px; border-radius: 999px; background: var(--accent); color: #fff; text-decoration: none; font-weight: 600; }}
    .hint {{ color: var(--muted); font-size: .9rem; margin-top: 24px; }}
  </style>
</head>
<body>
  <main>
    <img class="hero" src="{html.escape(image_url)}" alt="{html.escape(title)}" width="720" height="450">
    <h1>{html.escape(title)}</h1>
    <p class="price">{html.escape(price_main)}</p>
    {"<p class='price-sub'>" + html.escape(price_sub) + "</p>" if price_sub else ""}
    <div class="specs">
      <span>{html.escape(ui["area_label"])}: {html.escape(area)}</span>
      {"<span>" + html.escape(ui["rooms_label"]) + ": " + html.escape(rooms) + "</span>" if rooms else ""}
    </div>
    {"<div class='card'><strong>" + html.escape(ui["address_label"]) + "</strong><br>" + html.escape(address) + "</div>" if address else ""}
    {"<div class='card'>" + html.escape(truncate(body_text, 600)) + "</div>" if body_text else ""}
    <a class="cta" href="{html.escape(canonical)}">{html.escape(ui["open_in_app"])}</a>
    <p class="hint">{html.escape(ui["app_cta_hint"])}</p>
  </main>
</body>
</html>
"""


def generate(catalog_path: Path, output_dir: Path) -> int:
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    descriptions = catalog.get("descriptions") or {}
    count = 0

    for group_properties in catalog.get("groups", {}).values():
        for property_data in group_properties:
            property_id = property_data["id"]
            property_descriptions = descriptions.get(property_id) or {}
            property_dir = output_dir / property_id
            property_dir.mkdir(parents=True, exist_ok=True)

            for lang in LANGS:
                description = property_descriptions.get(lang) or property_descriptions.get("en") or {}
                (property_dir / f"{lang}.html").write_text(
                    render_page(property_id, lang, property_data, description),
                    encoding="utf-8",
                )
                count += 1

    return count


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--catalog", type=Path, default=DEFAULT_CATALOG)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    if not args.catalog.exists():
        raise SystemExit(f"Catalog not found: {args.catalog}. Run npm run build:catalog first.")

    if args.output.exists():
        import shutil
        shutil.rmtree(args.output)
    args.output.mkdir(parents=True)

    total = generate(args.catalog, args.output)
    print(f"Generated {total} property pages in {args.output.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
