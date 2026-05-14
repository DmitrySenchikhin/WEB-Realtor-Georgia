/**
 * Группы объектов недвижимости для сайта.
 * Подключите до main.js: <script src="js/objects-catalog.js" defer></script>
 *
 * Если до этого скрипта уже задан window.REALTOR_OBJECT_GROUPS, данные не затираются:
 * для совпадающих ключей сохраняются ваши массивы (в том числе пустые); отсутствующие
 * ключи заполняются примерами из каталога по умолчанию. Свои дополнительные группы
 * (другие ключи) тоже остаются в объекте.
 *
 * Группы по умолчанию: "new-building" | "apartments" | "house"
 * Поля объекта:
 *   id, title, description, detailHref, priceGel, priceKind, priceFromTotalGel (опц.), geo, rooms, areaM2, photos
 *   floorsText, completionText (опц., строки для 3-й и 4-й ячеек .nb-stat на страницах new-building / apartment)
 * priceKind: "fixed" — полная цена, "from" — от, "per" — цена за м² (как на страницах новостроек)
 * priceFromTotalGel: опционально — цена «от» за квартиру/лот в лари (для пары «от $…» + «от $…/м²»)
 * geo: адрес/район + координаты **lat**, **lng** (для карты Mapbox на странице объекта); опционально mapsUrl — внешняя ссылка «Google Карты»
 * photos: { name — подпись/название снимка, src — путь к файлу }
 * description: полный текст описания (на карточке показывается превью в несколько строк)
 * detailHref: опционально — ссылка «Перейти к объекту» в модальном окне
 */
