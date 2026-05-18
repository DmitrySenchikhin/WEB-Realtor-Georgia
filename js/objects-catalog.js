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
 *
 * На главной блоки «Лучшие предложения» и «Квартиры в Батуми» (data-property-card-group="apartments")
 * показывают все объекты группы apartments; lead — data-property-card-lead.
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
          lat: 41.6349111,
          lng: 41.6145671,
          mapsUrl: "https://www.google.com/maps?q=41.6349111,41.6145671",
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
        id: "nb-ramada-one-development",
        title: "RAMADA by One Development",
        detailHref: "new-building-2.html",
        description:
          "RAMADA by One Development — брендированные резиденции Ramada Residences by Wyndham Batumi (One Development): первый проект такого формата в туристическом центре города, аллея Героев; ориентир адреса — ул. Пиросмани, 10 (до моря около 435 м по материалам застройщика). Премиальный сервис и управление — River Rock Hotels & Resorts (опыт в управлении недвижимостью и арендой). На площадке заявлены бассейн и лаунж, ресторан, тренажёрный зал, sky bar, паркинг (в т.ч. до 5 уровней), дизайн интерьеров по стандартам Ramada by Wyndham. Сдача — IV квартал 2029 (по рекламным материалам). На брошюрах указаны ориентиры по доходности краткосрочной аренды и росту стоимости — не являются гарантией; актуальные условия, цены и документы — у отдела продаж и на onedev.ge.",
        priceGel: 3150,
        priceKind: "per",
        geo: {
          address: "Батуми, ул. Пиросмани, 10 (аллея Героев)",
          lat: 41.640887,
          lng: 41.617456,
          mapsUrl: "https://www.google.com/maps?q=41.640887,41.617456",
        },
        rooms: "студия — 3+1",
        areaM2: 38,
        floorsText: "высотная башня, sky bar",
        completionText: "сдача — IV кв. 2029",
        photos: [
          { name: "Башня Ramada Residences by Wyndham", src: "images/ramada-one-development/ramada-08.png" },
          { name: "Тренажёрный зал", src: "images/ramada-one-development/ramada-01.png" },
          { name: "Управляющая компания River Rock", src: "images/ramada-one-development/ramada-02.png" },
          { name: "Дизайн резиденций Ramada by Wyndham", src: "images/ramada-one-development/ramada-03.png" },
          { name: "Бассейн и лаунж-зона", src: "images/ramada-one-development/ramada-04.png" },
          { name: "Ресторан", src: "images/ramada-one-development/ramada-05.png" },
          { name: "Ramada Residences: проект и инвестиции", src: "images/ramada-one-development/ramada-06.png" },
          { name: "Вход RAMADA Residences, паркинг", src: "images/ramada-one-development/ramada-07.png" },
          { name: "Sky bar на крыше", src: "images/ramada-one-development/ramada-09.png" },
          { name: "Локация: аллея Героев", src: "images/ramada-one-development/ramada-10.png" },
          { name: "Туристический центр, ул. Пиросмани 10", src: "images/ramada-one-development/ramada-11.png" },
        ],
      },
    ],

    apartments: [
      {
        id: "apt-orbi-beach-tower-2201",
        title: "ORBI BEACH TOWER 2201",
        detailHref: "apartment.html",
        description:
          "ORBI BEACH TOWER — 1+1 панорама. Батуми, ул. Шерифа Химшиашвили, 57. 14 этаж, 50 м². Первая линия моря, прямой вид на море, гарантированная панорама. Отлично подходит для жизни и для сдачи в аренду. Квартира со свежим ремонтом, ранее не сдавалась: панорамные окна, светлые комнаты, высокий арендный спрос. В доме — ресепция, лифты, охрана. Развитая инфраструктура: торговый центр, сетевые магазины, SPA и фитнес, парк имени Лех и Марии Качиньских, набережная, кафе и рестораны, прогулочная зона. Цена $125 000 — уточняйте актуальность и условия сделки у менеджера.",
        priceGel: 337_500,
        priceKind: "fixed",
        geo: {
          address: "Батуми, ул. Шерифа Химшиашвили, 57",
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256",
        },
        rooms: "1+1",
        areaM2: 50,
        floorsText: "14 этаж",
        completionText: "свежий ремонт",
        photos: [
          { name: "Гостиная с панорамными окнами", src: "images/orbi-beach-tower-2201/orbi-2201-02.png" },
          { name: "Панорама: первая линия, море и набережная", src: "images/orbi-beach-tower-2201/orbi-2201-01.png" },
          { name: "Столовая зона, вид на море", src: "images/orbi-beach-tower-2201/orbi-2201-03.png" },
          { name: "Кухня и гостиная", src: "images/orbi-beach-tower-2201/orbi-2201-04.png" },
          { name: "Кухня", src: "images/orbi-beach-tower-2201/orbi-2201-05.png" },
          { name: "Спальня, вид на море", src: "images/orbi-beach-tower-2201/orbi-2201-06.png" },
          { name: "Санузел", src: "images/orbi-beach-tower-2201/orbi-2201-07.png" },
          { name: "Лобби ORBI Beach Tower, рецепция", src: "images/orbi-beach-tower-2201/orbi-2201-08.png" },
        ],
      },
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
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256",
        },
        rooms: "1+1",
        areaM2: 50,
        floorsText: "29 этаж",
        completionText: "вторичный фонд",
        photos: [
          { name: "Вид с балкона: море и парк", src: "images/orbi-beach-tower-2912/orbi-beach-01.png" },
          { name: "Балкон с мебелью Nardi, вид на горы", src: "images/orbi-beach-tower-2912/orbi-beach-02.png" },
          { name: "Гостиная с панорамными окнами", src: "images/orbi-beach-tower-2912/orbi-beach-03.png" },
          { name: "Балкон: вид на город и горы", src: "images/orbi-beach-tower-2912/orbi-beach-04.png" },
          { name: "Балкон: море, парк и олива", src: "images/orbi-beach-tower-2912/orbi-beach-05.png" },
          { name: "Панорама: парк, пляж и море", src: "images/orbi-beach-tower-2912/orbi-beach-06.png" },
          { name: "Гостиная и проём в спальню", src: "images/orbi-beach-tower-2912/orbi-beach-07.png" },
          { name: "Санузел", src: "images/orbi-beach-tower-2912/orbi-beach-08.png" },
          { name: "Прихожая и встроенные шкафы", src: "images/orbi-beach-tower-2912/orbi-beach-09.png" },
          { name: "Кухня с холодильником Samsung", src: "images/orbi-beach-tower-2912/orbi-beach-10.png" },
          { name: "Гостиная и вид на море", src: "images/orbi-beach-tower-2912/orbi-beach-11.png" },
          { name: "Гостиная с декоративной стеной", src: "images/orbi-beach-tower-2912/orbi-beach-12.png" },
          { name: "Спальня", src: "images/orbi-beach-tower-2912/orbi-beach-13.png" },
          { name: "Кухня: Bosch и Gorenje", src: "images/orbi-beach-tower-2912/orbi-beach-14.png" },
          { name: "Стол из дуба, ТВ и рабочее место", src: "images/orbi-beach-tower-2912/orbi-beach-15.png" },
          { name: "Кухня и посудомоечная машина", src: "images/orbi-beach-tower-2912/orbi-beach-16.png" },
          { name: "Спальня, акцентная стена", src: "images/orbi-beach-tower-2912/orbi-beach-17.png" },
          { name: "Спальня с видом на город", src: "images/orbi-beach-tower-2912/orbi-beach-18.png" },
          { name: "Кухня, прихожая и книжный шкаф", src: "images/orbi-beach-tower-2912/orbi-beach-19.png" },
        ],
      },
      {
        id: "apt-avenue-by-orbi-studio",
        title: "AVENUE by ORBI студия 32м2 в новом жилом комплексе на Аллее Героев",
        detailHref: "apartment.html",
        description:
          "AVENUE by ORBI — студия 32 м² в новом жилом комплексе на аллее Героев (пр. Жиули Шартавы, 24). Высокий этаж, состояние белый каркас: удобная база под отделку под себя или под сдачу. Башня ORBI с панорамной архитектурой, развитая инфраструктура района, пешая доступность до моря и туристического центра. Подходит для инвестиции в строящийся премиальный комплекс. Актуальную цену, этаж, вид из окон и условия сделки уточняйте у менеджера.",
        priceGel: 86_400,
        priceKind: "fixed",
        geo: {
          address: "Батуми, пр. Жиули Шартавы, 24 (аллея Героев, AVENUE by ORBI)",
          lat: 41.633_075,
          lng: 41.624_593,
          mapsUrl: "https://www.google.com/maps?q=41.633075,41.624593",
        },
        rooms: "студия",
        areaM2: 32,
        floorsText: "высокий этаж",
        completionText: "белый каркас",
        photos: [
          { name: "AVENUE by ORBI — фасад и набережная", src: "images/avenue-by-orbi/avenue-03.png" },
          { name: "AVENUE by ORBI — вид на аллею Героев", src: "images/avenue-by-orbi/avenue-01.png" },
          { name: "AVENUE by ORBI — вечерний вид комплекса", src: "images/avenue-by-orbi/avenue-02.png" },
        ],
      },
      {
        id: "apt-raduga-elt-studio",
        title: "Студия в Радуге ЭЛТ Квартал",
        detailHref: "apartment.html",
        description:
          "Продаётся квартира-студия в жилом комплексе ELT RAINBOW (Радуга, ЭЛТ Квартал). Адрес: ул. Адлия, 2, Батуми. 12 этаж, 32,2 м². Рядом парк Лех и Марии Качинских и ТРЦ Metro City; до моря около 150 м. Хорошо подходит как для проживания, так и для сдачи в аренду. Чёрный каркас, газ, дом сдан — готова к ремонту. Дизайн-проект в подарок и скидка на ремонтные работы (условия уточняйте у менеджера). Развитая инфраструктура ELT квартала: кинотеатр, кафе и рестораны, аптеки, круглосуточные магазины, тренажёрный зал. Цена $38 000 (США). Юридическое сопровождение сделки — через агентство.",
        priceGel: 102_600,
        priceKind: "fixed",
        geo: {
          address: "Батуми, ул. Адлия, 2 (Радуга ЭЛТ Квартал)",
          lat: 41.620_473,
          lng: 41.591_88,
          mapsUrl: "https://www.google.com/maps?q=41.620473,41.591880",
        },
        rooms: "студия",
        areaM2: 32.2,
        floorsText: "12 этаж",
        completionText: "чёрный каркас, газ",
        photos: [
          { name: "Вход в ЖК Rainbow (Радуга ЭЛТ Квартал)", src: "images/raduga-elt-quarter/raduga-01.png" },
          { name: "Лобби с лифтами", src: "images/raduga-elt-quarter/raduga-02.png" },
          { name: "Холл этажа", src: "images/raduga-elt-quarter/raduga-03.png" },
          { name: "Планировка студии 32,2 м²", src: "images/raduga-elt-quarter/raduga-04.png" },
          { name: "Студия: каркас, вид на балкон", src: "images/raduga-elt-quarter/raduga-05.png" },
          { name: "Студия: каркас, прихожая", src: "images/raduga-elt-quarter/raduga-06.png" },
          { name: "Балкон, вид на район", src: "images/raduga-elt-quarter/raduga-07.png" },
          { name: "Вид с высоты на город и море", src: "images/raduga-elt-quarter/raduga-08.png" },
        ],
      },
      {
        id: "apt-alliance-privilege-studio",
        title: "Студия в Alliance Privilege",
        detailHref: "apartment.html",
        description:
          "Продаются апартаменты-студия в Alliance Privilege. Адрес: проспект Руставели, 42, Батуми. 30 м², 13 этаж. Элитный жилой комплекс с управлением от McInerney Hospitality International — партнёра Marriott International. Уникальное расположение на Батумском бульваре: рядом дельфинарий, парк с озером, пляж и Старый город. Инфраструктура премиум-уровня по стандартам Marriott International: бассейн с морской водой, СПА-комплекс, фитнес-центр, рестораны и кафе, крупнейшее казино в регионе, двухуровневый подземный паркинг на 120 мест, детский развлекательный центр, конференц-залы и пространства для мероприятий, ресепшн, консьерж, охрана, видеонаблюдение. Идеальный выбор для жизни и инвестиций. Шикарный дизайн и ремонт с мебелью и техникой; светлая, сухая и тёплая квартира; панорамный вид на море и город в сторону Турции. Актуальную цену и условия сделки уточняйте у менеджера.",
        priceGel: 270_000,
        priceKind: "fixed",
        geo: {
          address: "Батуми, проспект Руставели, 42 (Alliance Privilege)",
          lat: 41.648_813,
          lng: 41.623_825,
          mapsUrl: "https://www.google.com/maps?q=41.648813,41.623825",
        },
        rooms: "студия",
        areaM2: 30,
        floorsText: "13 этаж",
        completionText: "ремонт с мебелью",
        photos: [
          {
            name: "Alliance Privilege — фасад комплекса",
            src: "images/alliance-privilege/alliance-facade.png",
            fit: "contain",
          },
          { name: "Alliance Privilege — фасад Marriott", src: "images/alliance-privilege/alliance-00.png" },
          { name: "Alliance Privilege: вид на море и бульвар", src: "images/alliance-privilege/alliance-01.png" },
          { name: "Студия: общий вид", src: "images/alliance-privilege/alliance-02.png" },
          { name: "Спальная зона", src: "images/alliance-privilege/alliance-03.png" },
          { name: "Рабочая зона и ТВ", src: "images/alliance-privilege/alliance-04.png" },
          { name: "Кухонная зона", src: "images/alliance-privilege/alliance-05.png" },
          { name: "Кухня: техника и подсветка", src: "images/alliance-privilege/alliance-06.png" },
          { name: "Санузел", src: "images/alliance-privilege/alliance-07.png" },
          { name: "Душевая", src: "images/alliance-privilege/alliance-08.png" },
          { name: "Прихожая", src: "images/alliance-privilege/alliance-09.png" },
        ],
      },
      {
        id: "apt-marina-club-1p1",
        title: "Marina Club 1+1",
        detailHref: "apartment.html",
        description:
          "Апартаменты 1+1 в Marina Club Block C. Адрес: Батуми, ул. Лех и Марии Качиньских, 19/1. 9 этаж, 47,3 м². Новый бульвар: рядом парк имени Лех и Марии Качиньских, ТРЦ Metro City, магазины, аптеки, кафе, рестораны, казино, аэропорт. Премиальный жилой комплекс — благоустроенная зелёная территория, открытый и закрытый бассейны, кинотеатр, общая терраса на крыше, ресторан, кафе, бар, SPA и фитнес-центр, лифты Kone, детская и спортивная площадки, круглосуточная охрана и видеонаблюдение, управляющая компания, вестибюль, ресепшн, консьерж, коммерческие и офисные помещения. Первая береговая линия от моря. Сдача — IV квартал 2025. Подходит для жизни и для сдачи в аренду. Квартира в белом каркасе, панорамные окна, качественная отделка, вид на горы и город. Цена $58 000 — уточняйте актуальность и условия сделки у менеджера.",
        priceGel: 156_600,
        priceKind: "fixed",
        geo: {
          address: "Батуми, ул. Лех и Марии Качиньских, 19/1 (Marina Club Block C)",
          lat: 41.621_463,
          lng: 41.590_898,
          mapsUrl: "https://www.google.com/maps?q=41.621463,41.590898",
        },
        rooms: "1+1",
        areaM2: 47.3,
        floorsText: "9 этаж",
        completionText: "белый каркас, IV кв. 2025",
        photos: [
          { name: "Marina Club Block C — фасад комплекса", src: "images/marina-club/marina-01.png" },
          { name: "Marina Club — вид на стройку и море", src: "images/marina-club/marina-02.png" },
          { name: "Первая линия: вид на море", src: "images/marina-club/marina-03.png" },
          { name: "Планировка 1+1, 47,3 м²", src: "images/marina-club/marina-04.png" },
        ],
      },
      {
        id: "apt-batumi-view-studio",
        title: "Batumi View студия",
        detailHref: "apartment.html",
        description:
          "Просторная студия в жилом комплексе Batumi View, block B. Адрес: Батуми, ул. Лех и Марии Качиньских, 8. 4 этаж, 36 м². Новый бульвар: рядом парк имени Лех и Марии Качиньских, ТРЦ Metro City. Новый жилой комплекс премиум-класса — ресепшн и круглосуточная охрана, закрытая территория, коммерческие объекты, магазины, рестораны, спортивный зал, игровые площадки. До моря около 50 м, скоростные лифты, подземный и наземный паркинг. Подходит для проживания и для сдачи в аренду. Студия с качественным ремонтом, мебелью и техникой, вид на море. Цена $105 000 — уточняйте актуальность и условия сделки у менеджера.",
        priceGel: 283_500,
        priceKind: "fixed",
        geo: {
          address: "Батуми, ул. Лех и Марии Качиньских, 8 (Batumi View, block B)",
          lat: 41.623_179,
          lng: 41.593_071,
          mapsUrl: "https://www.google.com/maps?q=41.623179,41.593071",
        },
        rooms: "студия",
        areaM2: 36,
        floorsText: "4 этаж",
        completionText: "ремонт с мебелью",
        photos: [
          { name: "Вид на море с балкона", src: "images/batumi-view/batumi-view-01.png" },
          { name: "Спальная зона", src: "images/batumi-view/batumi-view-02.png" },
          { name: "Студия: прихожая и спальня", src: "images/batumi-view/batumi-view-03.png" },
          { name: "Кухня и прихожая", src: "images/batumi-view/batumi-view-04.png" },
          { name: "Кухонная зона", src: "images/batumi-view/batumi-view-05.png" },
          { name: "Гардероб и зона стирки", src: "images/batumi-view/batumi-view-06.png" },
        ],
      },
    ],

    house: [],
  };

  function cloneDefaultArray(items) {
    return JSON.parse(JSON.stringify(items));
  }

  /** Дополняет сохранённый массив объектами из каталога по умолчанию (по id). */
  function mergeCatalogArray(existing, defaults) {
    if (!Array.isArray(existing)) return cloneDefaultArray(defaults);
    if (!Array.isArray(defaults) || !defaults.length) return existing.slice();

    var existingById = {};
    existing.forEach(function (item) {
      if (item && item.id) existingById[item.id] = item;
    });

    var merged = defaults.map(function (def) {
      if (def && def.id && existingById[def.id]) return existingById[def.id];
      return cloneDefaultArray([def])[0];
    });

    existing.forEach(function (item) {
      if (!item || !item.id) return;
      var inDefaults = defaults.some(function (d) {
        return d && d.id === item.id;
      });
      if (!inDefaults) merged.push(item);
    });

    return merged;
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
        out[key] = mergeCatalogArray(val, defaults[key]);
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
