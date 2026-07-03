/**
 * Группы объектов недвижимости для сайта.
 * Подключите до main.js: <script src="/js/objects-catalog.js" defer></script>
 *
 * Если до этого скрипта уже задан window.REALTOR_OBJECT_GROUPS, данные не затираются:
 * для совпадающих ключей сохраняются ваши массивы (в том числе пустые); отсутствующие
 * ключи заполняются примерами из каталога по умолчанию. Свои дополнительные группы
 * (другие ключи) тоже остаются в объекте.
 *
 * Группы по умолчанию: "new-building" | "apartments" | "house"
 * Поля объекта:
 *   id, detailHref, priceGel, priceKind, priceFromTotalGel (опц.), geo, roomsKey (квартиры), areaM2, photos
 * geo: координаты lat/lng, mapsUrl
 * roomsKey (квартиры): studio | 1+1 | 2+1 — для фильтра по комнатам
 * photos: { name — подпись/название снимка, src — путь к файлу }
 * detailHref: ссылка на страницу объекта
 * Тексты (title, description, rooms, address и т.д.) — в папках description ru/, description en/, description geo/
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
        detailHref: "/new-building.html",
        priceGel: 3915,
        priceKind: "per",
        priceFromTotalGel: 121500,
        geo: {
          lat: 41.625083,
          lng: 41.605917,
          mapsUrl: "https://www.google.com/maps?q=41.625083,41.605917"
        },
        areaM2: 32,
        photos: [
          { name: "Презентация SPORT CITY — 1", src: "/images/sport-city/sport-city-01.png" },
          { name: "Презентация SPORT CITY — 2", src: "/images/sport-city/sport-city-02.png" },
          { name: "Презентация SPORT CITY — 3", src: "/images/sport-city/sport-city-03.png" },
          { name: "Презентация SPORT CITY — 4", src: "/images/sport-city/sport-city-04.png" },
          { name: "Презентация SPORT CITY — 5", src: "/images/sport-city/sport-city-05.png" },
          { name: "Презентация SPORT CITY — 6", src: "/images/sport-city/sport-city-06.png" },
          { name: "Презентация SPORT CITY — 7", src: "/images/sport-city/sport-city-07.png" },
          { name: "Презентация SPORT CITY — 8", src: "/images/sport-city/sport-city-08.png" },
          { name: "Презентация SPORT CITY — 9", src: "/images/sport-city/sport-city-09.png" },
          { name: "Презентация SPORT CITY — 10", src: "/images/sport-city/sport-city-10.png" },
          { name: "Презентация SPORT CITY — 11", src: "/images/sport-city/sport-city-11.png" },
          { name: "Презентация SPORT CITY — 12", src: "/images/sport-city/sport-city-12.png" }
        ]
    },
{
        id: "nb-stay-rent",
        detailHref: "/new-building-stay-rent.html",
        priceGel: 4598,
        priceKind: "per",
        priceFromTotalGel: 220212,
        geo: {
          lat: 41.624217,
          lng: 41.606325,
          mapsUrl: "https://www.google.com/maps?q=41.624217,41.606325"
        },
        areaM2: 48,
        photos: [
          { name: "Акция: скидка 6% в ипотеку", src: "/images/stay-rent/stay-rent-01.png" },
          { name: "Планировки и варианты отделки", src: "/images/stay-rent/stay-rent-02.png" },
          { name: "ONE Development — качество и сервис", src: "/images/stay-rent/stay-rent-03.png" },
          { name: "Stay&Rent: локация и образ жизни", src: "/images/stay-rent/stay-rent-04.png" },
          { name: "Комплекс: бассейны и инфраструктура", src: "/images/stay-rent/stay-rent-05.png" }
        ]
    },
{
        id: "new-bilding-one",
        detailHref: "/new-building.html",
        priceGel: 2950,
        priceKind: "per",
        geo: {
          lat: 41.6349111,
          lng: 41.6145671,
          mapsUrl: "https://www.google.com/maps?q=41.6349111,41.6145671"
        },
        areaM2: 35,
        photos: [
          { name: "Жилой дом ONE, бизнес-класс", src: "/images/new-bilding-one/one-05.png" },
          { name: "ONE: завершение строительства IV кв. 2027", src: "/images/new-bilding-one/one-06.png" },
          { name: "Локация: центр Батуми, до моря 700 м", src: "/images/new-bilding-one/one-07.png" },
          { name: "Почему инвесторы выбирают Батуми", src: "/images/new-bilding-one/one-08.png" },
          { name: "Инфраструктура: бассейн, терраса, sky bar", src: "/images/new-bilding-one/one-09.png" },
          { name: "Инфраструктура: бассейн, барбекю, детская площадка", src: "/images/new-bilding-one/one-10.png" },
          { name: "Планировки и условия рассрочки", src: "/images/new-bilding-one/one-11.png" },
          { name: "Студия №410, 36 м² — white frame", src: "/images/new-bilding-one/one-12.png" },
          { name: "Студия №409, 36,6 м² — под ключ", src: "/images/new-bilding-one/one-13.png" },
          { name: "Трёхэтажный таунхаус, 146,7 м²", src: "/images/new-bilding-one/one-14.png" },
          { name: "Инфраструктура: бассейн на крыше", src: "/images/new-bilding-one/one-01.png" },
          { name: "ЖК ONE: проект и условия", src: "/images/new-bilding-one/one-02.png" },
          { name: "Фасад и European Property Awards", src: "/images/new-bilding-one/one-03.png" },
          { name: "Локация: сервисы рядом", src: "/images/new-bilding-one/one-04.png" }
        ]
    },
{
        id: "nb-ramada-one-development",
        detailHref: "/new-building-2.html",
        priceGel: 3150,
        priceKind: "per",
        geo: {
          lat: 41.640887,
          lng: 41.617456,
          mapsUrl: "https://www.google.com/maps?q=41.640887,41.617456"
        },
        areaM2: 38,
        photos: [
          { name: "Башня Ramada Residences by Wyndham", src: "/images/ramada-one-development/ramada-08.png" },
          { name: "Тренажёрный зал", src: "/images/ramada-one-development/ramada-01.png" },
          { name: "Управляющая компания River Rock", src: "/images/ramada-one-development/ramada-02.png" },
          { name: "Дизайн резиденций Ramada by Wyndham", src: "/images/ramada-one-development/ramada-03.png" },
          { name: "Бассейн и лаунж-зона", src: "/images/ramada-one-development/ramada-04.png" },
          { name: "Ресторан", src: "/images/ramada-one-development/ramada-05.png" },
          { name: "Ramada Residences: проект и инвестиции", src: "/images/ramada-one-development/ramada-06.png" },
          { name: "Вход RAMADA Residences, паркинг", src: "/images/ramada-one-development/ramada-07.png" },
          { name: "Sky bar на крыше", src: "/images/ramada-one-development/ramada-09.png" },
          { name: "Локация: аллея Героев", src: "/images/ramada-one-development/ramada-10.png" },
          { name: "Туристический центр, ул. Пиросмани 10", src: "/images/ramada-one-development/ramada-11.png" }
        ]
    }
    ],
    "apartments": [
{
        id: "apt-orbi-beach-tower-2912",
        detailHref: "/apartment.html",
        priceGel: 351000,
        priceKind: "fixed",
        geo: {
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256"
        },
        areaM2: 50,
        photos: [
          { name: "Балкон с видом на море", src: "/images/orbi-beach-tower-2912/orbi-beach-01.png" },
          { name: "Балкон: вид на город и горы", src: "/images/orbi-beach-tower-2912/orbi-beach-02.png" },
          { name: "Спальня", src: "/images/orbi-beach-tower-2912/orbi-beach-03.png" },
          { name: "Гостиная с декоративной стеной", src: "/images/orbi-beach-tower-2912/orbi-beach-04.png" },
          { name: "Гостиная с видом на море, рабочая зона", src: "/images/orbi-beach-tower-2912/orbi-beach-05.png" },
          { name: "Гостиная и проём в спальню", src: "/images/orbi-beach-tower-2912/orbi-beach-06.png" },
          { name: "Прихожая и встроенные шкафы", src: "/images/orbi-beach-tower-2912/orbi-beach-07.png" },
          { name: "Кухня: плита и духовка Gorenje", src: "/images/orbi-beach-tower-2912/orbi-beach-08.png" },
          { name: "Кухня с кофемашиной", src: "/images/orbi-beach-tower-2912/orbi-beach-09.png" },
          { name: "Посудомоечная машина Gorenje", src: "/images/orbi-beach-tower-2912/orbi-beach-10.png" },
          { name: "Рабочее место у окна", src: "/images/orbi-beach-tower-2912/orbi-beach-11.png" }
        ],
        roomsKey: "1+1"
    },
{
        id: "apt-orbi-beach-tower-studio",
        detailHref: "/apartment.html",
        priceGel: 159300,
        priceKind: "fixed",
        geo: {
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256"
        },
        areaM2: 32,
        photos: [
          { name: "Студия: кухня, гостиная и спальная зона", src: "/images/orbi-beach-tower-studio/studio-01.png" },
          { name: "Гостиная с ТВ и обеденной зоной", src: "/images/orbi-beach-tower-studio/studio-02.png" },
          { name: "Обеденная зона и спальное место", src: "/images/orbi-beach-tower-studio/studio-03.png" },
          { name: "Спальная зона", src: "/images/orbi-beach-tower-studio/studio-04.png" },
          { name: "ТВ-зона и шкаф", src: "/images/orbi-beach-tower-studio/studio-05.png" },
          { name: "Кухня с техникой", src: "/images/orbi-beach-tower-studio/studio-06.png" },
          { name: "Прихожая", src: "/images/orbi-beach-tower-studio/studio-07.png" },
          { name: "Вид на море и набережную", src: "/images/orbi-beach-tower-studio/studio-08.png" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-orbi-beach-tower-2201",
        detailHref: "/apartment.html",
        priceGel: 324000,
        priceKind: "fixed",
        geo: {
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256"
        },
        areaM2: 50,
        photos: [
          { name: "Гостиная с панорамными окнами", src: "/images/orbi-beach-tower-2201/orbi-2201-02.png" },
          { name: "Панорама: первая линия, море и набережная", src: "/images/orbi-beach-tower-2201/orbi-2201-01.png" },
          { name: "Столовая зона, вид на море", src: "/images/orbi-beach-tower-2201/orbi-2201-03.png" },
          { name: "Кухня и гостиная", src: "/images/orbi-beach-tower-2201/orbi-2201-04.png" },
          { name: "Кухня", src: "/images/orbi-beach-tower-2201/orbi-2201-05.png" },
          { name: "Спальня, вид на море", src: "/images/orbi-beach-tower-2201/orbi-2201-06.png" },
          { name: "Санузел", src: "/images/orbi-beach-tower-2201/orbi-2201-07.png" },
          { name: "Лобби ORBI Beach Tower, рецепция", src: "/images/orbi-beach-tower-2201/orbi-2201-08.png" }
        ],
        roomsKey: "1+1"
    },
{
        id: "apt-orbi-beach-tower-2801",
        detailHref: "/apartment.html",
        priceGel: 351000,
        priceKind: "fixed",
        geo: {
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256"
        },
        areaM2: 50,
        photos: [
          { name: "Балкон: панорама моря", src: "/images/orbi-beach-tower-2801/orbi-2801-01.png" },
          { name: "Гостиная-столовая с видом на море", src: "/images/orbi-beach-tower-2801/orbi-2801-02.png" },
          { name: "Зона отдыха с диваном", src: "/images/orbi-beach-tower-2801/orbi-2801-03.png" },
          { name: "Кухня и проход в спальню", src: "/images/orbi-beach-tower-2801/orbi-2801-04.png" },
          { name: "Спальня с видом на море", src: "/images/orbi-beach-tower-2801/orbi-2801-05.png" },
          { name: "Спальня", src: "/images/orbi-beach-tower-2801/orbi-2801-06.png" },
          { name: "Прихожая", src: "/images/orbi-beach-tower-2801/orbi-2801-07.png" },
          { name: "Гардеробная", src: "/images/orbi-beach-tower-2801/orbi-2801-08.png" },
          { name: "Душевая и стиральная машина", src: "/images/orbi-beach-tower-2801/orbi-2801-09.png" },
          { name: "Санузел", src: "/images/orbi-beach-tower-2801/orbi-2801-10.png" }
        ],
        roomsKey: "1+1"
    },
{
        id: "apt-orbi-beach-tower-3202",
        detailHref: "/apartment.html",
        priceGel: 513000,
        priceKind: "fixed",
        geo: {
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256"
        },
        areaM2: 70,
        photos: [
          { name: "Вид с балкона: море и парк Качиньских", src: "/images/orbi-beach-tower-3202/orbi-3202-01.png" },
          { name: "Гостиная: планировка 2+1", src: "/images/orbi-beach-tower-3202/orbi-3202-02.png" },
          { name: "Гостиная и обеденная зона", src: "/images/orbi-beach-tower-3202/orbi-3202-03.png" },
          { name: "Кухня и гостиная", src: "/images/orbi-beach-tower-3202/orbi-3202-04.png" },
          { name: "Две спальни и кухня", src: "/images/orbi-beach-tower-3202/orbi-3202-05.png" },
          { name: "Спальня", src: "/images/orbi-beach-tower-3202/orbi-3202-06.png" },
          { name: "Спальня с панорамными окнами", src: "/images/orbi-beach-tower-3202/orbi-3202-07.png" },
          { name: "Санузел", src: "/images/orbi-beach-tower-3202/orbi-3202-08.png" },
          { name: "Прихожая", src: "/images/orbi-beach-tower-3202/orbi-3202-09.png" }
        ],
        roomsKey: "2+1"
    },
{
        id: "apt-orbi-beach-tower-2902",
        detailHref: "/apartment.html",
        priceGel: 513000,
        priceKind: "fixed",
        geo: {
          lat: 41.630308,
          lng: 41.602256,
          mapsUrl: "https://www.google.com/maps?q=41.630308,41.602256"
        },
        areaM2: 70,
        photos: [
          { name: "Вид с высоты: парк и море", src: "/images/orbi-beach-tower-2902/orbi-2902-10.png" },
          { name: "Гостиная с кухней и обеденной зоной", src: "/images/orbi-beach-tower-2902/orbi-2902-01.png" },
          { name: "Обеденная зона, ТВ и вид на море", src: "/images/orbi-beach-tower-2902/orbi-2902-02.png" },
          { name: "Планировка 2+1: две спальни", src: "/images/orbi-beach-tower-2902/orbi-2902-03.png" },
          { name: "Спальня с видом на море", src: "/images/orbi-beach-tower-2902/orbi-2902-04.png" },
          { name: "Вторая спальня", src: "/images/orbi-beach-tower-2902/orbi-2902-05.png" },
          { name: "Балкон: панорама моря", src: "/images/orbi-beach-tower-2902/orbi-2902-06.png" },
          { name: "Кухня", src: "/images/orbi-beach-tower-2902/orbi-2902-07.png" },
          { name: "Прихожая", src: "/images/orbi-beach-tower-2902/orbi-2902-08.png" },
          { name: "Санузел", src: "/images/orbi-beach-tower-2902/orbi-2902-09.png" }
        ],
        roomsKey: "2+1"
    },
{
        id: "apt-orbi-city-d1-1p1",
        detailHref: "/apartment.html",
        priceGel: 310500,
        priceKind: "fixed",
        geo: {
          lat: 41.639761,
          lng: 41.614545,
          mapsUrl: "https://www.google.com/maps?q=41.639761,41.614545"
        },
        areaM2: 65,
        photos: [
          { name: "Гостиная: панорама на море с балкона", src: "/images/orbi-city-d1/orbi-city-01.png" },
          { name: "Гостиная с диваном и видом на море", src: "/images/orbi-city-d1/orbi-city-02.png" },
          { name: "Гостиная и обеденная зона", src: "/images/orbi-city-d1/orbi-city-03.png" },
          { name: "Обеденная зона у панорамных окон", src: "/images/orbi-city-d1/orbi-city-04.png" },
          { name: "Спальня с видом на море", src: "/images/orbi-city-d1/orbi-city-05.png" },
          { name: "Вид с 40 этажа: море и город", src: "/images/orbi-city-d1/orbi-city-06.png" },
          { name: "Санузел с мраморной отделкой", src: "/images/orbi-city-d1/orbi-city-07.png" }
        ],
        roomsKey: "1+1"
    },
{
        id: "apt-avenue-by-orbi-studio",
        detailHref: "/apartment.html",
        priceGel: 86400,
        priceKind: "fixed",
        geo: {
          lat: 41.633075,
          lng: 41.624593,
          mapsUrl: "https://www.google.com/maps?q=41.633075,41.624593"
        },
        areaM2: 32,
        photos: [
          { name: "AVENUE by ORBI — фасад и набережная", src: "/images/avenue-by-orbi/avenue-03.png" },
          { name: "AVENUE by ORBI — вид на аллею Героев", src: "/images/avenue-by-orbi/avenue-01.png" },
          { name: "AVENUE by ORBI — вечерний вид комплекса", src: "/images/avenue-by-orbi/avenue-02.png" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-raduga-elt-studio",
        detailHref: "/apartment.html",
        priceGel: 105300,
        priceKind: "fixed",
        geo: {
          lat: 41.620473,
          lng: 41.59188,
          mapsUrl: "https://www.google.com/maps?q=41.620473,41.591880"
        },
        areaM2: 32.2,
        photos: [
          { name: "Вход в ЖК Rainbow (Радуга ЭЛТ Квартал)", src: "/images/raduga-elt-quarter/raduga-01.png" },
          { name: "Лобби с лифтами", src: "/images/raduga-elt-quarter/raduga-02.png" },
          { name: "Холл этажа", src: "/images/raduga-elt-quarter/raduga-03.png" },
          { name: "Планировка студии 32,2 м²", src: "/images/raduga-elt-quarter/raduga-04.png" },
          { name: "Студия: каркас, вид на балкон", src: "/images/raduga-elt-quarter/raduga-05.png" },
          { name: "Студия: каркас, прихожая", src: "/images/raduga-elt-quarter/raduga-06.png" },
          { name: "Балкон, вид на район", src: "/images/raduga-elt-quarter/raduga-07.png" },
          { name: "Вид с высоты на город и море", src: "/images/raduga-elt-quarter/raduga-08.png" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-alliance-privilege-studio",
        detailHref: "/apartment.html",
        priceGel: 270000,
        priceKind: "fixed",
        geo: {
          lat: 41.648813,
          lng: 41.623825,
          mapsUrl: "https://www.google.com/maps?q=41.648813,41.623825"
        },
        areaM2: 30,
        photos: [
          { name: "Alliance Privilege — фасад комплекса", src: "/images/alliance-privilege/alliance-facade.png", fit: "contain" },
          { name: "Alliance Privilege — фасад Marriott", src: "/images/alliance-privilege/alliance-00.png" },
          { name: "Alliance Privilege: вид на море и бульвар", src: "/images/alliance-privilege/alliance-01.png" },
          { name: "Студия: общий вид", src: "/images/alliance-privilege/alliance-02.png" },
          { name: "Спальная зона", src: "/images/alliance-privilege/alliance-03.png" },
          { name: "Рабочая зона и ТВ", src: "/images/alliance-privilege/alliance-04.png" },
          { name: "Кухонная зона", src: "/images/alliance-privilege/alliance-05.png" },
          { name: "Кухня: техника и подсветка", src: "/images/alliance-privilege/alliance-06.png" },
          { name: "Санузел", src: "/images/alliance-privilege/alliance-07.png" },
          { name: "Душевая", src: "/images/alliance-privilege/alliance-08.png" },
          { name: "Прихожая", src: "/images/alliance-privilege/alliance-09.png" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-marina-club-1p1",
        detailHref: "/apartment.html",
        priceGel: 156600,
        priceKind: "fixed",
        geo: {
          lat: 41.621463,
          lng: 41.590898,
          mapsUrl: "https://www.google.com/maps?q=41.621463,41.590898"
        },
        areaM2: 47.3,
        photos: [
          { name: "Marina Club Block C — фасад комплекса", src: "/images/marina-club/marina-01.png" },
          { name: "Marina Club — вид на стройку и море", src: "/images/marina-club/marina-02.png" },
          { name: "Первая линия: вид на море", src: "/images/marina-club/marina-03.png" },
          { name: "Планировка 1+1, 47,3 м²", src: "/images/marina-club/marina-04.png" }
        ],
        roomsKey: "1+1"
    },
{
        id: "apt-batumi-view-studio",
        detailHref: "/apartment.html",
        priceGel: 283500,
        priceKind: "fixed",
        geo: {
          lat: 41.623179,
          lng: 41.593071,
          mapsUrl: "https://www.google.com/maps?q=41.623179,41.593071"
        },
        areaM2: 36,
        photos: [
          { name: "Вид на море с балкона", src: "/images/batumi-view/batumi-view-01.png" },
          { name: "Спальная зона", src: "/images/batumi-view/batumi-view-02.png" },
          { name: "Студия: прихожая и спальня", src: "/images/batumi-view/batumi-view-03.png" },
          { name: "Кухня и прихожая", src: "/images/batumi-view/batumi-view-04.png" },
          { name: "Кухонная зона", src: "/images/batumi-view/batumi-view-05.png" },
          { name: "Гардероб и зона стирки", src: "/images/batumi-view/batumi-view-06.png" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-bluesky-tower-b-studio",
        detailHref: "/apartment.html",
        priceGel: 180900,
        priceKind: "fixed",
        geo: {
          lat: 41.637875,
          lng: 41.61898,
          mapsUrl: "https://www.google.com/maps?q=41.637875,41.618980"
        },
        areaM2: 35,
        photos: [
          { name: "BlueSky Tower — фасад комплекса", src: "/images/bluesky-tower-b/bluesky-01.png" },
          { name: "BlueSky Tower — вход и коммерческая зона", src: "/images/bluesky-tower-b/bluesky-02.png" },
          { name: "Лобби BlueSky Tower", src: "/images/bluesky-tower-b/bluesky-03.png" },
          { name: "Ресепшн и зона отдыха", src: "/images/bluesky-tower-b/bluesky-04.png" },
          { name: "Холл с лифтами", src: "/images/bluesky-tower-b/bluesky-05.png" },
          { name: "Студия: гостиная с видом на аллею Героев", src: "/images/bluesky-tower-b/bluesky-06.png" },
          { name: "Кухня и обеденная зона", src: "/images/bluesky-tower-b/bluesky-07.png" },
          { name: "Прихожая и встроенный шкаф", src: "/images/bluesky-tower-b/bluesky-08.png" },
          { name: "Санузел с душевой", src: "/images/bluesky-tower-b/bluesky-09.png" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-steps-batumi-studio",
        detailHref: "/apartment.html",
        priceGel: 164700,
        priceKind: "fixed",
        geo: {
          lat: 41.625707,
          lng: 41.59986,
          mapsUrl: "https://www.google.com/maps?q=41.625707,41.599860"
        },
        areaM2: 31.6,
        photos: [
          { name: "Steps Batumi — жилой комплекс", src: "/images/steps-batumi/steps-apt-01.jpg" },
          { name: "Спальная зона", src: "/images/steps-batumi/steps-apt-02.jpg" },
          { name: "Гостиная и обеденная зона", src: "/images/steps-batumi/steps-apt-03.jpg" },
          { name: "Кухонная зона", src: "/images/steps-batumi/steps-apt-04.jpg" },
          { name: "Санузел", src: "/images/steps-batumi/steps-apt-05.jpg" },
          { name: "Прихожая", src: "/images/steps-batumi/steps-apt-06.jpg" },
          { name: "Steps Batumi — фасад", src: "/images/steps-batumi/steps-02.jpg" },
          { name: "Steps Batumi — вид на комплекс", src: "/images/steps-batumi/steps-03.jpg" },
          { name: "Steps Batumi Hotel & Suites", src: "/images/steps-batumi/steps-04.jpg" },
          { name: "Steps Batumi — территория", src: "/images/steps-batumi/steps-05.jpg" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-steps-batumi-studio-11",
        detailHref: "/apartment.html",
        priceGel: 135000,
        priceKind: "fixed",
        geo: {
          lat: 41.625707,
          lng: 41.59986,
          mapsUrl: "https://www.google.com/maps?q=41.625707,41.599860"
        },
        areaM2: 24,
        photos: [
          { name: "Steps Batumi — жилой комплекс", src: "/images/steps-batumi/steps-apt-01.jpg" },
          { name: "Steps Batumi — фасад", src: "/images/steps-batumi/steps-02.jpg" },
          { name: "Steps Batumi — вид на комплекс", src: "/images/steps-batumi/steps-03.jpg" },
          { name: "Steps Batumi Hotel & Suites", src: "/images/steps-batumi/steps-04.jpg" },
          { name: "Steps Batumi — территория", src: "/images/steps-batumi/steps-05.jpg" },
          { name: "Вид с балкона: горы и город", src: "/images/steps-batumi-11/steps-11-01.jpg" },
          { name: "Вид с балкона", src: "/images/steps-batumi-11/steps-11-02.jpg" },
          { name: "Спальная зона", src: "/images/steps-batumi-11/steps-11-03.jpg" },
          { name: "Студия: прихожая и гостиная", src: "/images/steps-batumi-11/steps-11-04.jpg" },
          { name: "Спальня и кухонная зона", src: "/images/steps-batumi-11/steps-11-05.jpg" },
          { name: "Кухня и гостиная", src: "/images/steps-batumi-11/steps-11-06.jpg" },
          { name: "Кухня и обеденная зона", src: "/images/steps-batumi-11/steps-11-07.jpg" },
          { name: "Обеденная зона", src: "/images/steps-batumi-11/steps-11-08.jpg" },
          { name: "Санузел", src: "/images/steps-batumi-11/steps-11-09.jpg" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-steps-batumi-2p1",
        detailHref: "/apartment.html",
        priceGel: 378000,
        priceKind: "fixed",
        geo: {
          lat: 41.625707,
          lng: 41.59986,
          mapsUrl: "https://www.google.com/maps?q=41.625707,41.599860"
        },
        areaM2: 61,
        photos: [
          { name: "Кухня-гостиная и обеденная зона", src: "/images/steps-batumi-2p1/steps-2p1-01.png" },
          { name: "Кухня с мраморной отделкой", src: "/images/steps-batumi-2p1/steps-2p1-02.png" },
          { name: "Обеденная зона и кухня", src: "/images/steps-batumi-2p1/steps-2p1-03.png" },
          { name: "Прихожая и вид в кухню-гостиную", src: "/images/steps-batumi-2p1/steps-2p1-04.png" },
          { name: "Спальня с выходом на балкон", src: "/images/steps-batumi-2p1/steps-2p1-05.png" },
          { name: "Спальня с панорамными окнами", src: "/images/steps-batumi-2p1/steps-2p1-06.png" },
          { name: "Спальня со шкафом-купе", src: "/images/steps-batumi-2p1/steps-2p1-07.png" },
          { name: "Вторая спальня", src: "/images/steps-batumi-2p1/steps-2p1-08.png" },
          { name: "Санузел", src: "/images/steps-batumi-2p1/steps-2p1-09.png" }
        ],
        roomsKey: "2+1"
    },
{
        id: "apt-real-palace-blue-2p1",
        detailHref: "/apartment.html",
        priceGel: 378000,
        priceKind: "fixed",
        geo: {
          lat: 41.625497,
          lng: 41.602739,
          mapsUrl: "https://www.google.com/maps?q=41.625497,41.602739"
        },
        areaM2: 81.7,
        photos: [],
        roomsKey: "2+1"
    },
{
        id: "apt-steps-batumi-studio-17",
        detailHref: "/apartment.html",
        priceGel: 186300,
        priceKind: "fixed",
        geo: {
          lat: 41.625707,
          lng: 41.59986,
          mapsUrl: "https://www.google.com/maps?q=41.625707,41.599860"
        },
        areaM2: 37,
        photos: [
          { name: "Студия: гостиная и спальная зона", src: "/images/steps-batumi-studio-17/steps-17-01.png" },
          { name: "Спальная зона", src: "/images/steps-batumi-studio-17/steps-17-02.png" },
          { name: "Студия: кухня и обеденная зона", src: "/images/steps-batumi-studio-17/steps-17-03.png" },
          { name: "Кухня с техникой", src: "/images/steps-batumi-studio-17/steps-17-04.png" },
          { name: "Санузел", src: "/images/steps-batumi-studio-17/steps-17-05.png" },
          { name: "Санузел: душевая", src: "/images/steps-batumi-studio-17/steps-17-06.png" },
          { name: "Гардеробная", src: "/images/steps-batumi-studio-17/steps-17-07.png" },
          { name: "Вид на море с балкона", src: "/images/steps-batumi-studio-17/steps-17-08.png" }
        ],
        roomsKey: "studio"
    },
{
        id: "apt-intourist-residence-2p1",
        detailHref: "/apartment.html",
        priceGel: 507600,
        priceKind: "fixed",
        geo: {
          lat: 41.640129,
          lng: 41.617582,
          mapsUrl: "https://www.google.com/maps?q=41.640129,41.617582"
        },
        areaM2: 73,
        photos: [
          { name: "Гостиная", src: "/images/intourist-residence-2p1/intourist-01.png" },
          { name: "Кухня и обеденная зона", src: "/images/intourist-residence-2p1/intourist-02.png" },
          { name: "Спальня", src: "/images/intourist-residence-2p1/intourist-03.png" },
          { name: "Вторая спальня", src: "/images/intourist-residence-2p1/intourist-04.png" },
          { name: "Санузел", src: "/images/intourist-residence-2p1/intourist-05.png" },
          { name: "Вид с балкона: город", src: "/images/intourist-residence-2p1/intourist-06.png" },
          { name: "Вид с балкона: город и горы", src: "/images/intourist-residence-2p1/intourist-07.png" }
        ],
        roomsKey: "2+1"
    },
{
        id: "apt-tropical-garden-studio",
        detailHref: "/apartment.html",
        priceGel: 189000,
        priceKind: "fixed",
        geo: {
          lat: 41.714513,
          lng: 41.723939,
          mapsUrl: "https://www.google.com/maps?q=41.714513,41.723939"
        },
        areaM2: 35,
        photos: [
          { name: "Tropical Garden — жилой комплекс", src: "/images/tropical-garden/tropical-01.jpg" },
          { name: "Панорама: море, пляж и Батуми", src: "/images/tropical-garden/tropical-10.jpg" },
          { name: "Вид из окна: море и Ботанический сад", src: "/images/tropical-garden/tropical-09.jpg" },
          { name: "Гостиная, вид на балкон", src: "/images/tropical-garden/tropical-02.jpg" },
          { name: "Обеденная зона и ТВ", src: "/images/tropical-garden/tropical-03.jpg" },
          { name: "Студия: гостиная, кухня, шкаф", src: "/images/tropical-garden/tropical-04.jpg" },
          { name: "Кухня и обеденная зона", src: "/images/tropical-garden/tropical-05.jpg" },
          { name: "Гостиная, панорамные окна", src: "/images/tropical-garden/tropical-08.jpg" },
          { name: "Санузел: душевая", src: "/images/tropical-garden/tropical-06.jpg" },
          { name: "Санузел: раковина", src: "/images/tropical-garden/tropical-07.jpg" }
        ],
        roomsKey: "studio"
    }
    ],
    "house": [
{
        id: "house-villa-park-next",
        detailHref: "/apartment.html",
        priceGel: 972000,
        priceKind: "fixed",
        geo: {
          lat: 41.715796,
          lng: 41.728982,
          mapsUrl: "https://www.google.com/maps?q=41.715796,41.728982"
        },
        areaM2: 145.4,
        photos: [
          { name: "Villa Park by NEXT — комплекс в Чакви", src: "/images/villa-park-next/villa-01.png" },
          { name: "Закрытый комплекс: бассейн и виллы", src: "/images/villa-park-next/villa-02.png" },
          { name: "Вход в комплекс Villa Park by NEXT", src: "/images/villa-park-next/villa-03.png" },
          { name: "Кухня-гостиная с обеденной зоной", src: "/images/villa-park-next/villa-04.png" },
          { name: "Гостиная с диваном", src: "/images/villa-park-next/villa-05.png" },
          { name: "Спальня", src: "/images/villa-park-next/villa-06.png" },
          { name: "Спальня с выходом в санузел", src: "/images/villa-park-next/villa-07.png" },
          { name: "Санузел с панорамным окном", src: "/images/villa-park-next/villa-08.png" },
          { name: "Детская и спортивная площадка", src: "/images/villa-park-next/villa-09.png" }
        ]
    },
{
        id: "house-polo-villas-parklane",
        detailHref: "/apartment.html",
        priceGel: 675000,
        priceKind: "fixed",
        geo: {
          lat: 41.612012,
          lng: 41.606074,
          mapsUrl: "https://www.google.com/maps?q=41.612012,41.606074"
        },
        areaM2: 118.4,
        photos: [
          { name: "Polo Villas Parklane — комплекс у Нового бульвара", src: "/images/polo-villas-parklane/polo-01.png" },
          { name: "Закрытая территория: бассейн и таунхаусы", src: "/images/polo-villas-parklane/polo-02.png" },
          { name: "Бассейн и зоны отдыха", src: "/images/polo-villas-parklane/polo-03.png" },
          { name: "Кухня-гостиная с обеденной зоной", src: "/images/polo-villas-parklane/polo-04.png" },
          { name: "Кухня с мраморной отделкой", src: "/images/polo-villas-parklane/polo-05.png" },
          { name: "Спальня", src: "/images/polo-villas-parklane/polo-06.png" },
          { name: "Вторая спальня", src: "/images/polo-villas-parklane/polo-07.png" },
          { name: "Рабочая зона", src: "/images/polo-villas-parklane/polo-08.png" },
          { name: "Санузел с мраморной отделкой", src: "/images/polo-villas-parklane/polo-09.png" },
          { name: "Прачечная: стиральная и сушильная машины", src: "/images/polo-villas-parklane/polo-10.png" }
        ]
    },
{
        id: "house-adlia-townhouse-222",
        detailHref: "/apartment.html",
        priceGel: 499500,
        priceKind: "fixed",
        geo: {
          lat: 41.609,
          lng: 41.6,
          mapsUrl: "https://www.google.com/maps?q=41.609000,41.600000"
        },
        areaM2: 222,
        photos: [
          { name: "Parkside Villas — закрытый комплекс таунхаусов", src: "/images/parkside-villas/parkside-01.png" },
          { name: "Фасады: вентилируемые панели и панорамные окна", src: "/images/parkside-villas/parkside-02.png" },
          { name: "Архитектура комплекса", src: "/images/parkside-villas/parkside-03.png" },
          { name: "Внутренний двор и парковка", src: "/images/parkside-villas/parkside-04.png" },
          { name: "Закрытая территория, озеленение", src: "/images/parkside-villas/parkside-05.png" },
          { name: "Кухня-гостиная: чёрный каркас", src: "/images/parkside-villas/parkside-06.png" },
          { name: "Лестница и планировка по этажам", src: "/images/parkside-villas/parkside-07.png" },
          { name: "Просторные комнаты с панорамными окнами", src: "/images/parkside-villas/parkside-08.png" },
          { name: "Терраса: вид на горы и зелень", src: "/images/parkside-villas/parkside-09.png" },
          { name: "Проведённые коммуникации (газ)", src: "/images/parkside-villas/parkside-10.png" }
        ]
    },
{
        id: "house-kobuleti-sea",
        detailHref: "/apartment.html",
        priceGel: 985500,
        priceKind: "fixed",
        geo: {
          lat: 41.8215,
          lng: 41.775,
          mapsUrl: "https://www.google.com/maps?q=41.821500,41.775000"
        },
        areaM2: 187,
        photos: [
          { name: "Дом у моря — Кобулети, современная архитектура", src: "/images/kobuleti-sea/kobuleti-01.png" },
          { name: "Первая линия: вид на море с участка", src: "/images/kobuleti-sea/kobuleti-02.png" }
        ]
    }
    ]
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
