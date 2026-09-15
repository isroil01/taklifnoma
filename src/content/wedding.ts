/**
 * Everything a couple changes lives in this file: names, date, venue,
 * photos, program, dress-code palette and all visible texts (RU + UZ).
 */

export type Lang = "ru" | "uz";
export type Localized = Record<Lang, string>;

export const wedding = {
  couple: { groom: "Nodirbek", bride: "Jasmina" },

  /** ISO date with the local UTC offset (Tashkent is +05:00). */
  date: "2026-09-21T17:00:00+05:00",

  defaultLang: "ru" as Lang,

  /** Replace these with real photos in /public/photos (jpg/webp work too). */
  photos: {
    cover: "/photos/cover.svg",
    booth: [
      "/photos/booth-1.svg",
      "/photos/booth-2.svg",
      "/photos/booth-3.svg",
      "/photos/booth-4.svg",
    ],
  },
  /** Photos shown when a guest taps the photo booth. */
  gallery: [
    "/photos/booth-1.svg",
    "/photos/booth-2.svg",
    "/photos/booth-3.svg",
    "/photos/booth-4.svg",
    "/photos/cover.svg",
  ],

  /** Background song. Put the file at public/music/wedding.mp3 (or change the path); the music button appears once it exists. */
  music: { src: "/music/wedding.mp3", volume: 0.6 },

  venue: {
    name: { ru: "Тойхона «Fayz»", uz: "Fayz to’yhonasi" },
    /** Leave empty to hide the address line. */
    address: { ru: "", uz: "" },
    yandexMaps: "https://yandex.uz/maps/?text=Fayz%20to%27yxonasi",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Fayz%20to%27yxonasi",
  },

  program: [
    {
      time: "16:30",
      title: { ru: "Сбор гостей", uz: "Mehmonlarni kutib olish" },
      note: { ru: "Welcome-зона и фотосессия", uz: "Welcome-zona va fotosessiya" },
    },
    {
      time: "17:00",
      title: { ru: "Торжественная церемония", uz: "Tantanali marosim" },
    },
    {
      time: "18:00",
      title: { ru: "Праздничный банкет", uz: "Bayram ziyofati" },
      note: { ru: "Первый танец молодожёнов", uz: "Yoshlarning birinchi raqsi" },
    },
    {
      time: "19:00",
      title: { ru: "Свадебный торт", uz: "To‘y torti" },
    },
    {
      time: "20:00",
      title: { ru: "Завершение вечера", uz: "Kechaning yakuni" },
    },
  ] as { time: string; title: Localized; note?: Localized }[],

  palette: [
    { color: "#560b19", name: { ru: "Бордо", uz: "Bordo" } },
    { color: "#9c3a4a", name: { ru: "Гранат", uz: "Anor" } },
    { color: "#d9c3a5", name: { ru: "Шампань", uz: "Shampan" } },
    { color: "#f4ede1", name: { ru: "Айвори", uz: "Fil suyagi" } },
    { color: "#2b2323", name: { ru: "Графит", uz: "Grafit" } },
  ] as { color: string; name: Localized }[],
};

