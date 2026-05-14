(function () {
  "use strict";

  /* Mapbox: [долгота, широта] — центр Батуми */
  var BATUMI_CENTER = [41.6367, 41.6168];
  var BATUMI_ZOOM = 12.3;

  var token = typeof window.MAPBOX_ACCESS_TOKEN === "string" ? window.MAPBOX_ACCESS_TOKEN.trim() : "";
  var mapEl = document.getElementById("map-view");
  var warnEl = document.getElementById("map-token-warning");

  function showWarning() {
    if (warnEl) warnEl.hidden = false;
    if (mapEl) {
      mapEl.classList.add("map-page__canvas--inactive");
    }
  }

  if (!mapEl || typeof mapboxgl === "undefined") {
    showWarning();
    return;
  }

  if (!token) {
    showWarning();
    return;
  }

  mapboxgl.accessToken = token;

  var map = new mapboxgl.Map({
    container: mapEl,
    style: "mapbox://styles/mapbox/streets-v12",
    center: BATUMI_CENTER,
    zoom: BATUMI_ZOOM,
    attributionControl: true,
  });

  map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "top-right");

  new mapboxgl.Marker({ color: "#e05d2e" }).setLngLat(BATUMI_CENTER).addTo(map);

  if (warnEl) warnEl.hidden = true;
})();
