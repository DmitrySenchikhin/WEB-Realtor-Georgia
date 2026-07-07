# Описание кода и история изменений — REALTOR GEORGIA

Документ описывает структуру статического лендинга и **журнал итераций**: что менялось и зачем.

**Обязательное правило:** при **каждой** доработке кода, вёрстки или данных по проекту вносите описание изменений **в этот файл** (`CODE_DESCRIPTION.md`): новая запись в [Журнал изменений](#журнал-изменений) (дата, файлы, суть) и при необходимости правка раздела «Ключевые механики» или таблицы «Структура проекта». Без записи в журнал задачу по репозиторию не считать завершённой.

---

## Структура проекта

| Путь | Назначение |
|------|------------|
| `index.html` | Главная: hero, поиск, карусели карточек, CTA с формой заявки |
| `search.html` | Страница поиска: фильтры, сетка карточек, пагинация |
| `apartments.html` | Список квартир (на базе поиска): активен тип «Квартира» |
| `apartment.html` | Карточка одной квартиры из каталога (`data-apt-catalog-id`, **`?id=`**) |
| `new-building.html` | Карточка/страница новостройки (Mapbox в блоке «Расположение» при **`geo.lat`/`lng`**) |
| `new-building-2.html` | Новостройка 2 / макет **Object-2.1** (десктоп 1148px, `.nb-page--obj21`) |
| `new-building-stay-rent.html` | Страница новостройки **Stay&Rent** (`data-nb-catalog-id="nb-stay-rent"`) |
| `map.html` | Карта Mapbox (Батуми) |
| `css/styles.css` | Общие стили, токены `:root`, блоки `.search-*`, `.nb-*`, `.map-page__*` |
| `js/main.js` | Карусели, формы поиска (toast), заявка → WhatsApp, **модуль валют**, новостройка |
| `js/objects-catalog.js` | Каталог объектов: группы `new-building`, `apartments`, `house`; слияние с уже заданным `REALTOR_OBJECT_GROUPS` |
| `js/property-descriptions.js` | Превью описания в карточках (4 строки), модальное окно полного текста, страницы объекта по `data-nb-catalog-id` / `data-apt-catalog-id` и **`initCatalogDetailPage`** |
| `js/map-config.js` | Токен Mapbox (`MAPBOX_ACCESS_TOKEN`) |
| `js/map-page.js` | Инициализация карты |
| `images/` | Изображения и SVG |
| `images/sport-city/` | Презентационные PNG для объекта каталога **SPORT CITY** (`nb-sport-city`) |
| `images/orbi-beach-tower/` | Фото квартир **ORBI BEACH TOWER** в каталоге: **`apt-orbi-beach-tower-2912`** (и ранее общие снимки) |
| `images/orbi-beach-tower-3001/` | Фото квартиры **`apt-orbi-beach-tower-3001`** (30 этаж) |
| `images/stay-rent/` | Презентационные PNG для **Stay&Rent** (`nb-stay-rent`) |
| `images/new-bilding-one/` | Материалы **ЖК ONE** (`new-bilding-one`, карточка вместо бывшего Orbi Sea Towers) |
| `images/realtor-personal-avatar.png` | Фото в блоке «Ваш персональный риелтор» на страницах объекта (`nb-realtor-cta`) |
| `images/ramada-one-development/` | Материалы **RAMADA by One Development** (`nb-ramada-one-development`), страница **`new-building-2.html`** |
| `images/real-palace-blue/` | Презентационные WebP для квартиры **`apt-real-palace-blue-2p1`** (Real Palace Blue) |

---

## Ключевые механики в коде

### Дизайн-токены (`css/styles.css`, `:root`)

- Цвета: `--color-black`, `--color-white`, `--color-orange`, `--color-beige`
- Контейнер: `--container: 1148px`, скругления `--radius-card`, `--radius-photo`
- Шрифты: `--font-heading` (Roboto), `--font-body` (системный)

### Форма заявки (`index.html` + `js/main.js`, `#lead-form`)

- При отправке открывается WhatsApp на **+995598309038** с текстом, начинающимся с:  
  `Заявка на консультацию с сайта RealtorGeorgia.com`  
  далее имя и телефон.

### Валюта (`js/main.js`)

- Единый модуль **`createCurrencyModule()`**: курс **2.7 GEL за 1 USD**, форматирование чисел, конвертация.
- **Поиск** (`search.html`): переключатель `.currency-toggle`, поля с `[data-currency-suffix]`, конвертация при смене валюты; по умолчанию **USD**.
- **Новостройка** (`new-building.html`, `new-building-2.html`): переключатель `.nb-currency-mini__pill`, элементы с `[data-nb-price]` (база в лари) и `data-nb-price-kind` (`from` / `per`); по умолчанию **USD**. Страница **`new-building-2.html`** — макет Object-2.1 (класс `.nb-page--obj21`).

### Страница карты (`map.html` + CSS `.map-page__*`)

- Кнопка «назад» фиксирована у левого края; логотип в шапке с отступом, чтобы не перекрываться.

### Каталог объектов и превью описаний

*Обновление: 2026-05-12.*

Ниже — **пошаговая логика** изменений и как связаны файлы.

#### Шаг 1. Источник данных — `js/objects-catalog.js`

1. Определён объект **`window.REALTOR_OBJECT_GROUPS`**: три ключа массивов — **`"new-building"`**, **`apartments`**, **`house`**.
2. У каждого элемента каталога поля: **`id`**, **`title`**, **`description`** (полный текст), опционально **`detailHref`**, **`priceGel`**, **`priceKind`**, опционально **`priceFromTotalGel`** (вторая величина «от» за лот в лари при связке с **`priceKind: "per"`**), **`geo`** (**`address`**, **`lat`**, **`lng`**, опционально **`mapsUrl`** — внешняя карта, напр. Google Maps), **`rooms`**, **`areaM2`**, **`photos`**; опционально **`floorsText`** и **`completionText`** (3-я и 4-я ячейки **`.nb-stat`** на страницах новостройки и квартиры).
3. **Слияние с уже существующими данными:** если до загрузки скрипта задан `window.REALTOR_OBJECT_GROUPS`, для каждого стандартного ключа сохраняется **ваш массив** (включая пустой `[]`); если ключа нет или значение не массив — подставляется **копия** демо-данных (`JSON.parse(JSON.stringify)`). Ключи, которых нет в шаблоне по умолчанию, **не удаляются**.
4. **Зачем:** можно встроить перед `objects-catalog.js` свой inline-скрипт с частичным каталогом — демо не перезатрёт ваши группы.

#### Шаг 2. Привязка карточек на главной и в поиске — `js/property-descriptions.js` + разметка

1. На **секциях** с карточками задан атрибут **`data-property-card-group`**: значение **`mixed`** (чередование: новостройка → квартира → дом по кругу) или одна группа — **`new-building`** / **`apartments`**.
2. При **`DOMContentLoaded`** вызывается **`initCatalogSections()`**: для каждой такой секции находится контейнер карточек (`.carousel__track` или `.search-results__grid`), считается число **прямых потомков** `.card` / `article.card`.
3. Строится список объектов из каталога:
   - **`mixed`**: функция **`mixedObjectsList(count)`** — по индексу `i` берётся массив `[nb, apt, house][i % 3]`, внутри группы индекс **`((i / 3) | 0) % list.length`** (циклическое повторение при малом числе объектов в группе). Есть **ограничитель итераций**, чтобы не зациклиться, если все три массива пустые.
   - Одна группа: **`listForGroup`**: цикл `i % list.length` по длине карточек на экране.
4. Для каждой пары «карточка + объект» вызывается **`injectCardPrices(card, obj)`** (если есть **`priceGel`**), **`injectCardMeta(card, obj)`** (если есть **`geo` / `rooms` / `areaM2`**), **`injectCardPhotos(card, obj)`** (если непустой **`photos`**), **`injectCatalogCardLinks(card, obj)`** (если **`detailHrefFor(obj)`** непустой — **`href`** у **`a.card__photo-overlay`** и **`a.card__body-link`**), **`injectCardDescription(card, obj)`** (если есть **`description`**):
   - **Цены:** **`injectCardPrices`** заполняет **`.card__price-main`** и **`.card__price-sub`** в **USD** по курсу **2,7 GEL за 1 USD** (как в `main.js`). Варианты: **`priceKind: "per"`** + **`priceFromTotalGel`** — «от» за лот и «от» за м²; только **`per`** — одна строка с м², вторая скрыта; **`from`** / **`fixed`** — см. код. Для **`fixed`** при **`areaM2`** вторая строка — расчёт **$/м²** без приставки «от». Переключатель валюты на **`search.html`** суммы на карточках **не** меняет (только фильтры).
   - **Локация и мета на карточке:** **`injectCardMeta`** — **`geo.address`** в **`.card__loc span`**, при **`geo.mapsUrl`** блок **`.card__loc`** становится ссылкой **`a.card__loc--maplink`** на карту; **`rooms`** и **`areaM2`** в двух **`.card__meta-item`** (как на странице объекта после **`initCatalogDetailPage`**).
   - **Фото:** **`injectCardPhotos`** использует **`photoItemsFromObject`** — в **`.card__photo`** выставляет **`src`** первого элемента **`photos`** (и **`alt`** по **`name`** или **`title`**); для **`.card__photo--stack`** — первое и второе фото (если в каталоге одно снимка — оно же на оба слоя). Если в **`photos`** **два и больше** валидных снимков, блок получает класс **`card__photo--gallery`**: показывается одно активное фото, стрелки влево/вправо, счётчик **«N / M»**, свайп на сенсоре; клики по кнопкам **`.card__photo-gallery__btn`** листают фото и **не** запускают переход на страницу объекта / модалку; клик по самому фото при наличии **`data-desc-href`** ведёт на страницу объекта (как клик по остальной карточке).
   - **Описание:** **`injectCardDescription`** — ищется **тело карточки**: либо прямой **`.card__body`**, либо **`.card__body` внутри `a.card__body-link`** (карусель «новостройки»), чтобы описание попало в ту же сетку, что и локация/мета/цена.
   - В конец **`card__body`** добавляется **`<p class="card__desc card__desc--preview">`** с `textContent = description`, если блока ещё нет.
   - На **`card__body`** вешается класс **`card__body--with-desc`** — в CSS задаётся трёхстрочная сетка: локация и мета в левой колонке, цена справа на двух строках, описание на **третьей строке на всю ширину**.
   - На **`article.card`** пишутся **`data-desc-title`**, **`data-desc-text`**, при наличии — **`data-desc-href`** (из `detailHrefFor(obj)` — для **`new-building*.html`** и **`apartment.html`** в URL добавляется **`?id=`** каталога, чтобы на целевой странице подставился тот же объект, что в превью).

#### Шаг 3. Превью «4 строки» и модальное окно — CSS + JS

1. В **`css/styles.css`** для **`.card__desc--preview`** заданы **`display: -webkit-box`**, **`-webkit-line-clamp: 4`**, **`overflow: hidden`** — визуально не больше четырёх строк при типичном `line-height`.
2. Для страниц новостройки класс **`.nb-desc__text--clamp`** — те же 4 строки для блока «Описание».
3. **`ensureModal()`** один раз создаёт в **`document.body`** разметку модалки: подложка, диалог с заголовком, текстом и ссылкой **«Перейти к объекту»** (скрыта, если нет `href`).
4. **`openModal` / `closeModal`**: на `body` класс **`property-desc-modal-open`** (`overflow: hidden`), фокус на кнопку закрытия; по **Escape** и клику на подложку — закрытие.
5. **Клики по карточкам каталога** — делегирование на **`document`**, фаза **`capture: true`**. Если у карточки задан **`data-desc-href`**: клик по **`a.card__body-link`**, **`a.card__photo-overlay`** или **`a.card__loc--maplink`** не перехватывается — обычный переход браузера; клик по кнопкам **`.card__photo-gallery__btn`** (стрелки галереи) не запускает переход на страницу объекта; клик по остальной области карточки, **включая фото превью** в **`.card__photo--gallery`**, — **`window.location.assign`** на URL из **`data-desc-href`**. Если **`data-desc-href`** нет, но есть текст в модалке — перехват ссылок **`a.card__body-link`** / **`a.card__photo-overlay`** и открытие модалки с полным описанием (редкий случай без URL в каталоге).

#### Шаг 4. Страницы объекта (новостройка / квартира) — `data-nb-catalog-id` или `data-apt-catalog-id`

1. На **`main`** задан **`data-nb-catalog-id`** (шаблоны новостроек) или **`data-apt-catalog-id`** (`apartment.html`) — значение по умолчанию, если в URL нет **`?id=`**). В адресе допускается **`?id=…`** — тогда **`initCatalogDetailPage()`** загружает объект с этим **`id`** из каталога (как при клике с карточки). Примеры новостроек: **`new-bilding-one`** для `new-building.html`, **`nb-ramada-one-development`** для `new-building-2.html`, **`nb-stay-rent`** для `new-building-stay-rent.html`. Квартиры: **`apt-orbi-beach-tower-2912`**, **`apt-orbi-beach-tower-3001`** и др. для **`apartment.html`**.
2. **`initCatalogDetailPage()`** ищет объект через **`findObjectById`** (приоритет **`?id=`**, иначе атрибут **`main`**). Герой заполняется **`initCatalogDetailHero`** из **`photoItemsFromObject(obj)`** (те же снимки, что в превью карточки).
3. Блок цен **`.nb-price__main`** и **`.nb-price__per`** (включая **`.nb-obj21__price-*`**): выставляются атрибуты **`data-nb-price`** и **`data-nb-price-kind`** из каталога **до** запуска **`initNewBuildingCurrencyToggle`** в **`main.js`**, чтобы переключатель USD/GEL перерисовал цифры. Для **`per`** без **`priceFromTotalGel`** вторая строка скрывается. Для **`fixed`** при **`areaM2`** в **`data-nb-price`** второй строки передаётся расчёт цены за м² в лари.
4. Строка адреса с **`.nb-meta__pin`**: текст после иконки — **`geo.address`**. Строка с **`.nb-meta__icon--build`** — название объекта (**`title`**). Блок **`.nb-location__address`** — **`geo.address`**. Секция **`.nb-location__map`**: при валидных **`geo.lat` / `geo.lng`** и подключённых **`map-config.js`** + Mapbox GL инициализируется карта (**`initCatalogLocationMap`**) с маркером в точке объекта; при **`geo.mapsUrl`** под картой добавляется ссылка «Открыть в Google Картах». Если токена нет или координат нет — превью-картинка и при необходимости обёртка **`mapsUrl`**, как раньше. Герой **`.nb-hero` / `.nb-obj21__hero`**: при **≥ 2** фото — листание всех снимков каталога (стрелки, счётчик **«n / m»**, свайп; на Object-2.1 — штатные кнопки навигации и полоски-индикаторы); при одном фото — только первый кадр. Ячейки **`.nb-stat__text`**: 1 — **`areaM2`** (м²), 2 — **`rooms`**, при непустых строках в каталоге — 3 — **`floorsText`**, 4 — **`completionText`** (на **`new-building-2.html`** только три блока — четвёртая подстановка не выполняется). Заголовок вкладки **`document.title`** — **`title`**.
5. Текст **`.nb-desc__text`** заменяется на **`description` из каталога**, добавляется класс превью **`nb-desc__text--clamp`**; клик по тексту и кнопка **«Развернуть»** (`.nb-desc__more`) открывают модалку.
6. На **`new-building-2.html`** при наличии элемента **`.nb-obj21__toolbar-title`** подставляется **`title`** объекта из каталога.

