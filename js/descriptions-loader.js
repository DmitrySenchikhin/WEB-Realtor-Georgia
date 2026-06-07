(function (global) {
  "use strict";

  var LANG_FOLDERS = {
    ru: "/description ru",
    en: "/description en",
    geo: "/description geo",
  };

  var LANG_KEYS = ["ru", "en", "geo"];

  function langPath(lang, id) {
    return encodeURI(LANG_FOLDERS[lang] + "/" + id + ".json");
  }

  function loadDescriptions() {
    var ids = global.REALTOR_DESCRIPTION_IDS || [];
    global.REALTOR_DESCRIPTIONS = global.REALTOR_DESCRIPTIONS || {};

    var tasks = [];
    ids.forEach(function (id) {
      global.REALTOR_DESCRIPTIONS[id] = global.REALTOR_DESCRIPTIONS[id] || {};
      LANG_KEYS.forEach(function (lang) {
        tasks.push(
          fetch(langPath(lang, id))
            .then(function (response) {
              return response.ok ? response.json() : null;
            })
            .then(function (data) {
              if (data) global.REALTOR_DESCRIPTIONS[id][lang] = data;
            })
            .catch(function () {
              /* ignore missing file */
            })
        );
      });
    });

    return Promise.all(tasks).then(function () {
      global.REALTOR_DESCRIPTIONS_READY = true;
      if (typeof document !== "undefined") {
        document.dispatchEvent(new CustomEvent("realtor:descriptionsready"));
      }
    });
  }

  var descriptionsPromise = loadDescriptions();

  function langToStoreKey(lang) {
    if (lang === "ka") return "geo";
    return lang;
  }

  global.RealtorDescriptions = {
    get: function (objId, lang, field) {
      var store = global.REALTOR_DESCRIPTIONS && global.REALTOR_DESCRIPTIONS[objId];
      if (!store) return "";
      var key = langToStoreKey(lang);
      if (store[key] && store[key][field] != null) return String(store[key][field]);
      if (store.ru && store.ru[field] != null) return String(store.ru[field]);
      return "";
    },
    whenReady: function (fn) {
      descriptionsPromise.then(fn);
    },
    readyPromise: descriptionsPromise,
  };

  if (typeof document !== "undefined") {
    /* loadDescriptions started above */
  } else {
    loadDescriptions();
  }
})(typeof window !== "undefined" ? window : globalThis);
