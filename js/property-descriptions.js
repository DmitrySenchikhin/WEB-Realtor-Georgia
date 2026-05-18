(function () {
  "use strict";

  var GEL_PER_USD = 2.7;

  function formatAmount(value) {
    return Math.round(value).toLocaleString("ru-RU");
  }

  function gelToUsd(gel) {
    return Math.round(gel / GEL_PER_USD);
  }

  function gelToDisplay(gel, currency) {
    return currency === "usd" ? gelToUsd(gel) : Math.round(gel);
  }

  /**
   * Текст цены для карточек (по умолчанию USD, как в статичной вёрстке).
   * kind: "fixed" | "from" | "per"
   */
  function formatCardPriceLine(gel, currency, kind) {
    var sym = currency === "usd" ? "$" : "₾";
    var n = gelToDisplay(gel, currency);
    var formatted = formatAmount(n);
    if (kind === "per") return "от " + sym + formatted + "/м<sup>2</sup>";
    if (kind === "from") return "от " + sym + formatted;
    return sym + formatted;
  }

  function formatPerM2FromTotal(gelTotal, areaM2, currency) {
    if (!areaM2 || areaM2 <= 0) return "";
    var perGel = gelTotal / areaM2;
    var sym = currency === "usd" ? "$" : "₾";
    var n = gelToDisplay(perGel, currency);
    return sym + formatAmount(n) + "/м<sup>2</sup>";
  }

  function getCatalog() {
    return typeof window !== "undefined" && window.REALTOR_OBJECT_GROUPS
      ? window.REALTOR_OBJECT_GROUPS
      : {};
  }

  function findObjectById(id) {
    if (!id) return null;
    var cat = getCatalog();
    var keys = ["new-building", "apartments", "house"];
    for (var i = 0; i < keys.length; i++) {
      var list = cat[keys[i]];
      if (!Array.isArray(list)) continue;
      for (var j = 0; j < list.length; j++) {
        if (list[j] && list[j].id === id) return list[j];
      }
    }
    return null;
  }

  function mixedObjectsList(count) {
    var cat = getCatalog();
    var nb = cat["new-building"] || [];
    var apt = cat.apartments || [];
    var ho = cat.house || [];
    var seq = [nb, apt, ho];
    var out = [];
    var i = 0;
    var guard = 0;
    while (out.length < count && guard < count * 6) {
      guard++;
      var list = seq[i % 3];
      if (list.length) {
        var idx = ((i / 3) | 0) % list.length;
        out.push(list[idx]);
      }
      i++;
    }
    return out;
  }

  /** Все объекты каталога в порядке групп (новые добавляйте в конец массива группы). */
  function flattenCatalogObjects() {
    var cat = getCatalog();
    var keys = ["new-building", "apartments", "house"];
    var out = [];
    for (var i = 0; i < keys.length; i++) {
      var list = cat[keys[i]] || [];
      for (var j = 0; j < list.length; j++) {
        if (list[j]) out.push(list[j]);
      }
    }
    return out;
  }

  /**
   * Смешанный список: сначала lead (если задан), затем последние autoNewSlots объектов каталога,
   * остальные слоты — чередование mixedObjectsList без дубликатов.
   */
  function mixedWithAutoNew(count, autoNewSlots, leadId) {
    var out = [];
    var used = {};

    function pushUnique(obj) {
      if (!obj || !obj.id || used[obj.id] || out.length >= count) return;
      used[obj.id] = true;
      out.push(obj);
    }

    if (leadId) {
      pushUnique(findObjectById(leadId));
    }

    if (autoNewSlots > 0) {
      var all = flattenCatalogObjects();
      var newest = all.slice(-autoNewSlots).reverse();
      for (var n = 0; n < newest.length; n++) {
        pushUnique(newest[n]);
      }
    }

    var guard = 0;
    while (out.length < count && guard < count * 8) {
      guard++;
      var mixed = mixedObjectsList(count);
      for (var m = 0; m < mixed.length; m++) {
        pushUnique(mixed[m]);
        if (out.length >= count) break;
      }
      if (!mixed.length) break;
    }

    return out.slice(0, count);
  }

  function parseAutoNewSlots(section) {
    if (!section || !section.hasAttribute("data-property-card-auto-new")) return 0;
    var raw = section.getAttribute("data-property-card-auto-new");
    if (raw === "" || raw === "true") return 3;
    var n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function listForGroup(groupKey, count, leadId, autoNewSlots) {
    var out;
    var slots = autoNewSlots || 0;
    if (groupKey === "mixed" && (slots > 0 || leadId)) {
      out = mixedWithAutoNew(count, slots, leadId || null);
    } else if (groupKey === "mixed") {
      out = mixedObjectsList(count);
    } else {
      var list = getCatalog()[groupKey] || [];
      out = [];
      if (!list.length) return out;
      for (var i = 0; i < count; i++) {
        out.push(list[i % list.length]);
      }
    }
    if (groupKey === "mixed" || !leadId) return out;
    var lead = findObjectById(leadId);
    if (!lead) return out;
    out = out.filter(function (o) {
      return o && o.id !== leadId;
    });
    out.unshift(lead);
    return out.slice(0, count);
  }

  function rawDetailHrefFor(obj) {
    if (!obj) return "";
    if (obj.detailHref) return obj.detailHref;
    if (obj.id && String(obj.id).indexOf("nb-") === 0) {
      if (obj.id === "nb-stay-rent") return "new-building-stay-rent.html";
      return "new-building.html";
    }
    if (obj.id && String(obj.id).indexOf("apt-") === 0) return "apartment.html";
    return "";
  }

  /**
   * Для страниц карточки объекта (новостройка / квартира) добавляет ?id=… из каталога.
   */
  function withCatalogIdQueryOnDetailPage(href, obj) {
    if (!href || !obj || !obj.id) return href || "";
    var hash = "";
    var base = href;
    var hi = base.indexOf("#");
    if (hi >= 0) {
      hash = base.slice(hi);
      base = base.slice(0, hi);
    }
    var qi = base.indexOf("?");
    if (qi >= 0) base = base.slice(0, qi);
    var file = base.split("/").pop() || base;
    if (
      file !== "new-building.html" &&
      file !== "new-building-2.html" &&
      file !== "new-building-stay-rent.html" &&
      file !== "apartment.html"
    ) {
      return href;
    }
    return base + "?id=" + encodeURIComponent(obj.id) + hash;
  }

  function detailHrefFor(obj) {
    return withCatalogIdQueryOnDetailPage(rawDetailHrefFor(obj), obj);
  }

  function getCardBodies(card) {
    var bodies = [];
    var direct = card.querySelector(":scope > .card__body");
    if (direct) bodies.push(direct);
    var link = card.querySelector(":scope > a.card__body-link");
    if (link) {
      var inner = link.querySelector(".card__body");
      if (inner) bodies.push(inner);
    }
    return bodies;
  }

  function injectCardPrices(card, obj) {
    if (!obj || obj.priceGel == null || !Number.isFinite(Number(obj.priceGel))) return;

    var currency = "usd";
    var gel = Number(obj.priceGel);
    var pk = obj.priceKind || "fixed";
    var gelFromTotal =
      obj.priceFromTotalGel != null && Number.isFinite(Number(obj.priceFromTotalGel))
        ? Number(obj.priceFromTotalGel)
        : NaN;

    var bodies = getCardBodies(card);
    if (!bodies.length) {
      var fallback = card.querySelector(".card__body");
      if (fallback) bodies = [fallback];
    }

    bodies.forEach(function (body) {
      var box = body.querySelector(".card__price");
      if (!box) return;
      var mainEl = box.querySelector(".card__price-main");
      var subEl = box.querySelector(".card__price-sub");
      if (!mainEl || !subEl) return;

      card.setAttribute("data-catalog-prices", "1");
      subEl.style.display = "";

      if (pk === "per" && Number.isFinite(gelFromTotal)) {
        mainEl.innerHTML = formatCardPriceLine(gelFromTotal, currency, "from");
        subEl.innerHTML = formatCardPriceLine(gel, currency, "per");
      } else if (pk === "per") {
        mainEl.innerHTML = formatCardPriceLine(gel, currency, "per");
        subEl.textContent = "";
        subEl.style.display = "none";
      } else if (pk === "from") {
        mainEl.innerHTML = formatCardPriceLine(gel, currency, "from");
        subEl.textContent = "";
        subEl.style.display = "none";
      } else {
        mainEl.innerHTML = formatCardPriceLine(gel, currency, "fixed");
        var subLine = formatPerM2FromTotal(gel, obj.areaM2, currency);
        if (subLine) {
          subEl.style.display = "";
          subEl.innerHTML = subLine;
        } else {
          subEl.textContent = "";
          subEl.style.display = "none";
        }
      }
    });
  }

  function injectCardMeta(card, obj) {
    if (!obj) return;
    var bodies = getCardBodies(card);
    if (!bodies.length) {
      var fb = card.querySelector(".card__body");
      if (fb) bodies = [fb];
    }
    bodies.forEach(function (body) {
      var locEl = body.querySelector(".card__loc");
      if (locEl && obj.geo && obj.geo.mapsUrl) {
        var murl = String(obj.geo.mapsUrl).trim();
        if (murl) {
          if (locEl.tagName === "A") {
            locEl.href = murl;
            if (!locEl.classList.contains("card__loc--maplink")) {
              locEl.classList.add("card__loc--maplink");
            }
          } else {
            var link = document.createElement("a");
            link.className = (locEl.className + " card__loc--maplink").trim();
            link.href = murl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.setAttribute("aria-label", "Открыть на карте: " + (obj.title || "объект"));
            while (locEl.firstChild) link.appendChild(locEl.firstChild);
            locEl.parentNode.replaceChild(link, locEl);
          }
        }
      }
      var locSpan = body.querySelector(".card__loc span");
      if (locSpan && obj.geo && obj.geo.address) {
        locSpan.textContent = obj.geo.address;
      }
      var items = body.querySelectorAll(".card__meta .card__meta-item");
      if (items[0] && obj.rooms != null && String(obj.rooms).trim()) {
        var svg0 = items[0].querySelector("svg");
        items[0].textContent = "";
        if (svg0) items[0].appendChild(svg0);
        items[0].appendChild(
          document.createTextNode(" " + String(obj.rooms).trim().replace(/-/g, "–"))
        );
      }
      if (items[1] && obj.areaM2 != null && Number.isFinite(Number(obj.areaM2))) {
        var svg1 = items[1].querySelector("svg");
        var am = Math.round(Number(obj.areaM2));
        items[1].textContent = "";
        if (svg1) items[1].appendChild(svg1);
        items[1].insertAdjacentHTML("beforeend", " " + am + " м<sup>2</sup>");
      }
    });
  }

  function firstDirectPropertyImg(box) {
    if (!box) return null;
    for (var ci = 0; ci < box.children.length; ci++) {
      var ch = box.children[ci];
      if (ch.tagName !== "IMG") continue;
      if (ch.classList.contains("card__img-layer")) continue;
      if (ch.classList.contains("card__photo-gallery__live")) continue;
      return ch;
    }
    return null;
  }

  /**
   * Нормализованный список фото из каталога (как для карточек и страницы объекта).
   */
  function photoItemsFromObject(obj) {
    if (!obj || !Array.isArray(obj.photos) || !obj.photos.length) return [];

    function entryAt(i) {
      var p = obj.photos[i];
      if (!p) return null;
      if (typeof p === "string") return { src: p, name: "" };
      var src = p.src != null ? String(p.src).trim() : "";
      if (!src) return null;
      var fit = p.fit === "contain" ? "contain" : "";
      return {
        src: src,
        name: p.name != null ? String(p.name).trim() : "",
        fit: fit,
      };
    }

    var items = [];
    for (var pi = 0; pi < obj.photos.length; pi++) {
      var ent = entryAt(pi);
      if (ent) items.push(ent);
    }
    return items;
  }

  function applyPhotoDisplay(img, item, container) {
    if (!img) return;
    var contain = item && item.fit === "contain";
    img.classList.toggle("property-photo--contain", contain);
    if (!container) return;
    if (container.classList.contains("card__photo")) {
      container.classList.toggle("card__photo--fit-contain", contain);
    }
    if (
      container.classList.contains("nb-hero") ||
      container.classList.contains("nb-obj21__hero")
    ) {
      container.classList.toggle("nb-hero--fit-contain", contain);
    }
  }

  /**
   * Галерея героя на странице объекта: стрелки, счётчик «n / m», свайп; для Object-2.1 — существующие кнопки и полоски.
   */
  function setupDetailPagePhotoGallery(heroMount, imgEl, items, altBase) {
    if (!heroMount || !imgEl || !items || items.length < 2) return;
    if (heroMount.getAttribute("data-hero-gallery-init") === "1") return;
    heroMount.setAttribute("data-hero-gallery-init", "1");

    var isObj21 = heroMount.classList.contains("nb-obj21__hero");
    if (isObj21) {
      heroMount.classList.add("nb-obj21__hero--gallery");
    } else {
      heroMount.classList.add("nb-hero--gallery");
    }

    var idx = 0;
    var counter = null;
    var dotSpans = [];

    function render() {
      var it = items[idx];
      imgEl.setAttribute("src", it.src);
      imgEl.setAttribute("alt", it.name || altBase);
      applyPhotoDisplay(imgEl, it, heroMount);
      if (counter) counter.textContent = idx + 1 + " / " + items.length;
      for (var di = 0; di < dotSpans.length; di++) {
        dotSpans[di].classList.toggle("is-active", di === idx);
      }
    }

    function go(delta) {
      idx = (idx + delta + items.length) % items.length;
      render();
    }

    function stopNav(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isObj21) {
      var lines = heroMount.querySelector(".nb-obj21__hero-lines");
      if (lines) {
        lines.textContent = "";
        lines.classList.toggle("nb-obj21__hero-lines--many", items.length > 8);
        for (var li = 0; li < items.length; li++) {
          var sp = document.createElement("span");
          if (li === 0) sp.classList.add("is-active");
          lines.appendChild(sp);
          dotSpans.push(sp);
        }
      }

      counter = document.createElement("span");
      counter.className = "nb-obj21__hero-counter";
      counter.setAttribute("aria-live", "polite");
      heroMount.appendChild(counter);

      var prevBtn = heroMount.querySelector(".nb-obj21__hero-nav--prev");
      var nextBtn = heroMount.querySelector(".nb-obj21__hero-nav--next");
      if (prevBtn) prevBtn.addEventListener("click", function (e) { stopNav(e); go(-1); });
      if (nextBtn) nextBtn.addEventListener("click", function (e) { stopNav(e); go(1); });
    } else {
      var dots = heroMount.querySelector(".nb-hero__dots");
      if (dots) dots.style.display = "none";

      function mount(el) {
        heroMount.appendChild(el);
      }

      var prev = document.createElement("button");
      prev.type = "button";
      prev.className = "card__photo-gallery__btn card__photo-gallery__btn--prev";
      prev.setAttribute("aria-label", "Предыдущее фото");
      prev.innerHTML = '<img src="images/arrow-left.svg" alt="" width="20" height="20" />';

      var next = document.createElement("button");
      next.type = "button";
      next.className = "card__photo-gallery__btn card__photo-gallery__btn--next";
      next.setAttribute("aria-label", "Следующее фото");
      next.innerHTML = '<img src="images/arrow-right.svg" alt="" width="20" height="20" />';

      counter = document.createElement("span");
      counter.className = "card__photo-gallery__counter";
      counter.setAttribute("aria-live", "polite");

      mount(prev);
      mount(next);
      mount(counter);

      prev.addEventListener("click", function (e) {
        stopNav(e);
        go(-1);
      });
      next.addEventListener("click", function (e) {
        stopNav(e);
        go(1);
      });
    }

    var touchStartX = null;
    heroMount.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    heroMount.addEventListener(
      "touchend",
      function (e) {
        if (touchStartX == null) return;
        var t = e.changedTouches[0];
        if (!t) {
          touchStartX = null;
          return;
        }
        var dx = t.clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) < 48) return;
        e.stopPropagation();
        if (dx > 0) go(-1);
        else go(1);
      },
      { passive: true }
    );

    render();
  }

  function initCatalogDetailHero(root, obj) {
    var heroMount = root.querySelector(".nb-obj21__hero") || root.querySelector(".nb-hero");
    var imgEl = root.querySelector(".nb-hero__img, .nb-obj21__hero-img");
    if (!heroMount || !imgEl || !obj) return;

    var items = photoItemsFromObject(obj);
    var altBase = obj.title || "Фото объекта";

    if (!items.length) return;

    imgEl.setAttribute("src", items[0].src);
    imgEl.setAttribute("alt", items[0].name || altBase);
    applyPhotoDisplay(imgEl, items[0], heroMount);

    if (items.length >= 2) {
      setupDetailPagePhotoGallery(heroMount, imgEl, items, altBase);
    }
  }

  /**
   * Стрелки, счётчик и свайп по фото каталога (без открытия модалки описания).
   */
  function setupCardPhotoGallery(card, box, items, altBase, liveImg) {
    if (!box || !liveImg || !items || items.length < 2) return;
    if (box.getAttribute("data-gallery-init") === "1") return;
    box.setAttribute("data-gallery-init", "1");

    if (card.classList.contains("card--linkable")) {
      card.classList.add("card--photo-gallery");
    }

    function mountUi(el) {
      box.appendChild(el);
    }

    var prev = document.createElement("button");
    prev.type = "button";
    prev.className = "card__photo-gallery__btn card__photo-gallery__btn--prev";
    prev.setAttribute("aria-label", "Предыдущее фото");
    prev.innerHTML = '<img src="images/arrow-left.svg" alt="" width="20" height="20" />';

    var next = document.createElement("button");
    next.type = "button";
    next.className = "card__photo-gallery__btn card__photo-gallery__btn--next";
    next.setAttribute("aria-label", "Следующее фото");
    next.innerHTML = '<img src="images/arrow-right.svg" alt="" width="20" height="20" />';

    var counter = document.createElement("span");
    counter.className = "card__photo-gallery__counter";
    counter.setAttribute("aria-live", "polite");

    mountUi(prev);
    mountUi(next);
    mountUi(counter);

    var idx = 0;

    function render() {
      var it = items[idx];
      liveImg.src = it.src;
      liveImg.alt = it.name || altBase;
      applyPhotoDisplay(liveImg, it, box);
      counter.textContent = idx + 1 + " / " + items.length;
    }

    function go(delta) {
      idx = (idx + delta + items.length) % items.length;
      render();
    }

    function stopCardModal(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    prev.addEventListener("click", function (e) {
      stopCardModal(e);
      go(-1);
    });
    next.addEventListener("click", function (e) {
      stopCardModal(e);
      go(1);
    });

    liveImg.addEventListener("click", stopCardModal);

    var touchStartX = null;
    box.addEventListener(
      "touchstart",
      function (e) {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    box.addEventListener(
      "touchend",
      function (e) {
        if (touchStartX == null) return;
        var t = e.changedTouches[0];
        if (!t) {
          touchStartX = null;
          return;
        }
        var dx = t.clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(dx) < 48) return;
        e.stopPropagation();
        if (dx > 0) go(-1);
        else go(1);
      },
      { passive: true }
    );

    render();
  }

  /**
   * Подставляет в карточку превью из каталога; при нескольких снимках — листание по зоне фото.
   */
  function injectCardPhotos(card, obj) {
    var box = card.querySelector(".card__photo");
    if (!box) return;

    var items = photoItemsFromObject(obj);
    if (!items.length) return;

    var first = items[0];
    var second = items[1] || first;
    var altBase = obj.title || "Фото объекта";
    var layers = box.querySelectorAll("img.card__img-layer");

    if (items.length >= 2) {
      box.classList.add("card__photo--gallery");
      layers.forEach(function (layer) {
        layer.style.display = "none";
      });

      var liveImg = box.querySelector("img.card__photo-gallery__live");
      if (!liveImg) {
        var solo = firstDirectPropertyImg(box);
        if (solo) {
          liveImg = solo;
          liveImg.classList.add("card__photo-gallery__live");
        } else {
          liveImg = document.createElement("img");
          liveImg.className = "card__photo-gallery__live";
          liveImg.decoding = "async";
          box.insertBefore(liveImg, box.firstChild);
        }
      }
      liveImg.style.display = "";
      liveImg.src = first.src;
      liveImg.alt = first.name || altBase;
      applyPhotoDisplay(liveImg, first, box);
      setupCardPhotoGallery(card, box, items, altBase, liveImg);
      card.setAttribute("data-catalog-photos", "1");
      return;
    }

    if (layers.length >= 2) {
      layers[0].src = first.src;
      layers[0].alt = first.name || altBase;
      applyPhotoDisplay(layers[0], first, box);
      layers[1].src = second.src;
      layers[1].alt = second.name || altBase;
      applyPhotoDisplay(layers[1], second, box);
      card.setAttribute("data-catalog-photos", "1");
      return;
    }

    var img = firstDirectPropertyImg(box);
    if (img) {
      img.src = first.src;
      img.alt = first.name || altBase;
      applyPhotoDisplay(img, first, box);
      card.setAttribute("data-catalog-photos", "1");
    }
  }

  function injectCatalogCardLinks(card, obj) {
    if (!obj) return;
    var href = detailHrefFor(obj);
    if (!href) return;
    card.querySelectorAll("a.card__photo-overlay, a.card__body-link").forEach(function (a) {
      a.setAttribute("href", href);
    });
  }

  function injectCardDescription(card, obj) {
    if (!obj || !obj.description) return;
    var text = String(obj.description).trim();
    if (!text) return;

    var bodies = getCardBodies(card);
    if (!bodies.length) return;

    var detailHref = detailHrefFor(obj);
    var title = obj.title || "Объект";

    bodies.forEach(function (body) {
      if (body.querySelector(".card__desc")) return;
      body.classList.add("card__body--with-desc");
      var p = document.createElement("p");
      p.className = "card__desc card__desc--preview";
      p.textContent = text;
      body.appendChild(p);
    });

    card.setAttribute("data-desc-title", title);
    card.setAttribute("data-desc-text", text);
    if (detailHref) card.setAttribute("data-desc-href", detailHref);
    else card.removeAttribute("data-desc-href");
  }

  var CARD_META_ICONS =
    '<span class="card__meta-item">' +
    '<svg class="icon" viewBox="0 0 15 15" width="15" height="15" aria-hidden="true">' +
    '<rect width="15" height="15" rx="2" fill="#fef6ee" />' +
    '<path fill="#e05d2e" d="M8 2h4v5H8V2z" />' +
    '<path fill="none" stroke="#2d1f1d" stroke-width="1.2" d="M3 6h6v6H3z" />' +
    "</svg> 4 комнаты</span>" +
    '<span class="card__meta-item">' +
    '<svg class="icon" viewBox="0 0 15 15" width="15" height="15" aria-hidden="true">' +
    '<rect width="15" height="15" rx="2" fill="#fef6ee" />' +
    '<path stroke="#e05d2e" stroke-width="1.5" fill="none" d="M4 11V5M11 4v6" />' +
    '<circle cx="7.5" cy="7.5" r="2" fill="#e05d2e" />' +
    "</svg> 40 м<sup>2</sup></span>";

  function createSearchResultCard(obj) {
    var href = detailHrefFor(obj);
    var card = document.createElement("article");
    card.className = "card card--linkable";

    var photo = document.createElement("div");
    photo.className = "card__photo";
    var img = document.createElement("img");
    img.alt = obj.title || "Объект";
    photo.appendChild(img);
    var overlay = document.createElement("a");
    overlay.className = "card__photo-overlay";
    overlay.href = href;
    overlay.setAttribute("aria-label", "Открыть: " + (obj.title || "объект"));
    photo.appendChild(overlay);
    card.appendChild(photo);

    var bodyLink = document.createElement("a");
    bodyLink.className = "card__body-link";
    bodyLink.href = href;

    var body = document.createElement("div");
    body.className = "card__body";
    body.innerHTML =
      '<div class="card__loc"><img src="images/pin.svg" alt="" width="13" height="15" /><span>Батуми</span></div>' +
      '<div class="card__meta">' +
      CARD_META_ICONS +
      "</div>" +
      '<div class="card__price"><p class="card__price-main">$0</p><p class="card__price-sub"></p></div>';

    bodyLink.appendChild(body);
    card.appendChild(bodyLink);

    injectCardPhotos(card, obj);
    injectCardPrices(card, obj);
    injectCardMeta(card, obj);
    injectCatalogCardLinks(card, obj);
    injectCardDescription(card, obj);

    return card;
  }

  function formatResultsCount(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    var word = "объектов";
    if (mod100 >= 11 && mod100 <= 14) word = "объектов";
    else if (mod10 === 1) word = "объект";
    else if (mod10 >= 2 && mod10 <= 4) word = "объекта";
    return n + " " + word;
  }

  function renderSearchResults(groupKey) {
    var grid = document.querySelector("[data-search-results-grid]");
    if (!grid) return;

    var list = getCatalog()[groupKey] || [];
    grid.innerHTML = "";

    list.forEach(function (obj) {
      if (obj) grid.appendChild(createSearchResultCard(obj));
    });

    var countEl = document.querySelector(".search-toolbar__count");
    if (countEl) {
      countEl.textContent = formatResultsCount(list.length);
    }

    var pagination = document.querySelector("[data-search-pagination]");
    if (pagination) {
      pagination.hidden = list.length > 0;
    }
  }

  function setSearchFilterActive(groupKey) {
    document.querySelectorAll("[data-search-filter]").forEach(function (btn) {
      var active = btn.getAttribute("data-search-filter") === groupKey;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function initSearchPage() {
    var page = document.querySelector(".page--search");
    if (!page || !document.querySelector("[data-search-results-grid]")) return;

    var filters = document.querySelectorAll("[data-search-filter]");
    if (!filters.length) return;

    var initial = "apartments";
    try {
      var qp = new URLSearchParams(window.location.search).get("type");
      if (qp && getCatalog()[qp]) initial = qp;
    } catch (eQ) {}

    function applyFilter(groupKey) {
      setSearchFilterActive(groupKey);
      renderSearchResults(groupKey);
      try {
        var url = new URL(window.location.href);
        url.searchParams.set("type", groupKey);
        window.history.replaceState(null, "", url.pathname + "?" + url.searchParams.toString());
      } catch (eU) {}
    }

    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-search-filter");
        if (!key) return;
        applyFilter(key);
      });
    });

    applyFilter(initial);
  }

  function initCatalogSections() {
    document.querySelectorAll("[data-property-card-group]").forEach(function (section) {
      if (section.hasAttribute("data-search-results")) return;
      var key = section.getAttribute("data-property-card-group");
      if (!key) return;
      var track =
        section.querySelector(".carousel__track[data-carousel-track]") ||
        section.querySelector(".carousel__track") ||
        section.querySelector(".search-results__grid") ||
        section;
      var cards = track.querySelectorAll(":scope > .card, :scope > article.card");
      var leadId = section.getAttribute("data-property-card-lead") || "";
      var autoNewSlots = parseAutoNewSlots(section);
      var list = listForGroup(key, cards.length, leadId || null, autoNewSlots);
      cards.forEach(function (card, idx) {
        var obj = list[idx];
        if (obj) injectCardPrices(card, obj);
        if (obj) injectCardMeta(card, obj);
        if (obj) injectCardPhotos(card, obj);
        if (obj) injectCatalogCardLinks(card, obj);
        injectCardDescription(card, obj);
      });
    });
  }

  var modalEl = null;
  var lastFocus = null;

  function ensureModal() {
    if (modalEl) return modalEl;
    var root = document.createElement("div");
    root.id = "property-desc-modal";
    root.className = "property-desc-modal";
    root.setAttribute("hidden", "");
    root.innerHTML =
      '<div class="property-desc-modal__backdrop" tabindex="-1"></div>' +
      '<div class="property-desc-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="property-desc-modal-title">' +
      '<button type="button" class="property-desc-modal__close" aria-label="Закрыть">&times;</button>' +
      '<h2 id="property-desc-modal-title" class="property-desc-modal__title"></h2>' +
      '<div class="property-desc-modal__body"></div>' +
      '<a class="property-desc-modal__link" href="#" hidden>Перейти к объекту</a>' +
      "</div>";
    document.body.appendChild(root);
    modalEl = root;

    root.querySelector(".property-desc-modal__backdrop").addEventListener("click", closeModal);
    root.querySelector(".property-desc-modal__close").addEventListener("click", closeModal);
    root.querySelector(".property-desc-modal__link").addEventListener("click", function () {
      closeModal();
    });
    return root;
  }

  function openModal(title, text, href) {
    var root = ensureModal();
    var h = root.querySelector(".property-desc-modal__title");
    var b = root.querySelector(".property-desc-modal__body");
    var a = root.querySelector(".property-desc-modal__link");
    h.textContent = title || "Описание";
    b.textContent = text || "";
    if (href) {
      a.removeAttribute("hidden");
      a.setAttribute("href", href);
    } else {
      a.setAttribute("hidden", "");
      a.removeAttribute("href");
    }
    root.removeAttribute("hidden");
    document.body.classList.add("property-desc-modal-open");
    lastFocus = document.activeElement;
    root.querySelector(".property-desc-modal__close").focus();
  }

  function closeModal() {
    if (!modalEl || modalEl.hasAttribute("hidden")) return;
    modalEl.setAttribute("hidden", "");
    document.body.classList.remove("property-desc-modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  }

  function openFromCard(card) {
    var title = card.getAttribute("data-desc-title") || "Объект";
    var text = card.getAttribute("data-desc-text") || "";
    var href = card.getAttribute("data-desc-href") || "";
    if (!text) return;
    openModal(title, text, href);
  }

  function initCardInteractions() {
    document.addEventListener(
      "click",
      function (e) {
        var card = e.target.closest(".card[data-desc-text]");
        if (!card) return;
        if (e.target.closest(".card__photo-gallery__btn")) return;
        if (e.target.closest("a.card__loc--maplink")) return;

        var href = card.getAttribute("data-desc-href") || "";

        if (href) {
          if (e.target.closest("a.card__body-link, a.card__photo-overlay")) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          window.location.assign(href);
          return;
        }

        if (e.target.closest("a.card__body-link, a.card__photo-overlay")) {
          e.preventDefault();
          e.stopPropagation();
        }
        openFromCard(card);
      },
      true
    );

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  function removeNbLocationMapExtras(root) {
    root.querySelectorAll(".nb-location__map-external").forEach(function (n) {
      if (n.parentNode) n.parentNode.removeChild(n);
    });
  }

  /**
   * Карта Mapbox по geo.lat / geo.lng; при отсутствии токена или GL — превью + опционально mapsUrl.
   */
  function initCatalogLocationMap(root, obj) {
    var mapWrap = root.querySelector(".nb-location__map");
    if (!mapWrap) return;

    removeNbLocationMapExtras(root);

    if (mapWrap._nbMapboxResizeObserver) {
      try {
        mapWrap._nbMapboxResizeObserver.disconnect();
      } catch (eR) {}
      mapWrap._nbMapboxResizeObserver = null;
    }
    if (mapWrap._nbMapboxMap) {
      try {
        mapWrap._nbMapboxMap.remove();
      } catch (eM) {}
      mapWrap._nbMapboxMap = null;
    }
    if (mapWrap._nbMapboxResizeHandler) {
      window.removeEventListener("resize", mapWrap._nbMapboxResizeHandler);
      mapWrap._nbMapboxResizeHandler = null;
    }

    if (!obj || !obj.geo) return;

    var lat = Number(obj.geo.lat);
    var lng = Number(obj.geo.lng);
    var hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
    var token =
      typeof window !== "undefined" && typeof window.MAPBOX_ACCESS_TOKEN === "string"
        ? String(window.MAPBOX_ACCESS_TOKEN).trim()
        : "";
    var mapboxReady = hasCoords && Boolean(token) && typeof mapboxgl !== "undefined";

    var fallbackHtml = mapWrap.innerHTML;
    var mapsUrlTrim = obj.geo.mapsUrl ? String(obj.geo.mapsUrl).trim() : "";

    if (!mapboxReady) {
      if (mapsUrlTrim && !mapWrap.querySelector("a.nb-location__map-link")) {
        var frag = document.createDocumentFragment();
        while (mapWrap.firstChild) frag.appendChild(mapWrap.firstChild);
        var mapA = document.createElement("a");
        mapA.className = "nb-location__map-link";
        mapA.href = mapsUrlTrim;
        mapA.target = "_blank";
        mapA.rel = "noopener noreferrer";
        mapA.setAttribute("aria-label", "Открыть объект на карте: " + (obj.title || ""));
        mapA.appendChild(frag);
        mapWrap.appendChild(mapA);
      }
      return;
    }

    try {
      while (mapWrap.firstChild) mapWrap.removeChild(mapWrap.firstChild);

      var mount = document.createElement("div");
      mount.className = "nb-location__mapbox";
      mount.setAttribute(
        "aria-label",
        "Карта: " + (obj.geo.address || obj.title || "объект")
      );
      mapWrap.appendChild(mount);

      mapboxgl.accessToken = token;
      var map = new mapboxgl.Map({
        container: mount,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 15.2,
        attributionControl: true,
      });
      map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "top-right");
      new mapboxgl.Marker({ color: "#e05d2e" }).setLngLat([lng, lat]).addTo(map);

      function doResize() {
        try {
          map.resize();
        } catch (eZ) {}
      }

      map.on("load", doResize);

      if (typeof ResizeObserver !== "undefined") {
        var ro = new ResizeObserver(doResize);
        ro.observe(mapWrap);
        mapWrap._nbMapboxResizeObserver = ro;
      } else {
        var onWinResize = function () {
          doResize();
        };
        window.addEventListener("resize", onWinResize);
        mapWrap._nbMapboxResizeHandler = onWinResize;
      }

      mapWrap._nbMapboxMap = map;

      if (mapsUrlTrim) {
        var ext = document.createElement("p");
        ext.className = "nb-location__map-external";
        var extA = document.createElement("a");
        extA.href = mapsUrlTrim;
        extA.target = "_blank";
        extA.rel = "noopener noreferrer";
        extA.textContent = "Открыть в Google Картах";
        ext.appendChild(extA);
        if (mapWrap.parentNode) mapWrap.parentNode.insertBefore(ext, mapWrap.nextSibling);
      }
    } catch (eInit) {
      mapWrap.innerHTML = fallbackHtml;
      if (mapsUrlTrim && !mapWrap.querySelector("a.nb-location__map-link")) {
        var frag2 = document.createDocumentFragment();
        while (mapWrap.firstChild) frag2.appendChild(mapWrap.firstChild);
        var mapA2 = document.createElement("a");
        mapA2.className = "nb-location__map-link";
        mapA2.href = mapsUrlTrim;
        mapA2.target = "_blank";
        mapA2.rel = "noopener noreferrer";
        mapA2.setAttribute("aria-label", "Открыть объект на карте: " + (obj.title || ""));
        mapA2.appendChild(frag2);
        mapWrap.appendChild(mapA2);
      }
    }
  }

  function similarRoomsLabel(obj) {
    if (!obj || !obj.rooms) return "";
    var r = String(obj.rooms).trim();
    var sep = r.indexOf(" — ");
    if (sep >= 0) r = r.slice(0, sep).trim();
    sep = r.indexOf(" - ");
    if (sep >= 0) r = r.slice(0, sep).trim();
    return r;
  }

  function configureSimilarPriceEl(el, obj) {
    if (!el || !obj || obj.priceGel == null || !Number.isFinite(Number(obj.priceGel))) return;
    var gel = Number(obj.priceGel);
    var pk = obj.priceKind || "fixed";
    var gelFromTotal =
      obj.priceFromTotalGel != null && Number.isFinite(Number(obj.priceFromTotalGel))
        ? Number(obj.priceFromTotalGel)
        : NaN;
    if (pk === "per" && Number.isFinite(gelFromTotal)) {
      el.setAttribute("data-nb-price", String(gelFromTotal));
      el.setAttribute("data-nb-price-kind", "from");
      el.innerHTML = formatCardPriceLine(gelFromTotal, "usd", "from");
    } else if (pk === "per") {
      el.setAttribute("data-nb-price", String(gel));
      el.setAttribute("data-nb-price-kind", "per");
      el.innerHTML = formatCardPriceLine(gel, "usd", "per");
    } else if (pk === "from") {
      el.setAttribute("data-nb-price", String(gel));
      el.setAttribute("data-nb-price-kind", "from");
      el.innerHTML = formatCardPriceLine(gel, "usd", "from");
    } else {
      el.setAttribute("data-nb-price", String(gel));
      el.setAttribute("data-nb-price-kind", "fixed");
      el.innerHTML = formatCardPriceLine(gel, "usd", "fixed");
    }
  }

  function buildSimilarMiniItem(obj, isObj21) {
    var li = document.createElement("li");
    li.className = isObj21 ? "nb-mini nb-obj21__mini" : "nb-mini";

    var link = document.createElement("a");
    link.className = "nb-mini__link";
    link.href = detailHrefFor(obj);

    var photos = photoItemsFromObject(obj);
    var img = document.createElement("img");
    img.className = "nb-mini__img";
    img.src = photos.length ? photos[0].src : "images/property-1.png";
    img.alt = obj.title || "Новостройка";
    if (isObj21) {
      img.width = 270;
      img.height = 257;
    } else {
      img.width = 160;
      img.height = 140;
    }
    link.appendChild(img);

    var info = document.createElement("div");
    info.className = "nb-mini__info";

    var titleEl = document.createElement("p");
    titleEl.className = "nb-mini__title";
    titleEl.textContent = obj.title || "Объект";
    info.appendChild(titleEl);

    var priceEl = document.createElement("p");
    priceEl.className = isObj21 ? "nb-mini__price nb-obj21__mini-price" : "nb-mini__price";
    configureSimilarPriceEl(priceEl, obj);
    info.appendChild(priceEl);

    if (obj.areaM2 != null && Number.isFinite(Number(obj.areaM2))) {
      var areaLine = document.createElement("p");
      areaLine.className = "nb-mini__line";
      areaLine.innerHTML =
        '<span class="nb-mini__ic">м²</span> ' + Math.round(Number(obj.areaM2)) + " м<sup>2</sup>";
      info.appendChild(areaLine);
    }

    var rooms = similarRoomsLabel(obj);
    if (rooms) {
      var roomLine = document.createElement("p");
      roomLine.className = "nb-mini__line";
      roomLine.innerHTML = '<span class="nb-mini__ic">◇</span> ' + rooms;
      info.appendChild(roomLine);
    }

    link.appendChild(info);
    li.appendChild(link);
    return li;
  }

  /** Похожие новостройки: превью других объектов из каталога (без табов студия/1+1/2+1). */
  function initSimilarNewBuildings(currentId) {
    if (!document.querySelector("main[data-nb-catalog-id]")) return;

    document.querySelectorAll(".nb-similar__tabs, .nb-obj21__tabs").forEach(function (el) {
      el.remove();
    });
    document.querySelectorAll(".nb-obj21__pagination").forEach(function (el) {
      el.remove();
    });

    var listEl =
      document.querySelector("[data-nb-similar-list]") ||
      document.querySelector(".nb-obj21__grid") ||
      document.querySelector(".nb-similar__list");
    if (!listEl) return;

    var isObj21 = listEl.classList.contains("nb-obj21__grid");
    var others = (getCatalog()["new-building"] || []).filter(function (o) {
      return o && o.id !== currentId;
    });

    listEl.innerHTML = "";

    var section =
      listEl.closest("[data-nb-similar-section]") ||
      listEl.closest(".nb-similar") ||
      listEl.closest(".nb-obj21__similar-wrap");

    if (!others.length) {
      if (section) section.hidden = true;
      return;
    }

    if (section) section.hidden = false;

    others.forEach(function (obj) {
      listEl.appendChild(buildSimilarMiniItem(obj, isObj21));
    });
  }

  function initCatalogDetailPage() {
    var root =
      document.querySelector("main[data-nb-catalog-id]") ||
      document.querySelector("main[data-apt-catalog-id]");
    if (!root) return;

    var idAttr = root.hasAttribute("data-apt-catalog-id") ? "data-apt-catalog-id" : "data-nb-catalog-id";

    var qp = "";
    try {
      qp = new URLSearchParams(window.location.search).get("id") || "";
    } catch (e0) {}
    qp = String(qp).trim();

    var fallbackId = root.getAttribute(idAttr) || "";
    var id = qp && findObjectById(qp) ? qp : fallbackId;
    var obj = findObjectById(id);
    if (!obj) return;

    if (obj.title) {
      document.title = obj.title + " — Батуми — REALTOR GEORGIA";
    }

    var mainPrice = root.querySelector(".nb-price__main, .nb-obj21__price-main");
    var perPrice = root.querySelector(".nb-price__per, .nb-obj21__price-per");
    if (mainPrice && perPrice && obj.priceGel != null && Number.isFinite(Number(obj.priceGel))) {
      var gel = Number(obj.priceGel);
      var pk = obj.priceKind || "fixed";
      var gelFromTotal =
        obj.priceFromTotalGel != null && Number.isFinite(Number(obj.priceFromTotalGel))
          ? Number(obj.priceFromTotalGel)
          : NaN;

      if (pk === "per" && Number.isFinite(gelFromTotal)) {
        mainPrice.setAttribute("data-nb-price", String(gelFromTotal));
        mainPrice.setAttribute("data-nb-price-kind", "from");
        perPrice.setAttribute("data-nb-price", String(gel));
        perPrice.setAttribute("data-nb-price-kind", "per");
      } else if (pk === "per") {
        mainPrice.setAttribute("data-nb-price", String(gel));
        mainPrice.setAttribute("data-nb-price-kind", "per");
        perPrice.removeAttribute("data-nb-price");
        perPrice.removeAttribute("data-nb-price-kind");
        perPrice.textContent = "";
        perPrice.style.display = "none";
      } else if (pk === "from") {
        mainPrice.setAttribute("data-nb-price", String(gel));
        mainPrice.setAttribute("data-nb-price-kind", "from");
        perPrice.removeAttribute("data-nb-price");
        perPrice.removeAttribute("data-nb-price-kind");
        perPrice.textContent = "";
        perPrice.style.display = "none";
      } else {
        mainPrice.setAttribute("data-nb-price", String(gel));
        mainPrice.setAttribute("data-nb-price-kind", "fixed");
        if (obj.areaM2 && obj.areaM2 > 0) {
          var perGel = gel / obj.areaM2;
          perPrice.setAttribute("data-nb-price", String(perGel));
          perPrice.setAttribute("data-nb-price-kind", "per");
          perPrice.style.display = "";
        } else {
          perPrice.removeAttribute("data-nb-price");
          perPrice.removeAttribute("data-nb-price-kind");
          perPrice.textContent = "";
          perPrice.style.display = "none";
        }
      }
    }

    var metaPinRow = root.querySelector(".nb-meta__pin");
    if (metaPinRow && obj.geo && obj.geo.address) {
      var row = metaPinRow.closest(".nb-meta__row");
      if (row) {
        var nodes = Array.prototype.slice.call(row.childNodes);
        nodes.forEach(function (n) {
          if (n !== metaPinRow) row.removeChild(n);
        });
        row.appendChild(document.createTextNode(" " + obj.geo.address));
      }
    }

    var buildIcon = root.querySelector(".nb-meta__icon--build");
    if (buildIcon && obj.title) {
      var brow = buildIcon.closest(".nb-meta__row");
      if (brow) {
        Array.prototype.slice.call(brow.childNodes).forEach(function (n) {
          if (n !== buildIcon) brow.removeChild(n);
        });
        brow.appendChild(document.createTextNode(" " + obj.title));
      }
    }

    var locAddr = root.querySelector(".nb-location__address");
    if (locAddr && obj.geo && obj.geo.address) {
      locAddr.textContent = obj.geo.address;
    }

    initCatalogLocationMap(root, obj);

    initCatalogDetailHero(root, obj);

    initSimilarNewBuildings(id);

    var statTexts = root.querySelectorAll(".nb-stat .nb-stat__text");
    if (statTexts[0] && obj.areaM2 != null && Number.isFinite(Number(obj.areaM2))) {
      statTexts[0].innerHTML = Math.round(Number(obj.areaM2)) + " м<sup>2</sup>";
    }
    if (statTexts[1] && obj.rooms != null && String(obj.rooms).trim()) {
      statTexts[1].textContent = String(obj.rooms).trim().replace(/-/g, "–");
    }
    if (statTexts[2] && obj.floorsText != null && String(obj.floorsText).trim()) {
      statTexts[2].textContent = String(obj.floorsText).trim().replace(/-/g, "–");
    }
    if (statTexts[3] && obj.completionText != null && String(obj.completionText).trim()) {
      statTexts[3].textContent = String(obj.completionText).trim().replace(/-/g, "–");
    }

    if (!obj.description) return;

    var text = String(obj.description).trim();
    var title = obj.title || "Описание";

    var textEl = root.querySelector(".nb-desc__text");
    if (textEl) {
      textEl.textContent = text;
      textEl.classList.add("nb-desc__text--clamp");
      textEl.setAttribute("tabindex", "0");
      textEl.setAttribute("role", "button");
      textEl.setAttribute("aria-label", "Показать полное описание");
    }

    var toolbarTitle = root.querySelector(".nb-obj21__toolbar-title");
    if (toolbarTitle && obj.title) toolbarTitle.textContent = obj.title;

    function openNbModal(e) {
      if (e) {
        e.preventDefault();
      }
      openModal(title, text, detailHrefFor(obj));
    }

    var moreBtn = root.querySelector(".nb-desc__more");
    if (moreBtn) {
      moreBtn.addEventListener("click", openNbModal);
    }
    if (textEl) {
      textEl.addEventListener("click", openNbModal);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCatalogSections();
    initCardInteractions();
    initCatalogDetailPage();
    initSearchPage();
  });
})();