#### Шаг 5. Какие HTML-файлы помечены

- **`index.html`**: четыре секции с каруселями — **`data-property-card-group`**: `mixed` (новые объекты и лучшие предложения), `new-building` (блок новостроек), `apartments` (квартиры); подключены **`objects-catalog.js`** и **`property-descriptions.js`** перед **`main.js`**.
- **`search.html`**: секция результатов — **`data-property-card-group="mixed"`**, те же скрипты.
- **`new-building.html`**, **`new-building-2.html`**, **`new-building-stay-rent.html`**: **`main`** с **`data-nb-catalog-id`**, скрипты как выше.
- **`apartment.html`**: **`main`** с **`data-apt-catalog-id`**, те же скрипты.

---

## Журнал изменений

Формат записи: **`ГГГГ-ММ-ДД` — краткий заголовок** → файлы, суть.

### 2026-07-07 — Веб: без вспышки заглушки фото на странице объекта

- **Файлы:** `js/detail-hero-inline.js`, `js/property-descriptions.js`, `apartment.html`, `new-building.html`, `new-building-stay-rent.html`, `new-building-2.html`, `CODE_DESCRIPTION.md`
- **Суть:** при переходе с карточки сначала мелькала заглушка (`property-1.png` / `nb-hero.png`), затем фото из каталога. Убраны жёсткие `src` в герое; при клике по карточке первое фото сохраняется в **`sessionStorage`** и сразу подставляется синхронным **`detail-hero-inline.js`** (до основного JS).

