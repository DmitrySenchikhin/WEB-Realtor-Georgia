(function () {
  "use strict";

  var BATUMI_CENTER = [41.6367, 41.6168];
  var BATUMI_ZOOM = 12.3;

  var GROUP_KEYS = ["new-building", "apartments", "house"];

  var token = typeof window.MAPBOX_ACCESS_TOKEN === "string" ? window.MAPBOX_ACCESS_TOKEN.trim() : "";
  var mapEl = document.getElementById("map-view");
  var warnEl = document.getElementById("map-token-warning");

  function showWarning() {
    if (warnEl) warnEl.hidden = false;
    if (mapEl) {
      mapEl.classList.add("map-page__canvas--inactive");
    }
  }

  function objectDetailUrl(obj) {
    if (!obj || !obj.detailHref) return "";
    var href = String(obj.detailHref).trim();
    if (!href) return "";
    var q = href.indexOf("?");
    var path = q >= 0 ? href.slice(0, q) : href;
    var file = path.indexOf("/") >= 0 ? path.slice(path.lastIndexOf("/") + 1) : path;
    if (
      file === "new-building.html" ||
      file === "new-building-2.html" ||
      file === "new-building-stay-rent.html" ||
      file === "apartment.html"
    ) {
      return path + "?id=" + encodeURIComponent(obj.id);
    }
    return href;
  }

  function collectObjectsWithGeo() {
    var groups = typeof window !== "undefined" ? window.REALTOR_OBJECT_GROUPS : null;
    if (!groups || typeof groups !== "object") return [];
    var out = [];
    GROUP_KEYS.forEach(function (key) {
      var arr = groups[key];
      if (!Array.isArray(arr)) return;
      arr.forEach(function (obj) {
        if (!obj || !obj.geo) return;
        var lat = Number(obj.geo.lat);
        var lng = Number(obj.geo.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
        out.push({ obj: obj, lat: lat, lng: lng });
      });
    });
    return out;
  }

  /** Сдвиг совпадающих координат (напр. две квартиры в одной точке), чтобы маркеры не накладывались. */
  function jitterDuplicateCoords(items) {
    var used = {};
    return items.map(function (item) {
      var lat = item.lat;
      var lng = item.lng;
      var key = lat.toFixed(5) + "," + lng.toFixed(5);
      var n = used[key] || 0;
      used[key] = n + 1;
      if (n === 0) return { obj: item.obj, lat: lat, lng: lng };
      var step = 0.00032 * n;
      return { obj: item.obj, lat: lat + step * 0.4, lng: lng + step };
    });
  }

  function buildMarkerLogoIcon() {
    var iconWrap = document.createElement("span");
    iconWrap.className = "map-page__marker-icon";
    iconWrap.setAttribute("aria-hidden", "true");
    var img = document.createElement("img");
    img.src = "images/logo-mark.svg";
    img.alt = "";
    img.width = 30;
    img.height = 30;
    img.decoding = "async";
    iconWrap.appendChild(img);
    return iconWrap;
  }

  var markerRefs = [];

  function objectTitle(obj) {
    if (!obj) return "Объект";
    var lang =
      window.RealtorI18n && window.RealtorI18n.getLang ? window.RealtorI18n.getLang() : "ru";
    if (window.RealtorDescriptions && obj.id) {
      var localized = window.RealtorDescriptions.get(obj.id, lang, "title");
      if (localized) return localized;
    }
    if (window.RealtorI18n && window.RealtorI18n.catalog) {
      var fromCatalog = window.RealtorI18n.catalog(obj, "title");
      if (fromCatalog) return fromCatalog;
    }
    return obj.id || "Объект";
  }

  function refreshMarkerLabels() {
    markerRefs.forEach(function (ref) {
      var title = objectTitle(ref.obj);
      ref.label.textContent = title;
      if (ref.wrap.classList.contains("map-page__marker--link")) {
        ref.wrap.setAttribute("title", "Открыть: " + title);
        ref.wrap.setAttribute("aria-label", title);
      }
    });
  }

  function buildMarkerElement(obj) {
    var wrap = document.createElement("div");
    wrap.className = "map-page__marker";

    var iconWrap = buildMarkerLogoIcon();

    var label = document.createElement("span");
    label.className = "map-page__marker-label";
    label.textContent = objectTitle(obj);

    wrap.appendChild(iconWrap);
    wrap.appendChild(label);

    var url = objectDetailUrl(obj);
    if (url) {
      wrap.classList.add("map-page__marker--link");
      wrap.setAttribute("role", "link");
      wrap.setAttribute("tabindex", "0");
      wrap.setAttribute("title", "Открыть: " + objectTitle(obj));
      wrap.setAttribute("aria-label", objectTitle(obj));
      wrap.addEventListener("click", function () {
        window.location.href = url;
      });
      wrap.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = url;
        }
      });
    } else {
      wrap.setAttribute("role", "group");
    }

    return wrap;
  }

  if (!mapEl || typeof mapboxgl === "undefined") {
    showWarning();
    return;
  }

  if (!token) {
    showWarning();
    return;
  }

  function initMap() {
    mapboxgl.accessToken = token;

    var map = new mapboxgl.Map({
      container: mapEl,
      style: "mapbox://styles/mapbox/streets-v12",
      center: BATUMI_CENTER,
      zoom: BATUMI_ZOOM,
      attributionControl: true,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "top-right");

    var rawItems = collectObjectsWithGeo();
    var items = jitterDuplicateCoords(rawItems);

    if (items.length === 0) {
      new mapboxgl.Marker({ element: buildMarkerLogoIcon(), anchor: "center" })
        .setLngLat(BATUMI_CENTER)
        .addTo(map);
    } else {
      var bounds = new mapboxgl.LngLatBounds();
      items.forEach(function (item) {
        var ll = [item.lng, item.lat];
        bounds.extend(ll);
        var el = buildMarkerElement(item.obj);
        markerRefs.push({
          wrap: el,
          label: el.querySelector(".map-page__marker-label"),
          obj: item.obj,
        });
        new mapboxgl.Marker({ element: el, anchor: "center" }).setLngLat(ll).addTo(map);
      });

      if (items.length === 1) {
        map.jumpTo({ center: [items[0].lng, items[0].lat], zoom: 13.2 });
      } else {
        map.fitBounds(bounds, { padding: { top: 80, bottom: 100, left: 56, right: 56 }, maxZoom: 13.5, duration: 0 });
      }
    }

    if (warnEl) warnEl.hidden = true;
  }

  function bootMap() {
    var ready =
      window.RealtorDescriptions &&
      window.RealtorDescriptions.readyPromise;
    if (ready && typeof ready.then === "function") {
      ready.then(initMap);
      return;
    }
    if (window.RealtorDescriptions && window.RealtorDescriptions.whenReady) {
      window.RealtorDescriptions.whenReady(initMap);
      return;
    }
    initMap();
  }

  bootMap();

  document.addEventListener("realtor:descriptionsready", function () {
    if (markerRefs.length) refreshMarkerLabels();
  });
  document.addEventListener("realtor:languagechange", refreshMarkerLabels);
})();
