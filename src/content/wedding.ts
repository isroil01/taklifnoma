/**
 * Everything a couple changes lives in this file: names, date, venue,
 * photos, music, program and all visible texts (RU + UZ).
 */

export type Lang = "ru" | "uz";
export type Localized = Record<Lang, string>;

export const wedding = {
  couple: { groom: "Nodirbek", bride: "Jasmina" },

  /** ISO date with the local UTC offset (Tashkent is +05:00). */
  date: "2026-09-21T17:00:00+05:00",

  defaultLang: "ru" as Lang,

  /** Cover photo in /public/photos. Use JPG or PNG: the Telegram preview image reuses it. */
  photos: { cover: "/photos/cover.jpg" },

  /** Background song. Put the file at public/music/wedding.mp3 (or change the path); the music button appears once it exists. */
  music: {
    src: "/music/wedding.mp3",
    volume: 0.6,
    /** The recording's licence (CC BY-SA 3.0) requires this credit; it is shown in the footer. */
    credit: {
      title: "Pachelbel’s Canon",
      source: "https://commons.wikimedia.org/wiki/File:Pachelbel's_Canon.ogg",
      author: "Lee Galloway",
      authorUrl: "http://www.LeeGalloway.com/",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    } as { title: string; source: string; author: string; authorUrl: string; license: string; licenseUrl: string } | null,
  },

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
};

const ru = {
  introEyebrow: "Приглашение на свадьбу",
  introTap: "Нажмите на печать, чтобы открыть",
  openInvitation: "Открыть приглашение",
  personalEyebrow: "Персональное приглашение",

  coverEyebrow: "Приглашение на свадьбу",

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

  ogTitle: "приглашение на свадьбу",
  ogPersonalTitle: "{guest}, приглашаем вас на нашу свадьбу",

  linksTitle: "Персональные ссылки",
  linksText: "Впишите имя гостя — в приглашении по этой ссылке он увидит своё имя.",
  guestLabel: "Имя гостя",
  guestPlaceholder: "Например, Азиз ака с семьёй",
  linkLang: "Язык приглашения",
  linkEmpty: "Ссылка появится здесь",
  copy: "Скопировать",
  copied: "Скопировано",
  sendTelegram: "Отправить в Telegram",
  openLink: "Открыть",
  shareText: "Приглашаем вас на нашу свадьбу!",
};

export type Dict = typeof ru;

const uz: Dict = {
  introEyebrow: "Nikoh to‘yiga taklifnoma",
  introTap: "Ochish uchun muhrni bosing",
  openInvitation: "Taklifnomani ochish",
  personalEyebrow: "Hurmatli",

  coverEyebrow: "Nikoh to‘yiga taklifnoma",

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

  ogTitle: "nikoh to‘yiga taklifnoma",
  ogPersonalTitle: "Hurmatli {guest}, sizni to‘yimizga taklif qilamiz",

  linksTitle: "Shaxsiy havolalar",
  linksText: "Mehmon ismini yozing — shu havola orqali ochilgan taklifnomada uning ismi ko‘rinadi.",
  guestLabel: "Mehmon ismi",
  guestPlaceholder: "Masalan, Aziz aka oilasi bilan",
  linkLang: "Taklifnoma tili",
  linkEmpty: "Havola shu yerda paydo bo‘ladi",
  copy: "Nusxalash",
  copied: "Nusxalandi",
  sendTelegram: "Telegram orqali yuborish",
  openLink: "Ochish",
  shareText: "Sizni to‘yimizga taklif qilamiz!",
};

export const ui: Record<Lang, Dict> = { ru, uz };

const RU_MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

/** "21 сентября 2026, 17:00" / "2026-yil 21-sentabr, soat 17:00" */
export function longDate(lang: Lang) {
  const [year, month, day] = wedding.date.slice(0, 10).split("-").map(Number);
  const time = wedding.date.slice(11, 16);
  return lang === "ru"
    ? `${day} ${RU_MONTHS_GENITIVE[month - 1]} ${year}, ${time}`
    : `${year}-yil ${day}-${ui.uz.months[month - 1].toLowerCase()}, soat ${time}`;
}