### 2026-07-05 — Веб: описание видно на мобильном (порядок секций)

- **Файлы:** `apartment.html`, `new-building.html`, `new-building-stay-rent.html`, `new-building-2.html`, `CODE_DESCRIPTION.md`
- **Суть:** блок **«Описание»** перенесён **выше** блока **«Расположение»** (карта ~370 px). На телефоне описание оказывалось под картой за пределами экрана — казалось, что текста нет.

### 2026-07-05 — Веб: описание на детальной странице после тапа по карточке

- **Файлы:** `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** при переходе с карточки на страницу объекта описание могло не появляться: на карточке текст уже был (из `data-desc-text`), а на `apartment.html` / `new-building*.html` страница ждала повторной загрузки JSON. Теперь текст сохраняется в **`sessionStorage`** при клике по ссылке карточки и сразу подставляется в блок **`.nb-desc__text`**; если JSON ещё не загружен — догружается точечно; повторная инициализация по **`realtor:descriptionsready`**.

### 2026-07-05 — Описание на детальном экране (iOS / catalog.json)

- **Файлы:** `scripts/build-catalog.mjs`, `js/property-descriptions.js`, `public/catalog.json`, `CODE_DESCRIPTION.md`
- **Суть:** в **`catalog.json`** тексты описаний денормализуются в каждый объект **`groups`** (поля **`title`**, **`description`**, **`rooms`** и др. + **`localized`** по языкам). Раньше они были только в **`descriptions[id]`** — превью в iOS их подхватывало, а детальный экран, читающий объект из **`groups`**, оставался без текста. На вебе добавлен повторный вызов **`initCatalogDetailPage`** по событию **`realtor:descriptionsready`**.

### 2026-07-05 — CI: актуализирован public/catalog.json

- **Файлы:** `public/catalog.json`, `CODE_DESCRIPTION.md`
- **Суть:** пересобран каталог (`npm run build:catalog`), **`version`** → **2026-07-05** — исправление проверки в GitHub Actions.

### 2026-07-03 — Real Palace Blue: добавлены фото комплекса

- **Файлы:** `js/objects-catalog.js`, `images/real-palace-blue/rpb-01.webp` … `rpb-04.webp`, `public/catalog.json`, `CODE_DESCRIPTION.md`
- **Суть:** для **`apt-real-palace-blue-2p1`** в **`photos`** добавлены **4** презентационных снимка комплекса (пока нет фото самой квартиры).

### 2026-07-03 — Real Palace Blue: объект без фото

- **Файлы:** `js/objects-catalog.js`, `public/catalog.json`, `CODE_DESCRIPTION.md`
- **Суть:** для **`apt-real-palace-blue-2p1`** массив **`photos`** очищен — объект сохранён в каталоге без снимков (заглушка на карточке — **`property-1.png`**); фото можно добавить позже.

### 2026-07-03 — Real Palace Blue: фото квартиры

- **Файлы:** `js/objects-catalog.js`, `images/real-palace-blue/rpb-01.jpg` … `rpb-05.jpg`, `public/catalog.json`, `CODE_DESCRIPTION.md`
- **Суть:** для **`apt-real-palace-blue-2p1`** заменены презентационные снимки комплекса на **5** фото квартиры: вид с балкона, панорама, интерьер в состоянии «белый каркас», гостиная с панорамными окнами.

### 2026-07-03 — Real Palace Blue: уточнение координат

- **Файлы:** `js/objects-catalog.js`, `public/catalog.json`, `CODE_DESCRIPTION.md`
- **Суть:** для **`apt-real-palace-blue-2p1`** обновлены **`geo`**: **41.625497**, **41.602739** (и ссылка Google Maps).

### 2026-07-03 — Каталог: квартира Real Palace Blue (2+1, 81,7 м²)

- **Файлы:** `js/objects-catalog.js`, `js/description-ids.js`, `description ru/apt-real-palace-blue-2p1.json`, `description en/apt-real-palace-blue-2p1.json`, `description geo/apt-real-palace-blue-2p1.json`, `images/real-palace-blue/rpb-01.webp` … `rpb-04.webp`, `public/catalog.json`, `CODE_DESCRIPTION.md`
- **Суть:** в группе **`apartments`** добавлен объект **`apt-real-palace-blue-2p1`** (Real Palace Blue, 2+1, 81,7 м², жилая 61,7 м², **$140 000** / **378 000** лари, **`priceKind: fixed`**); в описании зафиксированы условия рассрочки: ПВ **$70 000**, до августа 2026 без платежей, остаток **$70 000** до **15.02.2027**; координаты ул. Ангиса, 95; **4** фото комплекса в **`images/real-palace-blue/`**.

### 2026-05-14 — Блок «персональный риелтор» на всех страницах объекта

- **Файлы:** `new-building.html`, `new-building-stay-rent.html`, `apartment.html`, `new-building-2.html`, `CODE_DESCRIPTION.md`
- **Суть:** в **`nb-shell`** после блока «Описание» добавлена карточка **`nb-realtor-cta`** (те же классы **`nb-obj21__cta-*`**, фото **`images/realtor-personal-avatar.png`**, WhatsApp и звонок), что и в сайдбаре **`new-building-2.html`**.

### 2026-05-14 — Новостройки: RAMADA вместо Porta Batumi

- **Файлы:** `js/objects-catalog.js`, `images/ramada-one-development/ramada-01.png` … `ramada-11.png`, `new-building-2.html`, `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** объект **`nb-porta-batumi`** заменён на **`nb-ramada-one-development`** («RAMADA by One Development», Ramada Residences by Wyndham Batumi); на **`new-building-2.html`** задан **`data-nb-catalog-id="nb-ramada-one-development"`**; из **`rawDetailHrefFor`** убрана избыточная ветка для старого id (у объекта задан **`detailHref`**).