(function (global) {
  "use strict";

  var DEFAULT_REALTOR_OBJECT_GROUPS = {
    "new-building": [
      {
        id: "nb-sport-city",
        title: "SPORT CITY",
        detailHref: "new-building.html",
        description:
          "SPORT CITY — многофункциональный жилой комплекс на Новом бульваре Батуми (ONE Development): спорт, отельный сервис и городская инфраструктура в одном проекте. Цены: от $45 000 за лот, от $1 450 за м² (ориентир для старта продаж; уточняйте у менеджера). Планировки от студии до крупных квартир, благоустроенная территория, спортивные зоны и семейный отдых. Подходит для жизни, удалённой работы и инвестиций.",
        priceGel: 3915,
        priceKind: "per",
        priceFromTotalGel: 121_500,
        geo: {
          address: "Батуми, Новый бульвар",
          lat: 41.625083,
          lng: 41.605917,
          mapsUrl: "https://www.google.com/maps?q=41.625083,41.605917",
        },
        rooms: "студия — 3+1",
        areaM2: 32,
        floorsText: "жилые корпуса и спортивная инфраструктура",
        completionText: "срок сдачи — у застройщика ONE Development",
        photos: [
          { name: "Презентация SPORT CITY — 1", src: "images/sport-city/sport-city-01.png" },
          { name: "Презентация SPORT CITY — 2", src: "images/sport-city/sport-city-02.png" },
          { name: "Презентация SPORT CITY — 3", src: "images/sport-city/sport-city-03.png" },
          { name: "Презентация SPORT CITY — 4", src: "images/sport-city/sport-city-04.png" },
          { name: "Презентация SPORT CITY — 5", src: "images/sport-city/sport-city-05.png" },
          { name: "Презентация SPORT CITY — 6", src: "images/sport-city/sport-city-06.png" },
          { name: "Презентация SPORT CITY — 7", src: "images/sport-city/sport-city-07.png" },
          { name: "Презентация SPORT CITY — 8", src: "images/sport-city/sport-city-08.png" },
          { name: "Презентация SPORT CITY — 9", src: "images/sport-city/sport-city-09.png" },
          { name: "Презентация SPORT CITY — 10", src: "images/sport-city/sport-city-10.png" },
          { name: "Презентация SPORT CITY — 11", src: "images/sport-city/sport-city-11.png" },
          { name: "Презентация SPORT CITY — 12", src: "images/sport-city/sport-city-12.png" },
        ],
      },
      {
        id: "nb-stay-rent",
        title: "Stay&Rent",
        detailHref: "new-building-stay-rent.html",
        description:
          "Stay&Rent (ONE Development) — комплекс на Новом бульваре в Батуми для жизни и аренды: удобная локация у парка имени Леха и Марии Качинских и Metrocity, до моря и набережной — около 10 минут пешком. Подходит для постоянного проживания и для доходной сдачи — отельная инфраструктура, коворкинг, бассейны на крыше и с подогревом, фитнес, SPA, кафе, детская площадка, паркинг с зарядками для электромобилей; закрытая территория, охрана и видеонаблюдение 24/7. 420 квартир, 21 жилой этаж плюс коммерческий уровень, панорамные окна и высокие потолки, сдача — II квартал 2027. Варианты отделки — от «белого каркаса» до «под ключ» с мебелью (доплаты за м² — у застройщика). Акция: скидка 6% в ипотеку (срок акции в материалах — до 10.06.2026; уточняйте актуальность). Ориентир по примеру 1+1 ~48 м² под ключ: от ~$81 560 и от ~$1 703/м²; лоты, условия аренды и ипотеки — в отделе продаж.",
        priceGel: 4598,
        priceKind: "per",
        priceFromTotalGel: 220_212,
        geo: {
          address: "Батуми, Новый бульвар",
          lat: 41.624217,
          lng: 41.606325,
          mapsUrl: "https://www.google.com/maps?q=41.624217,41.606325",
        },
        rooms: "студия — 2+1",
        areaM2: 48,
        floorsText: "21 жилой этаж + 1 коммерческий",
        completionText: "II кв. 2027",
        photos: [
          { name: "Акция: скидка 6% в ипотеку", src: "images/stay-rent/stay-rent-01.png" },
          { name: "Планировки и варианты отделки", src: "images/stay-rent/stay-rent-02.png" },
          { name: "ONE Development — качество и сервис", src: "images/stay-rent/stay-rent-03.png" },
          { name: "Stay&Rent: локация и образ жизни", src: "images/stay-rent/stay-rent-04.png" },
          { name: "Комплекс: бассейны и инфраструктура", src: "images/stay-rent/stay-rent-05.png" },
        ],
      },
      {
        id: "new-bilding-one",
        title: "Жилой комплекс ONE",
        detailHref: "new-building.html",
        description:
          "Жилой комплекс ONE (ONE Development) — жилой дом бизнес-класса в уютном районе улицы Инасаридзе в центре Батуми: сочетание спокойной атмосферы спального квартала и динамики нового центра. Ориентир адреса: ул. Тбели Абусеридзе, 29А; до моря около 700 м. Рядом — школы и детские сады, ТРЦ Grand Mall и Black Sea Mall, гипермаркет Carrefour, фитнес и салоны, магазины со свежими продуктами, кофейни, аллея Героев, стадион Adjarabet Arena, пляж и набережная. Проект — реновация по программе муниципалитета «Батуми без аварийных зданий»; строительство профинансировано TBC, доступна ипотека до 10 лет (уточняйте условия в банке). Награда European Property Awards 2025–2026 (Georgia). Завершение строительства — IV квартал 2027. На материалах застройщика указаны ориентиры по доходности долгосрочной аренды и росту стоимости — не являются гарантией; детали — у отдела продаж и на onedev.ge.",
        priceGel: 2950,
        priceKind: "per",
        geo: {
          address: "Батуми, ул. Тбели Абусеридзе, 29А (район Инасаридзе)",
          lat: 41.6378,
          lng: 41.6195,
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=41.6378%2C41.6195",
        },
        rooms: "студия — 3+1",
        areaM2: 35,
        floorsText: "высотный корпус, зелёные фасады",
        completionText: "сдача — IV кв. 2027",
        photos: [
          { name: "Жилой дом ONE, бизнес-класс", src: "images/new-bilding-one/one-05.png" },
          { name: "Инфраструктура: бассейн на крыше", src: "images/new-bilding-one/one-01.png" },
          { name: "ЖК ONE: проект и условия", src: "images/new-bilding-one/one-02.png" },
          { name: "Фасад и European Property Awards", src: "images/new-bilding-one/one-03.png" },
          { name: "Локация: до моря 700 м и сервисы рядом", src: "images/new-bilding-one/one-04.png" },
        ],
      },
      {
        id: "nb-porta-batumi",
        title: "Porta Batumi",
        detailHref: "new-building-2.html",
        description:
          "Porta Batumi — современный жилой комплекс на Новом бульваре с закрытой территорией и подземным паркингом. Архитектура и планировки ориентированы на комфорт: панорамное остекление, продуманные кухни-гостиные, гардеробные в крупных квартирах. Для жителей предусмотрены лобби с зоной ожидания, лифты с доступом в паркинг и видеонаблюдение по периметру. Район с развитой прогулочной зоной вдоль моря, кафе и сервисами; до исторического центра — короткая поездка. Проект интересен тем, кто ищет баланс между спокойной жизнью у воды и близостью к деловой и культурной части города. Уточняйте актуальные этапы строительства и варианты планировок у менеджера.",
        priceGel: 2750,
        priceKind: "per",
        geo: {
          address: "Батуми, Новый бульвар",
          lat: 41.646_2,
          lng: 41.628_5,
        },
        rooms: "1+1 — 4+1",
        areaM2: 42,
        floorsText: "25 этажей",
        completionText: "уточняйте этап строительства у менеджера",
        photos: [
          { name: "Лобби", src: "images/property-2.png" },
          { name: "Панорама", src: "images/property-1.png" },
        ],
      },
    ],

    apartments: [
      {
        id: "apt-orbi-beach-tower-2912",
        title: "ORBI BEACH TOWER — 1+1 с видом на парк и море",
        detailHref: "apartment.html",
        description:
          "Квартира в ORBI BEACH TOWER на ул. Шерифа Химшиашвили, 57, 29 этаж: планировка 1+1, 50 м². По всей квартире тёплые полы (три контура). Отличный балкон с видом на парк и море, панорамные окна, солнечная сторона с видом на Турцию и самолёты. Техника и мебель: духовка Bosch, встроенная микроволновка Gorenje, посудомоечная машина Gorenje, большой холодильник Samsung, телевизор Samsung 65\", мебель на балконе Nardi (Италия), стол и стулья в гостиной из натурального дуба (Беларусь), стиральная машина Samsung, встроенные шкафы — много мест для хранения. Прямо перед домом парк Качинских, рядом Metrocity, рестораны и фитнес-клуб; через дорогу набережная и пляж. Цена ориентировочно $130 000 — уточняйте актуальность и условия сделки у менеджера.",
        priceGel: 351_000,
        priceKind: "fixed",
        geo: {
          address: "Батуми, ул. Шерифа Химшиашвили, 57",
          lat: 41.630308,
          lng: 41.602256,
        },
        rooms: "1+1",
        areaM2: 50,
        floorsText: "29 этаж",
        completionText: "вторичный фонд",
        photos: [
          { name: "Вид с балкона: море и парк", src: "images/orbi-beach-tower/orbi-beach-01.png" },
          { name: "Балкон с мебелью Nardi, вид на горы", src: "images/orbi-beach-tower/orbi-beach-02.png" },
          { name: "Гостиная с панорамными окнами", src: "images/orbi-beach-tower/orbi-beach-03.png" },
          { name: "Балкон: вид на город и горы", src: "images/orbi-beach-tower/orbi-beach-04.png" },
          { name: "Балкон: море, парк и олива", src: "images/orbi-beach-tower/orbi-beach-05.png" },
          { name: "Панорама: парк, пляж и море", src: "images/orbi-beach-tower/orbi-beach-06.png" },
          { name: "Гостиная и проём в спальню", src: "images/orbi-beach-tower/orbi-beach-07.png" },
          { name: "Санузел", src: "images/orbi-beach-tower/orbi-beach-08.png" },
          { name: "Прихожая и встроенные шкафы", src: "images/orbi-beach-tower/orbi-beach-09.png" },
          { name: "Кухня с холодильником Samsung", src: "images/orbi-beach-tower/orbi-beach-10.png" },
          { name: "Гостиная и вид на море", src: "images/orbi-beach-tower/orbi-beach-11.png" },
          { name: "Гостиная с декоративной стеной", src: "images/orbi-beach-tower/orbi-beach-12.png" },
          { name: "Спальня", src: "images/orbi-beach-tower/orbi-beach-13.png" },
          { name: "Кухня: Bosch и Gorenje", src: "images/orbi-beach-tower/orbi-beach-14.png" },
          { name: "Стол из дуба, ТВ и рабочее место", src: "images/orbi-beach-tower/orbi-beach-15.png" },
          { name: "Кухня и посудомоечная машина", src: "images/orbi-beach-tower/orbi-beach-16.png" },
          { name: "Спальня, акцентная стена", src: "images/orbi-beach-tower/orbi-beach-17.png" },
          { name: "Спальня с видом на город", src: "images/orbi-beach-tower/orbi-beach-18.png" },
          { name: "Кухня, прихожая и книжный шкаф", src: "images/orbi-beach-tower/orbi-beach-19.png" },
        ],
      },
      {
        id: "apt-orbi-beach-tower-3001",
        title: "ORBI BEACH TOWER — панорамная квартира на море",
        detailHref: "apartment.html",
        description:
          "ORBI BEACH TOWER — панорамная квартира на море, ул. Шерифа Химшиашвили, 57, 30 этаж. Планировка 1+1, 50 м². Отличный балкон с видом на море, панорамные окна. Квартира полностью укомплектована мебелью и техникой. Прямо перед домом — парк Качинских; рядом Metrocity, рестораны и фитнес-клуб; через дорогу — набережная и пляж. Солнечная сторона и прекрасный вид на закаты. Цена ориентировочно $130 000 — уточняйте актуальность и условия сделки у менеджера.",
        priceGel: 351_000,
        priceKind: "fixed",
        geo: {
          address: "Батуми, ул. Шерифа Химшиашвили, 57",
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256",
        },
        rooms: "1+1",
        areaM2: 50,
        floorsText: "30 этаж",
        completionText: "вторичный фонд",
        photos: [
          { name: "Балкон: панорама моря и набережная", src: "images/orbi-beach-tower-3001/orbi-3001-01.png" },
          { name: "Гостиная и зона столовой", src: "images/orbi-beach-tower-3001/orbi-3001-02.png" },
          { name: "Спальня", src: "images/orbi-beach-tower-3001/orbi-3001-03.png" },
          { name: "Санузел", src: "images/orbi-beach-tower-3001/orbi-3001-04.png" },
          { name: "Балкон: море и закат", src: "images/orbi-beach-tower-3001/orbi-3001-05.png" },
          { name: "Вид с высоты: парк, пляж и море", src: "images/orbi-beach-tower-3001/orbi-3001-06.png" },
          { name: "Кухонная зона", src: "images/orbi-beach-tower-3001/orbi-3001-07.png" },
          { name: "Кухня и гостиная, общий план", src: "images/orbi-beach-tower-3001/orbi-3001-08.png" },
          { name: "Балкон с панорамными окнами", src: "images/orbi-beach-tower-3001/orbi-3001-09.png" },
          { name: "Гостиная, вид на море", src: "images/orbi-beach-tower-3001/orbi-3001-10.png" },
          { name: "Гостиная с террасой", src: "images/orbi-beach-tower-3001/orbi-3001-11.png" },
        ],
      },
      {
        id: "apt-old-town-studio",
        title: "Студия в Старом городе",
        detailHref: "apartment.html",
        description:
          "Компактная студия в историческом квартале Батуми: рядом набережная, кафе, магазины и атмосфера Старого города. Площадь оптимальна для одного-двух человек; есть всё необходимое для жизни без лишней площади. Локация востребована у туристов — объект интересен как стартовое жильё или как инвестиция под посуточную и краткосрочную аренду. Окна выходят во двор или на тихую улицу в зависимости от этажа; уточняйте актуальный вид и меблировку при просмотре. Юридическое сопровождение сделки возможно через агентство.",
        priceGel: 72_500,
        priceKind: "fixed",
        geo: {
          address: "Батуми, Старый город",
          lat: 41.642_8,
          lng: 41.634_1,
        },
        rooms: "студия",
        areaM2: 34,
        floorsText: "исторический центр",
        completionText: "вторичный фонд",
        photos: [
          { name: "Общий план", src: "images/property-3.jpg" },
          { name: "Вид из окна", src: "images/property-1.png" },
        ],
      },
      {
        id: "apt-airport-3p1",
        title: "Квартира 3+1 у аэропорта",
        detailHref: "apartment.html",
        description:
          "Светлая квартира 3+1 в спальном районе у аэропорта Батуми: удобный выезд на трассу, тихий двор, развитая маршрутная сеть до центра и моря. Планировка с изолированными спальнями и просторной кухней-гостиной подойдёт для семьи или для аренды сотрудникам компаний. В шаговой доступности магазины, школа и остановки. Состояние и комплектация уточняются на показе; возможна ипотека и юридическое сопровождение сделки через агентство.",
        priceGel: 145_000,
        priceKind: "fixed",
        geo: {
          address: "Батуми, район аэропорта",
          lat: 41.604_5,
          lng: 41.599_2,
        },
        rooms: "3+1",
        areaM2: 85,
        floorsText: "спальный район",
        completionText: "вторичный фонд",
        photos: [
          { name: "Гостиная", src: "images/property-2.png" },
          { name: "Кухня", src: "images/property-1.png" },
          { name: "Спальня", src: "images/property-3.jpg" },
        ],
      },
    ],

    house: [
      {
        id: "house-makhinjauri",
        title: "Дом с участком, Махинджаури",
        detailHref: "search.html",
        description:
          "Двухэтажный дом в Махинджаури с собственным участком и террасой с видом на горы и кроны деревьев. На территории есть место под парковку, зона отдыха и возможность обустроить сад или огород. Дом подойдёт тем, кто ценит тишину, чистый воздух и близость к морю без плотной застройки. Планировка предполагает несколько спален и общую гостиную; отделка и инженерия уточняются на показе. Район с развитой дорогой до Батуми; удобен для постоянного проживания семьёй или как загородная резиденция.",
        priceGel: 245_000,
        priceKind: "from",
        geo: {
          address: "Махинджаури, горная зона",
          lat: 41.668_9,
          lng: 41.681_2,
        },
        rooms: "5",
        areaM2: 180,
        photos: [
          { name: "Дом снаружи", src: "images/property-2.png" },
          { name: "Двор и сад", src: "images/property-1.png" },
        ],
      },
      {
        id: "house-chakvi",
        title: "Коттедж у леса, Чакви",
        detailHref: "search.html",
        description:
          "Коттедж в Чакви в зелёной зоне рядом с лесным массивом и заповедными участками. Продуманная планировка с гостиной, несколькими спальнями и выходом на террасу; на участке можно организовать зону барбекю и парковку. Свежий воздух и природа на расстоянии вытянутой руки при этом недалеко от моря и основных дорог. Объект интересен для постоянного проживания, удалённой работы «с природой» или как дача для выходных. Актуальное состояние коммуникаций и границ участка согласуются при осмотре и проверке документов.",
        priceGel: 189_000,
        priceKind: "fixed",
        geo: {
          address: "Чакви, тихий переулок",
          lat: 41.591_2,
          lng: 41.703_4,
        },
        rooms: "4",
        areaM2: 145,
        photos: [
          { name: "Участок", src: "images/property-3.jpg" },
          { name: "Терраса", src: "images/property-2.png" },
        ],
      },
    ],
  };

  function cloneDefaultArray(items) {
    return JSON.parse(JSON.stringify(items));
  }

  /**
   * Сохраняет уже заданные группы: любой массив по ключу (включая пустой).
   * Если ключа нет или значение не массив — подставляются примеры по умолчанию.
   * Дополнительные ключи из existing переносятся как есть.
   */
  function mergeObjectGroups(existing, defaults) {
    var out = {};
    var hasExisting = existing && typeof existing === "object";

    Object.keys(defaults).forEach(function (key) {
      var preset = hasExisting && Object.prototype.hasOwnProperty.call(existing, key);
      var val = preset ? existing[key] : null;
      if (preset && Array.isArray(val)) {
        out[key] = val;
      } else {
        out[key] = cloneDefaultArray(defaults[key]);
      }
    });

    if (hasExisting) {
      Object.keys(existing).forEach(function (key) {
        if (!Object.prototype.hasOwnProperty.call(out, key)) {
          out[key] = existing[key];
        }
      });
    }

    return out;
  }

  global.REALTOR_OBJECT_GROUPS = mergeObjectGroups(
    global.REALTOR_OBJECT_GROUPS,
    DEFAULT_REALTOR_OBJECT_GROUPS
  );
})(typeof window !== "undefined" ? window : globalThis);
