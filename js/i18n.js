(function () {
  "use strict";

  var STORAGE_KEY = "realtor-lang";

  var LANGUAGES = [
    { code: "ru", label: "RUS", htmlLang: "ru" },
    { code: "en", label: "ENG", htmlLang: "en" },
    { code: "geo", label: "GEO", htmlLang: "ka" },
  ];

  var MESSAGES = {
    ru: {
      "page.home": "REALTOR GEORGIA — поиск недвижимости в Грузии",
      "page.search": "Поиск недвижимости — REALTOR GEORGIA",
      "page.apartments": "Квартиры — REALTOR GEORGIA",
      "page.map": "Карта объектов — REALTOR GEORGIA",
      "hero.title": "Поиск недвижимости в Грузии",
      "btn.search": "Поиск",
      "btn.map": "Смотреть на карте",
      "aria.appStore": "Скачать в App Store",
      "section.best": "Лучшие предложения",
      "section.newb": "Новостройки в Батуми",
      "section.apt": "Квартиры в Батуми",
      "cta.title": "Получите консультацию у лучших специалистов",
      "cta.subtitle": "Мы свяжемся с вами в течение 24 часов",
      "cta.name": "Ваше имя",
      "cta.phone": "Телефон",
      "cta.submit": "Оставить заявку",
      "filter.newBuilding": "Новостройки",
      "filter.apartment": "Квартира",
      "filter.house": "Дом",
      "filter.priceRange": "Ценовой диапазон",
      "filter.rooms": "Количество комнат",
      "filter.area": "Общая площадь",
      "filter.studio": "Студия",
      "filter.from": "от",
      "filter.to": "до",
      "sort.recommended": "Рекомендуемые",
      "calc.open": "Калькулятор ипотеки",
      "calc.title": "Калькулятор ипотеки",
      "calc.parameters": "Параметры",
      "calc.price": "Стоимость объекта",
      "calc.downPayment": "Первоначальный взнос",
      "calc.term": "Срок кредита",
      "calc.yearsShort": "лет",
      "calc.rate": "Ставка в год",
      "calc.result": "Расчёт",
      "calc.monthly": "Ежемесячный платёж",
      "calc.loanAmount": "Сумма кредита",
      "calc.totalInterest": "Переплата по процентам",
      "calc.totalPayment": "Общая сумма выплат",
      "calc.disclaimer": "Расчёт носит ознакомительный характер и не является офертой.",
      "aria.calcClose": "Закрыть калькулятор",
      "aria.home": "REALTOR GEORGIA — на главную",
      "aria.whatsapp": "Написать в WhatsApp",
      "aria.prev": "Назад",
      "aria.next": "Вперёд",
      "aria.searchParams": "Параметры поиска",
      "aria.objectType": "Тип объекта",
      "aria.rooms": "Комнаты",
      "aria.sort": "Сортировка и счётчик",
      "aria.results": "Результаты поиска",
      "lang.choose": "Выбор языка",
      "toast.fillForm": "Заполните имя и телефон",
      "toast.waOpen": "Открывается WhatsApp — отправьте сообщение с заявкой.",
    },
    en: {
      "page.home": "REALTOR GEORGIA — property search in Georgia",
      "page.search": "Property search — REALTOR GEORGIA",
      "page.apartments": "Apartments — REALTOR GEORGIA",
      "page.map": "Property map — REALTOR GEORGIA",
      "hero.title": "Property search in Georgia",
      "btn.search": "Search",
      "btn.map": "View on map",
      "aria.appStore": "Download on the App Store",
      "section.best": "Best offers",
      "section.newb": "New builds in Batumi",
      "section.apt": "Apartments in Batumi",
      "cta.title": "Get advice from top specialists",
      "cta.subtitle": "We will contact you within 24 hours",
      "cta.name": "Your name",
      "cta.phone": "Phone",
      "cta.submit": "Submit request",
      "filter.newBuilding": "New builds",
      "filter.apartment": "Apartment",
      "filter.house": "House",
      "filter.priceRange": "Price range",
      "filter.rooms": "Number of rooms",
      "filter.area": "Total area",
      "filter.studio": "Studio",
      "filter.from": "from",
      "filter.to": "to",
      "sort.recommended": "Recommended",
      "calc.open": "Mortgage calculator",
      "calc.title": "Mortgage calculator",
      "calc.parameters": "Parameters",
      "calc.price": "Property price",
      "calc.downPayment": "Down payment",
      "calc.term": "Loan term",
      "calc.yearsShort": "yrs",
      "calc.rate": "Annual rate",
      "calc.result": "Result",
      "calc.monthly": "Monthly payment",
      "calc.loanAmount": "Loan amount",
      "calc.totalInterest": "Total interest",
      "calc.totalPayment": "Total payment",
      "calc.disclaimer": "This estimate is for reference only and is not an offer.",
      "aria.calcClose": "Close calculator",
      "aria.home": "REALTOR GEORGIA — home",
      "aria.whatsapp": "Message on WhatsApp",
      "aria.prev": "Previous",
      "aria.next": "Next",
      "aria.searchParams": "Search parameters",
      "aria.objectType": "Property type",
      "aria.rooms": "Rooms",
      "aria.sort": "Sort and count",
      "aria.results": "Search results",
      "lang.choose": "Choose language",
      "toast.fillForm": "Please enter your name and phone",
      "toast.waOpen": "Opening WhatsApp — send your request message.",
    },
    geo: {
      "page.home": "REALTOR GEORGIA — უძრავი ქონების ძებნა საქართველოში",
      "page.search": "უძრავი ქონების ძებნა — REALTOR GEORGIA",
      "page.apartments": "ბინები — REALTOR GEORGIA",
      "page.map": "ობიექტების რუკა — REALTOR GEORGIA",
      "hero.title": "უძრავი ქონების ძებნა საქართველოში",
      "btn.search": "ძებნა",
      "btn.map": "რუკაზე ნახვა",
      "aria.appStore": "ჩამოტვირთეთ App Store-დან",
      "section.best": "საუკეთესო შეთავაზებები",
      "section.newb": "ახალი აშენებები ბათუმში",
      "section.apt": "ბინები ბათუმში",
      "cta.title": "მიიღეთ კონსულტაცია საუკეთესო სპეციალისტებისგან",
      "cta.subtitle": "24 საათის განმავლობაში დაგიკავშირდებით",
      "cta.name": "თქვენი სახელი",
      "cta.phone": "ტელეფონი",
      "cta.submit": "განაცხადის დატოვება",
      "filter.newBuilding": "ახალი აშენებები",
      "filter.apartment": "ბინა",
      "filter.house": "სახლი",
      "filter.priceRange": "ფასის დიაპაზონი",
      "filter.rooms": "ოთახების რაოდენობა",
      "filter.area": "საერთო ფართობი",
      "filter.studio": "სტუდია",
      "filter.from": "დან",
      "filter.to": "მდე",
      "sort.recommended": "რეკომენდებული",
      "calc.open": "იპოთეკის კალკულატორი",
      "calc.title": "იპოთეკის კალკულატორი",
      "calc.parameters": "პარამეტრები",
      "calc.price": "ობიექტის ღირებულება",
      "calc.downPayment": "საწყისი შენატანი",
      "calc.term": "სესხის ვადა",
      "calc.yearsShort": "წ.",
      "calc.rate": "წლიური განაკვეთი",
      "calc.result": "გამოთვლა",
      "calc.monthly": "ყოველთვიური გადახდა",
      "calc.loanAmount": "სესხის თანხა",
      "calc.totalInterest": "საპროცენტო გადახდები",
      "calc.totalPayment": "სულ გადახდები",
      "calc.disclaimer": "გამოთვლა საინფორმაციოა და შეთავაზებას არ წარმოადგენს.",
      "aria.calcClose": "კალკულატორის დახურვა",
      "aria.home": "REALTOR GEORGIA — მთავარი",
      "aria.whatsapp": "WhatsApp-ზე მიწერა",
      "aria.prev": "უკან",
      "aria.next": "წინ",
      "aria.searchParams": "ძებნის პარამეტრები",
      "aria.objectType": "ობიექტის ტიპი",
      "aria.rooms": "ოთახები",
      "aria.sort": "სორტირება და რაოდენობა",
      "aria.results": "ძებნის შედეგები",
      "lang.choose": "ენის არჩევა",
      "toast.fillForm": "შეავსეთ სახელი და ტელეფონი",
      "toast.waOpen": "იხსნება WhatsApp — გაგზავნეთ თქვენი განაცხადი.",
    },
  };

  var currentLang = "ru";
  var uidCounter = 0;

  function normalizeLang(code) {
    if (code === "ka") return "geo";
    return LANGUAGES.some(function (l) {
      return l.code === code;
    })
      ? code
      : "ru";
  }

  function t(key) {
    var pack = MESSAGES[currentLang] || MESSAGES.ru;
    return pack[key] != null ? pack[key] : MESSAGES.ru[key] || key;
  }

  function flagMarkup(code, idSuffix) {
    var clipId = "langClip-" + idSuffix;
    var inner = "";

    if (code === "ru") {
      inner = '<rect width="48" height="48" fill="#fff"/>';
    } else if (code === "en") {
      inner =
        '<rect width="48" height="48" fill="#b22234"/>' +
        '<rect y="3.7" width="48" height="3.7" fill="#fff"/>' +
        '<rect y="11.1" width="48" height="3.7" fill="#fff"/>' +
        '<rect y="18.5" width="48" height="3.7" fill="#fff"/>' +
        '<rect y="25.9" width="48" height="3.7" fill="#fff"/>' +
        '<rect y="33.3" width="48" height="3.7" fill="#fff"/>' +
        '<rect y="40.7" width="48" height="3.7" fill="#fff"/>' +
        '<rect width="20" height="21" fill="#3c3b6e"/>' +
        '<circle cx="4" cy="4" r="1.1" fill="#fff"/>' +
        '<circle cx="8" cy="4" r="1.1" fill="#fff"/>' +
        '<circle cx="12" cy="4" r="1.1" fill="#fff"/>' +
        '<circle cx="16" cy="4" r="1.1" fill="#fff"/>' +
        '<circle cx="6" cy="8" r="1.1" fill="#fff"/>' +
        '<circle cx="10" cy="8" r="1.1" fill="#fff"/>' +
        '<circle cx="14" cy="8" r="1.1" fill="#fff"/>' +
        '<circle cx="4" cy="12" r="1.1" fill="#fff"/>' +
        '<circle cx="8" cy="12" r="1.1" fill="#fff"/>' +
        '<circle cx="12" cy="12" r="1.1" fill="#fff"/>' +
        '<circle cx="16" cy="12" r="1.1" fill="#fff"/>' +
        '<circle cx="6" cy="16" r="1.1" fill="#fff"/>' +
        '<circle cx="10" cy="16" r="1.1" fill="#fff"/>' +
        '<circle cx="14" cy="16" r="1.1" fill="#fff"/>';
    } else {
      inner =
        '<rect width="48" height="48" fill="#fff"/>' +
        '<rect x="20" width="8" height="48" fill="#ff0000"/>' +
        '<rect y="20" width="48" height="8" fill="#ff0000"/>' +
        '<rect x="22" width="4" height="48" fill="#ff0000"/>' +
        '<rect y="22" width="48" height="4" fill="#ff0000"/>';
    }

    return (
      '<svg class="lang-switch__svg" viewBox="0 0 48 48" aria-hidden="true">' +
      '<defs><clipPath id="' +
      clipId +
      '"><circle cx="24" cy="24" r="24"/></clipPath></defs>' +
      '<g clip-path="url(#' +
      clipId +
      ')">' +
      inner +
      "</g></svg>"
    );
  }

  function langLabel(code) {
    var item = LANGUAGES.find(function (l) {
      return l.code === code;
    });
    return item ? item.label : "RUS";
  }

  function createFlagButton(code, isOption) {
    uidCounter += 1;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = isOption ? "lang-switch__option" : "lang-switch__trigger";
    btn.setAttribute("data-lang", code);
    if (isOption) {
      btn.setAttribute("role", "option");
    } else {
      btn.setAttribute("aria-haspopup", "listbox");
      btn.setAttribute("aria-expanded", "false");
    }

    var flag = document.createElement("span");
    flag.className = "lang-switch__flag";
    flag.innerHTML = flagMarkup(code, uidCounter);

    var label = document.createElement("span");
    label.className = "lang-switch__code";
    label.textContent = langLabel(code);

    btn.appendChild(flag);
    btn.appendChild(label);
    return btn;
  }

  function updateTrigger(root, code) {
    var trigger = root.querySelector(".lang-switch__trigger");
    if (!trigger) return;

    uidCounter += 1;
    var flag = trigger.querySelector(".lang-switch__flag");
    var label = trigger.querySelector(".lang-switch__code");
    if (flag) flag.innerHTML = flagMarkup(code, uidCounter);
    if (label) label.textContent = langLabel(code);
    trigger.setAttribute("data-lang", code);
    trigger.setAttribute("aria-label", t("lang.choose") + ": " + langLabel(code));
  }

  function closeAllMenus(except) {
    document.querySelectorAll(".lang-switch.is-open").forEach(function (root) {
      if (except && root === except) return;
      root.classList.remove("is-open");
      var trigger = root.querySelector(".lang-switch__trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function buildSwitcher() {
    var root = document.createElement("div");
    root.className = "lang-switch";

    var trigger = createFlagButton(currentLang, false);
    trigger.setAttribute("aria-label", t("lang.choose") + ": " + langLabel(currentLang));

    var menu = document.createElement("div");
    menu.className = "lang-switch__menu";
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-label", t("lang.choose"));

    LANGUAGES.forEach(function (lang) {
      if (lang.code === currentLang) return;
      menu.appendChild(createFlagButton(lang.code, true));
    });

    root.appendChild(trigger);
    root.appendChild(menu);

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = root.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
      if (open) closeAllMenus(root);
    });

    menu.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang]");
      if (!btn || !menu.contains(btn)) return;
      setLanguage(btn.getAttribute("data-lang"));
      closeAllMenus();
    });

    return root;
  }

  function injectSwitchers() {
    document.querySelectorAll(".hero__contacts, .search-top__contacts").forEach(function (container) {
      if (container.querySelector(".lang-switch")) return;
      var wa = container.querySelector(".hero__whatsapp");
      var switcher = buildSwitcher();
      if (wa) {
        wa.insertAdjacentElement("afterend", switcher);
      } else {
        container.appendChild(switcher);
      }
    });
  }

  function applyLanguage() {
    var langMeta = LANGUAGES.find(function (l) {
      return l.code === currentLang;
    });
    document.documentElement.lang = langMeta ? langMeta.htmlLang : "ru";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (key) el.placeholder = t(key);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(key));
    });

    var titleKey = document.body.getAttribute("data-i18n-title");
    if (titleKey) document.title = t(titleKey);

    document.querySelectorAll(".lang-switch").forEach(function (root) {
      updateTrigger(root, currentLang);
      var menu = root.querySelector(".lang-switch__menu");
      if (!menu) return;
      menu.innerHTML = "";
      LANGUAGES.forEach(function (lang) {
        if (lang.code === currentLang) return;
        menu.appendChild(createFlagButton(lang.code, true));
      });
      menu.setAttribute("aria-label", t("lang.choose"));
    });

    document.dispatchEvent(
      new CustomEvent("realtor:languagechange", {
        detail: { lang: currentLang },
      })
    );
  }

  function setLanguage(code) {
    currentLang = normalizeLang(code);
    try {
      localStorage.setItem(STORAGE_KEY, currentLang);
    } catch (_err) {
      /* ignore */
    }
    applyLanguage();
  }

  function catalogField(obj, field) {
    if (!obj || !obj.id) return "";
    var langKey = currentLang;
    var store = window.REALTOR_DESCRIPTIONS && window.REALTOR_DESCRIPTIONS[obj.id];

    if (store) {
      if (store[langKey] && store[langKey][field] != null) return String(store[langKey][field]);
      if (store.ru && store.ru[field] != null) return String(store.ru[field]);
    }

    if (field === "address") {
      return obj.geo && obj.geo.address ? String(obj.geo.address) : "";
    }
    return obj[field] != null ? String(obj[field]) : "";
  }

  function init() {
    try {
      currentLang = normalizeLang(localStorage.getItem(STORAGE_KEY) || "ru");
    } catch (_err) {
      currentLang = "ru";
    }

    injectSwitchers();
    applyLanguage();

    document.addEventListener("click", function () {
      closeAllMenus();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllMenus();
    });
  }

  window.RealtorI18n = {
    t: t,
    catalog: catalogField,
    getLang: function () {
      return currentLang;
    },
    setLanguage: setLanguage,
    applyLanguage: applyLanguage,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