### 2026-05-14 — Новостройки: ЖК ONE вместо Orbi Sea Towers

- **Файлы:** `js/objects-catalog.js`, `images/new-bilding-one/one-01.png` … `one-05.png`, `new-building.html`, `CODE_DESCRIPTION.md`
- **Суть:** в группе **`new-building`** объект **`nb-orbi-sea`** заменён на **`new-bilding-one`** («Жилой комплекс ONE»): описание по материалам ONE Development, **`photos`** из папки **`images/new-bilding-one/`**; на **`new-building.html`** задан **`data-nb-catalog-id="new-bilding-one"`**.

### 2026-05-14 — apt-orbi-beach-tower-3001: отдельная папка фото

- **Файлы:** `images/orbi-beach-tower-3001/orbi-3001-01.png` … `orbi-3001-11.png`, `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** для **`apt-orbi-beach-tower-3001`** в **`photos`** указаны **11** новых снимков квартиры; **`apt-orbi-beach-tower-2912`** по-прежнему использует **`images/orbi-beach-tower/`**.

### 2026-05-14 — Каталог квартир: ORBI 30 этаж вместо лота в Гонио

- **Файлы:** `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** объект **`apt-gonio-2p1`** заменён на **`apt-orbi-beach-tower-3001`** (ORBI BEACH TOWER, 30 этаж, 1+1, 50 м², $130 000, те же фото **`images/orbi-beach-tower/`**); **`apt-orbi-beach-tower-2912`** без изменений.

