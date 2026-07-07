(function () {
  "use strict";

  var img = document.currentScript && document.currentScript.previousElementSibling;
  if (!img || img.tagName !== "IMG") return;

  try {
    var id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;

    var raw = sessionStorage.getItem("realtor:card-photo:" + id);
    if (!raw) return;

    var data = JSON.parse(raw);
    if (!data || !data.src) return;

    img.setAttribute("src", data.src);
    if (data.alt) img.setAttribute("alt", data.alt);
    if (data.fit === "contain") {
      img.classList.add("property-photo--contain");
      var mount = img.closest(".nb-hero, .nb-obj21__hero");
      if (mount) mount.classList.add("nb-hero--fit-contain");
    }
  } catch (e0) {
    /* ignore */
  }
})();