const ru = {
  coverEyebrow: "Приглашение на свадьбу",
  boothTitle: "Вы приглашены\nна свадьбу!",
  boothHint: "Нажмите на фото будку",
  galleryLabel: "Открыть галерею фотографий",

  greetingEyebrow: "С любовью",
  greetingTitle: "Дорогие гости",
  greetingText:
    "С огромной радостью приглашаем вас разделить с нами самый важный и счастливый день нашей жизни — день нашей свадьбы.",
  greetingText2: "Ваше присутствие сделает этот праздник по-настоящему особенным.",

  dateTitle: "Дата торжества",
  startsAt: "Начало в",
  countdownTitle: "До торжества осталось",
  units: ["дней", "часов", "минут", "секунд"],
  arrived: "Этот день настал!",
  months: [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ],
  weekdays: [
    "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье",
  ],
  weekdaysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],

  programTitle: "Программа дня",

  venueTitle: "Место проведения",
  openYandex: "Яндекс Карты",
  openGoogle: "Google Maps",

  dressTitle: "Дресс код",
  dressText:
    "Будем признательны, если вы поддержите атмосферу нашего вечера. Мы будем счастливы видеть вас в нарядных образах в оттенках нашей палитры.",

  rsvpTitle: "Подтвердите присутствие",
  rsvpText: "Пожалуйста, дайте нам знать до 18 сентября, сможете ли вы прийти.",
  nameLabel: "Ваше имя и фамилия",
  namePlaceholder: "Например, Азиз Каримов",
  attendLabel: "Вы придёте?",
  yes: "С удовольствием приду",
  no: "К сожалению, не смогу",
  guestsLabel: "Количество гостей",
  decrease: "Меньше",
  increase: "Больше",
  messageLabel: "Пожелание молодожёнам",
  messagePlaceholder: "Необязательно",
  submit: "Отправить ответ",
  sending: "Отправляем…",
  thanksTitle: "Спасибо!",
  thanksYes: "Мы очень ждём вас на нашем празднике.",
  thanksNo: "Нам жаль, что вы не сможете прийти. Спасибо за ответ!",
  error: "Не удалось отправить. Попробуйте ещё раз.",

  closingTitle: "С нетерпением ждём вас!",

  musicOn: "Включить музыку",
  musicOff: "Выключить музыку",

  close: "Закрыть",
  prev: "Предыдущее фото",
  next: "Следующее фото",
};

export type Dict = typeof ru;

const uz: Dict = {
  coverEyebrow: "Nikoh to‘yiga taklifnoma",
  boothTitle: "Siz to‘yimizga\ntaklif etilgansiz!",
  boothHint: "Fotobudkani bosing",
  galleryLabel: "Fotogalereyani ochish",

  greetingEyebrow: "Mehr bilan",
  greetingTitle: "Aziz mehmonlar",
  greetingText:
    "Hayotimizdagi eng muhim va baxtli kun — nikoh to‘yimizni biz bilan birga nishonlashga sizni katta mamnuniyat bilan taklif etamiz.",
  greetingText2: "Sizning ishtirokingiz bu bayramni haqiqatan ham unutilmas qiladi.",

  dateTitle: "To‘y sanasi",
  startsAt: "Soat",
  countdownTitle: "To‘ygacha qoldi",
  units: ["kun", "soat", "daqiqa", "soniya"],
  arrived: "Orziqib kutilgan kun keldi!",
  months: [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
  ],
  weekdays: [
    "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba",
  ],
  weekdaysShort: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],

  programTitle: "To‘y dasturi",

  venueTitle: "To‘y manzili",
  openYandex: "Yandex Xaritalar",
  openGoogle: "Google Maps",

  dressTitle: "Dress-kod",
  dressText:
    "Kechamiz ruhini qo‘llab-quvvatlasangiz, biz uchun katta quvonch bo‘ladi. Sizni ranglar palitramizga mos bayramona liboslarda ko‘rishni istaymiz.",

  rsvpTitle: "Ishtirokingizni tasdiqlang",
  rsvpText: "Iltimos, 18-sentabrgacha kela olishingizni bizga ma’lum qiling.",
  nameLabel: "Ism va familiyangiz",
  namePlaceholder: "Masalan, Aziz Karimov",
  attendLabel: "Kelasizmi?",
  yes: "Albatta boraman",
  no: "Afsuski, bora olmayman",
  guestsLabel: "Mehmonlar soni",
  decrease: "Kamaytirish",
  increase: "Ko‘paytirish",
  messageLabel: "Yoshlarga tilaklaringiz",
  messagePlaceholder: "Ixtiyoriy",
  submit: "Javobni yuborish",
  sending: "Yuborilmoqda…",
  thanksTitle: "Rahmat!",
  thanksYes: "Sizni to‘yimizda intizorlik bilan kutamiz.",
  thanksNo: "Kela olmasligingizdan afsusdamiz. Javobingiz uchun rahmat!",
  error: "Yuborib bo‘lmadi. Qaytadan urinib ko‘ring.",

  closingTitle: "Sizni intizorlik bilan kutamiz!",

  musicOn: "Musiqani yoqish",
  musicOff: "Musiqani o‘chirish",

  close: "Yopish",
  prev: "Oldingi rasm",
  next: "Keyingi rasm",
};

export const ui: Record<Lang, Dict> = { ru, uz };
