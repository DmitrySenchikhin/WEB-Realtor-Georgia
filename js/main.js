(function () {
  "use strict";

  function initCarousels() {
    document.querySelectorAll(".section-block").forEach(function (section) {
      var viewport = section.querySelector(".carousel");
      var track = section.querySelector("[data-carousel-track]");
      var prev = section.querySelector("[data-carousel-prev]");
      var next = section.querySelector("[data-carousel-next]");
      if (!viewport || !track || !prev || !next) return;

      var gap = 30;
      var index = 0;

      function cardsPerView() {
        var w = viewport.clientWidth;
        if (w < 520) return 1;
        if (w < 900) return 2;
        return 3;
      }

      function cardStep() {
        var card = track.querySelector(".card");
        if (!card) return 392;
        return card.getBoundingClientRect().width + gap;
      }

      function maxIndex() {
        var total = track.querySelectorAll(".card").length;
        var per = cardsPerView();
        return Math.max(0, total - per);
      }

      function update() {
        var step = cardStep();
        var mx = maxIndex();
        if (index > mx) index = mx;
        track.style.transform = "translateX(" + -index * step + "px)";
        prev.disabled = index <= 0;
        next.disabled = index >= mx;
      }

      prev.addEventListener("click", function () {
        index = Math.max(0, index - 1);
        update();
      });

      next.addEventListener("click", function () {
        index = Math.min(maxIndex(), index + 1);
        update();
      });

      window.addEventListener("resize", function () {
        update();
      });

      update();
    });
  }

  function showToast(message) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3200);
  }

  function initSearchForms() {
    document.querySelectorAll("[data-search-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        var action = (form.getAttribute("action") || "").trim();
        if (action && action !== "#") {
          return;
        }
        e.preventDefault();
        var input = form.querySelector('input[name="q"]');
        var q = input && input.value.trim();
        showToast(q ? "Поиск: " + q : "Введите город или район");
      });
    });

  }

  function initLeadForm() {
    var form = document.getElementById("lead-form");
    if (!form) return;
    var waBase = "https://wa.me/995598309038";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var n = name && name.value.trim();
      var p = phone && phone.value.trim();
      if (!n || !p) {
        showToast("Заполните имя и телефон");
        return;
      }
      var text =
        "Заявка на консультацию с сайта RealtorGeorgia.com\n\nИмя: " + n + "\nТелефон: " + p;
      var url = waBase + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener,noreferrer");
      showToast("Открывается WhatsApp — отправьте сообщение с заявкой.");
      form.reset();
    });
  }

  function createCurrencyModule() {
    var GEL_PER_USD = 2.7;

    function getSymbol(currency) {
      return currency === "usd" ? "$" : "₾";
    }

    function formatAmount(value) {
      return Math.round(value).toLocaleString("ru-RU");
    }

    function parseAmount(value) {
      var cleaned = String(value || "")
        .replace(/[^\d.,]/g, "")
        .replace(/,/g, ".");
      var parsed = Number(cleaned);
      return Number.isFinite(parsed) ? parsed : null;
    }

    function convertAmount(value, fromCurrency, toCurrency) {
      if (fromCurrency === toCurrency) return value;
      if (fromCurrency === "usd" && toCurrency === "gel") return value * GEL_PER_USD;
      return value / GEL_PER_USD;
    }

    function convertInputValues(inputs, fromCurrency, toCurrency) {
      if (fromCurrency === toCurrency) return;

      inputs.forEach(function (input) {
        if (!input) return;
        var raw = input.value.trim();
        if (!raw) return;

        var amount = parseAmount(raw);
        if (amount === null) return;

        var converted = convertAmount(amount, fromCurrency, toCurrency);
        input.value = formatAmount(converted);
      });
    }

    function renderPriceFromGel(gelValue, currency, kind) {
      var symbol = getSymbol(currency);
      var converted = currency === "usd" ? convertAmount(gelValue, "gel", "usd") : gelValue;
      var formatted = formatAmount(converted);

      if (kind === "per") return "от " + symbol + formatted + "/м<sup>2</sup>";
      if (kind === "from") return "от " + symbol + formatted;
      return symbol + formatted;
    }

    return {
      getSymbol: getSymbol,
      convertInputValues: convertInputValues,
      renderPriceFromGel: renderPriceFromGel,
    };
  }

  function initCurrencyToggle() {
    var toggle = document.querySelector(".currency-toggle");
    if (!toggle) return;

    var currencyModule = createCurrencyModule();
    var knob = toggle.querySelector(".currency-toggle__knob");
    var suffixes = document.querySelectorAll("[data-currency-suffix]");
    var currencyInputs = Array.prototype.map
      .call(suffixes, function (suffix) {
        var field = suffix.closest(".filter-field");
        return field ? field.querySelector(".filter-input") : null;
      })
      .filter(Boolean);

    function setCurrency(currency, prevCurrency) {
      var isUsd = currency === "usd";
      var symbol = currencyModule.getSymbol(currency);

      currencyModule.convertInputValues(currencyInputs, prevCurrency || currency, currency);

      toggle.classList.toggle("is-usd", isUsd);
      toggle.classList.toggle("is-gel", !isUsd);
      toggle.setAttribute("aria-pressed", String(!isUsd));
      toggle.setAttribute("aria-label", isUsd ? "Валюта: доллар" : "Валюта: лари");

      if (knob) knob.textContent = symbol;
      suffixes.forEach(function (suffix) {
        suffix.textContent = symbol;
      });
    }

    setCurrency("usd", "usd");

    toggle.addEventListener("click", function () {
      var current = toggle.classList.contains("is-usd") ? "usd" : "gel";
      var next = current === "usd" ? "gel" : "usd";
      setCurrency(next, current);
    });
  }

  function initNewBuildingCurrencyToggle() {
    var toggle = document.querySelector(".nb-currency-mini__pill");
    if (!toggle) return;

    var currencyModule = createCurrencyModule();
    var knob = toggle.querySelector(".nb-currency-mini__knob");
    var priceNodes = document.querySelectorAll("[data-nb-price]");

    function setCurrency(currency) {
      var isUsd = currency === "usd";

      toggle.classList.toggle("is-usd", isUsd);
      toggle.classList.toggle("is-gel", !isUsd);
      toggle.setAttribute("aria-pressed", String(!isUsd));
      toggle.setAttribute("aria-label", isUsd ? "Валюта: доллар" : "Валюта: лари");
      if (knob) knob.textContent = currencyModule.getSymbol(currency);

      priceNodes.forEach(function (node) {
        var gelValue = Number(node.getAttribute("data-nb-price"));
        if (!Number.isFinite(gelValue)) return;
        var kind = node.getAttribute("data-nb-price-kind");
        node.innerHTML = currencyModule.renderPriceFromGel(gelValue, currency, kind);
      });
    }

    setCurrency("usd");

    toggle.addEventListener("click", function () {
      var current = toggle.classList.contains("is-usd") ? "usd" : "gel";
      var next = current === "usd" ? "gel" : "usd";
      setCurrency(next);
    });
  }

  function initObj21Tabs() {
    document.querySelectorAll(".nb-obj21__tabs").forEach(function (wrap) {
      wrap.querySelectorAll(".nb-obj21__tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          wrap.querySelectorAll(".nb-obj21__tab").forEach(function (t) {
            t.classList.remove("is-active");
            t.setAttribute("aria-selected", "false");
          });
          tab.classList.add("is-active");
          tab.setAttribute("aria-selected", "true");
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCarousels();
    initSearchForms();
    initLeadForm();
    initCurrencyToggle();
    initNewBuildingCurrencyToggle();
    initObj21Tabs();
  });
})();