### 2026-05-12 — Превью и страница новостройки: одни данные из каталога

- **Файлы:** `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** ссылки на **`new-building.html`**, **`new-building-2.html`**, **`new-building-stay-rent.html`** дополняются **`?id=`** (`detailHrefFor`); **`initCatalogDetailPage`** читает **`?id=`** и подставляет цены, адрес, заголовок в шапке меты, герой из первого **`photos`**, первые две характеристики (**площадь / комнаты**), описание и **`document.title`**. На карточках добавлен **`injectCardMeta`** (**адрес**, **комнаты**, **м²** как в каталоге).

### 2026-05-13 — Квартира: страница карточки как у новостройки

- **Файлы:** `apartment.html`, `js/property-descriptions.js`, `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** добавлена **`apartment.html`** с **`data-apt-catalog-id`** и той же вёрсткой блоков, что у новостройки; **`initCatalogDetailPage`** обслуживает и новостройки, и квартиру; в каталоге у квартир **`detailHref: apartment.html`**, в ссылках превью — **`?id=`**; клик по превью в блоке «Квартиры» ведёт на карточку с фото, ценами, метой, характеристиками, картой и описанием.

### 2026-05-13 — SPORT CITY: координаты и ссылка на Google Maps

- **Файлы:** `js/objects-catalog.js`, `js/property-descriptions.js`, `css/styles.css`, `CODE_DESCRIPTION.md`
- **Суть:** для **`nb-sport-city`** в **`geo`** заданы **`lat`/`lng`** с пина по ссылке Google Maps и **`mapsUrl`**; **`injectCardMeta`** и **`initCatalogDetailPage`** ведут на эту карту с карточки и со страницы блока «Расположение»; клик по ссылке локации не перехватывается переходом на страницу объекта.

### 2026-05-12 — Страница новостройки: 3–4 ячейки `.nb-stat` из каталога

- **Файлы:** `js/objects-catalog.js`, `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** в каталоге для новостроек заданы **`floorsText`** и **`completionText`**; **`initCatalogDetailPage`** подставляет их в 3-ю и 4-ю **`.nb-stat__text`** (если блоки есть в разметке).

### 2026-05-12 — Карточка каталога: переход на страницу объекта по клику

- **Файлы:** `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** при наличии **`data-desc-href`** клик по карточке (кроме зоны галереи фото) сразу открывает страницу объекта (**`location.assign`** или обычный переход по ссылке); модалка с текстом — только если URL для карточки не задан.

### 2026-05-12 — Stay&Rent: акцент в описании «жизнь и аренда»

