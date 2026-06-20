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
        showToast(window.RealtorI18n ? window.RealtorI18n.t("toast.fillForm") : "Заполните имя и телефон");
        return;
      }
      var text =
        "Заявка на консультацию с сайта RealtorGeorgia.com\n\nИмя: " + n + "\nТелефон: " + p;
      var url = waBase + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener,noreferrer");
      showToast(window.RealtorI18n ? window.RealtorI18n.t("toast.waOpen") : "Открывается WhatsApp — отправьте сообщение с заявкой.");
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
      var raw = String(value || "").trim();
      if (!raw) return null;
      var cleaned = raw.replace(/[^\d.,]/g, "").replace(/,/g, ".");
      if (!cleaned) return null;
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
      parseAmount: parseAmount,
      convertAmount: convertAmount,
      formatAmount: formatAmount,
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

    try {
      if (new URLSearchParams(window.location.search).get("currency") === "gel") {
        setCurrency("gel", "usd");
      }
    } catch (_urlCurrency) {
      /* ignore */
    }

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

  function t(key, fallback) {
    return window.RealtorI18n ? window.RealtorI18n.t(key) : fallback;
  }

  function computeMortgage(price, downPercent, termYears, annualRate) {
    if (!(price > 0) || downPercent < 0 || downPercent >= 100 || !(termYears > 0) || annualRate < 0) {
      return null;
    }

    var loanAmount = price * (1 - downPercent / 100);
    if (!(loanAmount > 0)) {
      return { loanAmount: 0, monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }

    var months = termYears * 12;
    var monthlyRate = annualRate / 100 / 12;

    var monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / months;
    } else {
      var factor = Math.pow(1 + monthlyRate, months);
      monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
    }

    var totalPayment = monthlyPayment * months;
    var totalInterest = Math.max(totalPayment - loanAmount, 0);

    return {
      loanAmount: loanAmount,
      monthlyPayment: monthlyPayment,
      totalPayment: totalPayment,
      totalInterest: totalInterest,
    };
  }

  function initMortgageCalculator() {
    var modal = document.querySelector("[data-calc-modal]");
    var openBtn = document.querySelector("[data-calc-open]");
    if (!modal || !openBtn) return;

    var currencyModule = createCurrencyModule();
    var toggle = modal.querySelector("[data-calc-currency]");
    var knob = toggle ? toggle.querySelector(".currency-toggle__knob") : null;
    var suffixes = modal.querySelectorAll("[data-calc-currency-suffix]");

    var priceInput = modal.querySelector("[data-calc-price]");
    var downInput = modal.querySelector("[data-calc-down]");
    var termInput = modal.querySelector("[data-calc-term]");
    var rateInput = modal.querySelector("[data-calc-rate]");

    var resultBox = modal.querySelector("[data-calc-result]");
    var monthlyEl = modal.querySelector("[data-calc-monthly]");
    var loanEl = modal.querySelector("[data-calc-loan]");
    var interestEl = modal.querySelector("[data-calc-interest]");
    var totalEl = modal.querySelector("[data-calc-total]");
    var yearsSuffix = modal.querySelector("[data-calc-years-suffix]");

    var currency = "usd";
    var lastFocused = null;

    function fmt(value) {
      return currencyModule.getSymbol(currency) + currencyModule.formatAmount(value);
    }

    function render() {
      if (yearsSuffix) yearsSuffix.textContent = t("calc.yearsShort", "лет");

      var price = currencyModule.parseAmount(priceInput && priceInput.value);
      var down = currencyModule.parseAmount(downInput && downInput.value);
      var term = currencyModule.parseAmount(termInput && termInput.value);
      var rate = currencyModule.parseAmount(rateInput && rateInput.value);

      var result =
        price === null || down === null || term === null || rate === null
          ? null
          : computeMortgage(price, down, Math.round(term), rate);

      if (!result) {
        if (resultBox) resultBox.hidden = true;
        return;
      }

      if (resultBox) resultBox.hidden = false;
      if (monthlyEl) monthlyEl.textContent = fmt(result.monthlyPayment);
      if (loanEl) loanEl.textContent = fmt(result.loanAmount);
      if (interestEl) interestEl.textContent = fmt(result.totalInterest);
      if (totalEl) totalEl.textContent = fmt(result.totalPayment);
    }

    function setCurrency(next, prev) {
      var isUsd = next === "usd";
      var symbol = currencyModule.getSymbol(next);

      if (priceInput && prev && prev !== next) {
        currencyModule.convertInputValues([priceInput], prev, next);
      }

      currency = next;
      if (toggle) {
        toggle.classList.toggle("is-usd", isUsd);
        toggle.classList.toggle("is-gel", !isUsd);
        toggle.setAttribute("aria-pressed", String(!isUsd));
        toggle.setAttribute("aria-label", isUsd ? "Валюта: доллар" : "Валюта: лари");
      }
      if (knob) knob.textContent = symbol;
      suffixes.forEach(function (suffix) {
        suffix.textContent = symbol;
      });

      render();
    }

    function openModal() {
      lastFocused = document.activeElement;
      modal.hidden = false;
      document.body.classList.add("calc-open");
      render();
      var firstField = modal.querySelector("[data-calc-price]");
      if (firstField) firstField.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("calc-open");
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    openBtn.addEventListener("click", openModal);

    modal.querySelectorAll("[data-calc-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = toggle.classList.contains("is-usd") ? "usd" : "gel";
        setCurrency(current === "usd" ? "gel" : "usd", current);
      });
    }

    [priceInput, downInput, termInput, rateInput].forEach(function (input) {
      if (input) input.addEventListener("input", render);
    });

    document.addEventListener("realtor:languagechange", render);

    setCurrency("usd", "usd");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCarousels();
    initSearchForms();
    initLeadForm();
    initCurrencyToggle();
    initNewBuildingCurrencyToggle();
    initMortgageCalculator();
  });
})();