- **Файлы:** `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** у **`nb-stay-rent`** текст **`description`** переписан: позиционирование как **комплекс на Новом бульваре в Батуми для жизни и аренды**, с кратким блоком про локацию, инфраструктуру, сроки, отделку, акцию и ориентиры по цене.

### 2026-05-12 — Каталог: новостройка Stay&Rent, страница и ссылки карточек

- **Файлы:** `images/stay-rent/stay-rent-01.png` … `stay-rent-05.png`, `js/objects-catalog.js`, `js/property-descriptions.js`, `new-building-stay-rent.html`, `CODE_DESCRIPTION.md`
- **Суть:** в **`new-building`** добавлен объект **`nb-stay-rent`** (Stay&Rent, ONE Development, Новый бульвар, цены «от» за лот и за м², **5** фото); создана **`new-building-stay-rent.html`** с **`data-nb-catalog-id="nb-stay-rent"`**; **`injectCatalogCardLinks`** подставляет **`href`** ссылок карточки из каталога (в т.ч. для **`nb-stay-rent`** → **`new-building-stay-rent.html`**); в **`detailHrefFor`** для **`nb-stay-rent`** задан резервный URL страницы объекта.

### 2026-05-12 — Удалён неиспользуемый `heart-outline.svg`

- **Файлы:** `images/heart-outline.svg` (удалён), `CODE_DESCRIPTION.md`
- **Суть:** иконка сердца больше не используется в вёрстке; файл убран из репозитория.

### 2026-05-12 — Новостройки: убрано избранное (сердце / «В избранное»)

- **Файлы:** `new-building.html`, `new-building-2.html`, `css/styles.css`, `CODE_DESCRIPTION.md`
- **Суть:** на **`new-building.html`** удалена кнопка **`nb-icon-btn`** с **`heart-outline.svg`**; на **`new-building-2.html`** удалена кнопка **`nb-obj21__fav-label`**; из **`css/styles.css`** убраны стили **`.nb-icon-btn`**, **`.nb-icon-btn__img`**, **`.nb-obj21__fav-label`**.

### 2026-05-13 — Страница объекта: галерея всех фото в герое

- **Файлы:** `js/property-descriptions.js`, `css/styles.css`, `new-building-2.html`, `CODE_DESCRIPTION.md`
- **Суть:** **`photoItemsFromObject`** общий для карточек и **`initCatalogDetailHero`**; при **≥ 2** фото на странице объекта — стрелки, счётчик, свайп (как в превью карточки); для **`.nb-obj21__hero`** — существующие кнопки и перестроенные полоски-индикаторы + счётчик.

### 2026-05-13 — ORBI BEACH TOWER 2912: координаты geo

- **Файлы:** `js/objects-catalog.js`
- **Суть:** для **`apt-orbi-beach-tower-2912`** в **`geo`**: широта **`lat: 41.630308`**, долгота **`lng: 41.602256`** (точка на карте Mapbox в блоке «Расположение»).

### 2026-05-13 — Карточка объекта: Mapbox в «Расположение»

- **Файлы:** `js/property-descriptions.js`, `css/styles.css`, `new-building.html`, `new-building-2.html`, `new-building-stay-rent.html`, `apartment.html`, `CODE_DESCRIPTION.md`
- **Суть:** по **`geo.lat` / `geo.lng`** из каталога в **`.nb-location__map`** инициализируется Mapbox (маркер объекта, навигация); на страницах объекта подключены **`map-config.js`**, стили и скрипт **mapbox-gl**; при **`geo.mapsUrl`** под картой — ссылка «Открыть в Google Картах»; без токена или координат остаётся превью и прежняя логика **`mapsUrl`**.

### 2026-05-13 — Клик по фото галереи: переход на карточку объекта (ORBI и др.)

- **Файлы:** `js/property-descriptions.js`, `CODE_DESCRIPTION.md`, `apartment.html`
- **Суть:** раньше любой клик внутри **`.card__photo--gallery`** блокировал **`window.location.assign`** для карточек с **`data-desc-href`** — у квартиры с многими фото (ORBI) не открывалась **`apartment.html`**. Теперь игнорируются только клики по **`.card__photo-gallery__btn`**; исправлена разметка **`<span>`** в **`apartment.html`** (герой).

### 2026-05-12 — Карточки: убрано «В избранное» (сердце)

- **Файлы:** `index.html`, `search.html`, `apartments.html`, `css/styles.css`, `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** из разметки **`.card__photo`** удалены кнопки **`card__fav`**; убраны связанные стили; в **`property-descriptions.js`** выбор главного фото и монтирование галереи без опоры на избранное (**`firstDirectPropertyImg`**), **`appendChild`** для контролов галереи.

### 2026-05-12 — Карточка: листание фото каталога без открытия описания

- **Файлы:** `js/property-descriptions.js`, `css/styles.css`, `CODE_DESCRIPTION.md`
- **Суть:** при **≥ 2** фото у объекта карточка получает мини-галерею (стрелки, счётчик, свайп); клики по кнопкам **`.card__photo-gallery__btn`** не открывают модалку и не ведут на страницу объекта; клик по фото при наличии **`data-desc-href`** ведёт на страницу объекта; у **`card--linkable`** с галереей у **`card__photo-overlay`** отключены **`pointer-events`**, чтобы свайп и клики доходили до фото.

### 2026-05-12 — Каталог: id квартиры ORBI BEACH TOWER

- **Файлы:** `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** **`id`** объекта ORBI BEACH TOWER изменён с **`apt-orbi-beach-tower`** на **`apt-orbi-beach-tower-2912`**; в документации обновлены актуальные ссылки на **`id`**.

### 2026-05-12 — ORBI BEACH TOWER: фото в каталоге

- **Файлы:** `images/orbi-beach-tower/orbi-beach-01.png` … `orbi-beach-19.png` (копии из материалов проекта), `js/objects-catalog.js`, `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** у объекта **`apt-orbi-beach-tower-2912`** в **`photos`** указаны **19** локальных снимков с подписями по содержанию кадра; в таблице структуры проекта добавлена папка **`images/orbi-beach-tower/`**. В **`initCatalogSections`** вызывается **`injectCardPhotos`**: в **`.card__photo`** подставляется первое фото каталога (для **`.card__photo--stack`** — первое и второе, при одном снимке дублируется на оба слоя).

### 2026-05-12 — Каталог: квартира ORBI BEACH TOWER (1+1, 50 м²)

- **Файлы:** `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** в **`apartments`** добавлен объект **`apt-orbi-beach-tower`** (позже **`id`** → **`apt-orbi-beach-tower-2912`**): ORBI BEACH TOWER, ул. Шерифа Химшиашвили 57, 29 этаж, 1+1, 50 м², описание по технике и локации; **`priceGel`** **351 000** (эквивалент **$130 000** при курсе **2,7**), **`priceKind`** **`fixed`**.

### 2026-05-12 — Каталог: новая квартира в группе `apartments`

- **Файлы:** `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** в **`REALTOR_OBJECT_GROUPS.apartments`** добавлен объект **`apt-airport-3p1`** («Квартира 3+1 у аэропорта», Батуми, район аэропорта, цена и площадь в каталоге, **`detailHref`:** `apartments.html`).

### 2026-05-12 — Цены из каталога на карточках и страницах новостроек

- **Файлы:** `js/property-descriptions.js`, `CODE_DESCRIPTION.md`
- **Суть:** **`injectCardPrices`** подставляет в **`.card__price-*`** значения из **`priceGel`**, **`priceKind`**, **`priceFromTotalGel`**, **`areaM2`** (USD, курс 2.7). На **`new-building.html` / `new-building-2.html`** до **`main.js`** выставляются **`data-nb-price`** у блока цен и адрес из **`geo`**. Переключатель валюты поиска на карточки каталога не влияет.

### 2026-05-12 — SPORT CITY: цены от $45 000 и от $1 450/м² в каталоге

- **Файлы:** `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** для **`nb-sport-city`**: **`priceGel`** = **3915** (от **$1 450/м²** в лари по курсу **2.7**, как в `main.js`), **`priceKind`** **`"per"`**; добавлено **`priceFromTotalGel`** **121 500** (от **$45 000** за лот). В **`description`** зафиксированы те же ориентиры в долларах. В документации описано опциональное поле **`priceFromTotalGel`**.

### 2026-05-12 — SPORT CITY: фото презентации в каталоге

- **Файлы:** `images/sport-city/sport-city-01.png` … `sport-city-12.png` (копии из материалов проекта), `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** у объекта **`nb-sport-city`** в **`photos`** указаны **12** локальных файлов в **`images/sport-city/`**; подписи вида «Презентация SPORT CITY — N» (порядок по имени исходного файла `IMG_*.png`). Адрес в **`geo`** приведён к **«Батуми, Новый бульвар»** по маркетинговым материалам.

### 2026-05-12 — Каталог: новостройка SPORT CITY первой в группе

- **Файлы:** `js/objects-catalog.js`, `CODE_DESCRIPTION.md`
- **Суть:** в **`REALTOR_OBJECT_GROUPS["new-building"]`** добавлен объект **`SPORT CITY`** (`id: nb-sport-city`) и поставлен **первым** в массиве; для карточек с группой `new-building` и смешанного списка `mixed` он теперь чаще попадает в первую позицию цикла после Orbi/Porta согласно порядку в каталоге.

### 2026-05-12 — Обязательное ведение журнала в CODE_DESCRIPTION.md

- **Файл:** `CODE_DESCRIPTION.md`
- **Суть:** в начале файла и в разделе «Как дополнять журнал» закреплено правило: **при каждой** доработке проекта описание изменений вносится **в этот файл**; новые записи журнала — **вверху**; при новых скриптах/страницах обновлять таблицу структуры и при необходимости «Ключевые механики».

### 2026-05-12 — Каталог объектов, превью описания (4 строки) и модалка

- **Файлы:** `js/objects-catalog.js`, `js/property-descriptions.js`, `css/styles.css`, `index.html`, `search.html`, `new-building.html`, `new-building-2.html`; где уже подключался только каталог (`apartments.html` и др.) — при необходимости добавьте `property-descriptions.js` по образцу главной. Обновлён **`CODE_DESCRIPTION.md`**.
- **Суть:** единый каталог **`REALTOR_OBJECT_GROUPS`** с полями в том числе **`description`** и **`detailHref`**; на карточках превью в 4 строки, полный текст по клику в модалке; страницы новостроек привязаны к объекту по **`data-nb-catalog-id`**. Подробная пошаговая логика — в разделе [Каталог объектов и превью описаний](#каталог-объектов-и-превью-описаний).

### 2026-04-19 — Страница `new-building-2.html` (Object-2.1), без `houses.html`

- **Файлы:** `new-building-2.html` (создана из прежней вёрстки Object-2.1), удалён **`houses.html`**, обновлены `search.html` (ссылка «Дом» → `new-building-2.html`), `css/styles.css` (комментарий), `CODE_DESCRIPTION.md`.
- **Суть:** макет **Object-2.1** снова доступен по имени файла **`new-building-2.html`**; заголовок вкладки — «Новостройка 2 — …».

### 2026-04-19 — Поиск: активен тип «Дом», стиль нажатия

- **Файлы:** `search.html`, `css/styles.css`
- **Суть:** на `search.html` класс **`is-active`** перенесён на ссылку «Дом» (оранжевая как остальные активные); для **`.filter-type-btn`** добавлены **`:active`** и уточнены **`.is-active:hover` / `.is-active:active`**, чтобы при нажатии была заметная смена яркости.

### 2026-04-19 — Вёрстка Object-2.1 (Figma) — история

- **Файлы:** `new-building-2.html`, `css/styles.css`, `js/main.js`
- **Суть:** макет **Object-2.1**: фон `#FEF6EE`, верхняя панель и нижний футер **1148px** с логотипом, соцкнопками и оранжевой кнопкой «Связаться»; строка «назад + заголовок + поделиться»; сетка **564 + 20 + 564** (герой с полосками-каруселью и стрелками 60px; колонка карточек); переключатель валют **76×46**; **3** ячейки характеристик; блок контактов и CTA в карточке; секция «Похожие» с табами **145×61** и сеткой **2×564**; пагинация-кружки; стили с префиксом `.nb-page--obj21`. В `main.js` — `initObj21Tabs()`. Ранее файл назывался `houses.html` — заменён на `new-building-2.html`.

### 2026-04-19 — Документ «описание кода» и журнал

- **Файл:** `CODE_DESCRIPTION.md` (новый)
- **Суть:** зафиксирована структура проекта, основные механики и журнал; дальнейшие правки заносить сюда.

### 2026-04-19 — Карта: кнопка «назад» левее, без перекрытия логотипа

- **Файлы:** `css/styles.css`
- **Суть:** у `.map-page__back` уменьшен горизонтальный отступ от края (`max(8px, env(safe-area-inset-left))`); у `.map-page__header .search-top__logo` задан `margin-left: 48px`, чтобы логотип не заходил под круг стрелки.

### 2026-04-19 — Поиск: страница квартир и ссылка «Квартира»

- **Файлы:** `search.html`, `apartments.html` (новый, копия поиска с правками)
- **Суть:** на поиске «Квартира» ведёт на `apartments.html`; на странице квартир активен тип «Квартира», форма и пагинация завязаны на `apartments.html`, счётчик «квартир».

### 2026-04-19 — Поиск: порядок типов и активная «Новостройки»

- **Файл:** `search.html`
- **Суть:** порядок слева направо: Новостройки → Квартира → Дом; изначально активной была новостройка (позже по макету активным сделан «Дом» — см. запись «активен тип Дом»).

### 2026-04-19 — Поиск: цена «от» по умолчанию 40 000 USD

- **Файл:** `search.html`
- **Суть:** значение поля «От» в блоке ценового диапазона — `40 000` при валюте по умолчанию в долларах.

### 2026-04-19 — Заявка: текст для WhatsApp

- **Файл:** `js/main.js`
- **Суть:** в начале сообщения зафиксирована строка про консультацию и сайт **RealtorGeorgia.com**.

### 2026-04-19 — Заявка: отправка в WhatsApp

- **Файл:** `js/main.js`
- **Суть:** после валидации имени и телефона открывается `wa.me/995598309038` с предзаполненным текстом, форма сбрасывается.

### 2026-04-19 — Новостройка: убрана иконка «Поделиться»

- **Файл:** `new-building.html`
- **Суть:** в шапке осталась только кнопка избранного (сердце).

### 2026-04-19 — Рефакторинг: единый модуль валюты

- **Файл:** `js/main.js`
- **Суть:** общая логика курса, форматирования и конвертации вынесена в `createCurrencyModule()`; используется и поиск, и новостройка.

### 2026-04-19 — Новостройка: переключатель валют и конвертация

- **Файлы:** `new-building.html`, `css/styles.css`, `js/main.js`
- **Суть:** слайдер USD/GEL, отображение цен из `data-nb-price` (база в лари), курс 2.7; подключён `main.js`.

### 2026-04-19 — Поиск: переключатель валют, конвертация полей

- **Файлы:** `search.html`, `css/styles.css`, `js/main.js`
- **Суть:** слайдер в блоке ценового диапазона, по умолчанию USD, при переключении пересчитываются заполненные поля «От/До» по курсу 2.7.

### Ранее по проекту (кратко, без дат в репозитории)

- Страница **поиска** (`search.html`), формы с `action` на поиск/карту.
- Страница **карты** Mapbox (`map.html`, `map-config.js`, `map-page.js`), кнопка возврата на главную.
- Страница **новостройки** по макету, стили `.nb-*`, ширина под контейнер сайта (`--container`, отступы как у `.container`).
- Карточки на главной: ссылка на новостройку, одна иконка сердца.
- **Сердце** в карточках: контур SVG, без второй «залитой» иконки.

---

## Как дополнять журнал

**Каждый раз** после работы с репозиторием обновляйте **`CODE_DESCRIPTION.md`** — это часть задачи, а не отдельное пожелание.

1. Добавьте блок в [Журнал изменений](#журнал-изменений) **вверху списка** (самая свежая дата первой) — так проще читать историю.
2. В записи укажите: **дату** (`ГГГГ-ММ-ДД`), **файлы** (пути от корня проекта), **суть** (1–5 предложений: что сделано, зачем, важное поведение). Если менялась нетривиальная логика — кратко опишите шаги или дайте ссылку на подраздел в «Ключевые механики».
3. При появлении нового скрипта, страницы или потока данных — обновите таблицу **«Структура проекта»** и при необходимости раздел **«Ключевые механики»** (как для каталога и модалки описаний).
4. Сохраняйте единый стиль формулировок внутри файла (как в существующих записях журнала).
