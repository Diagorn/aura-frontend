/** Часовые пояса для формы регистрации: крупный город по-русски. */

/** Русские названия городов для актуальных поясов; неизвестные зоны — фолбэк по IANA-имени */
const CITY_LABELS: Record<string, string> = {
  // Россия (UTC+2 … UTC+12)
  'Europe/Kaliningrad': 'Калининград',
  'Europe/Moscow': 'Москва',
  'Europe/Simferopol': 'Симферополь',
  'Europe/Kirov': 'Киров',
  'Europe/Volgograd': 'Волгоград',
  'Europe/Astrakhan': 'Астрахань',
  'Europe/Saratov': 'Саратов',
  'Europe/Ulyanovsk': 'Ульяновск',
  'Europe/Samara': 'Самара',
  'Europe/Kazan': 'Казань',
  'Europe/Penza': 'Пенза',
  'Asia/Yekaterinburg': 'Екатеринбург',
  'Asia/Tyumen': 'Тюмень',
  'Asia/Omsk': 'Омск',
  'Asia/Novosibirsk': 'Новосибирск',
  'Asia/Barnaul': 'Барнаул',
  'Asia/Tomsk': 'Томск',
  'Asia/Novokuznetsk': 'Новокузнецк',
  'Asia/Krasnoyarsk': 'Красноярск',
  'Asia/Irkutsk': 'Иркутск',
  'Asia/Chita': 'Чита',
  'Asia/Yakutsk': 'Якутск',
  'Asia/Vladivostok': 'Владивосток',
  'Asia/Magadan': 'Магадан',
  'Asia/Sakhalin': 'Южно-Сахалинск',
  'Asia/Kamchatka': 'Петропавловск-Камчатский',

  // СНГ и близкое зарубежье
  'Europe/Kyiv': 'Киев',
  'Europe/Minsk': 'Минск',
  'Europe/Riga': 'Рига',
  'Europe/Vilnius': 'Вильнюс',
  'Europe/Tallinn': 'Таллин',
  'Europe/Chisinau': 'Кишинёв',
  'Europe/Tbilisi': 'Тбилиси',
  'Europe/Yerevan': 'Ереван',
  'Europe/Baku': 'Баку',
  'Asia/Almaty': 'Алматы',
  'Asia/Astana': 'Астана',
  'Asia/Tashkent': 'Ташкент',
  'Asia/Bishkek': 'Бишкек',
  'Asia/Dushanbe': 'Душанбе',
  'Asia/Ashgabat': 'Ашхабад',

  // Европа
  'Europe/Helsinki': 'Хельсинки',
  'Europe/Stockholm': 'Стокгольм',
  'Europe/Warsaw': 'Варшава',
  'Europe/Berlin': 'Берлин',
  'Europe/Amsterdam': 'Амстердам',
  'Europe/Prague': 'Прага',
  'Europe/Vienna': 'Вена',
  'Europe/Budapest': 'Будапешт',
  'Europe/Bucharest': 'Бухарест',
  'Europe/Sofia': 'София',
  'Europe/Athens': 'Афины',
  'Europe/Zurich': 'Цюрих',
  'Europe/Rome': 'Рим',
  'Europe/Madrid': 'Мадрид',
  'Europe/Paris': 'Париж',
  'Europe/London': 'Лондон',
  'Europe/Dublin': 'Дублин',
  'Europe/Belgrade': 'Белград',
  'Europe/Istanbul': 'Стамбул',

  // Азия, Африка, Америка, Океания
  'Asia/Jerusalem': 'Иерусалим',
  'Asia/Dubai': 'Дубай',
  'Asia/Tehran': 'Тегеран',
  'Asia/Karachi': 'Карачи',
  'Asia/Kolkata': 'Калькутта',
  'Asia/Bangkok': 'Бангкок',
  'Asia/Shanghai': 'Шанхай',
  'Asia/Hong_Kong': 'Гонконг',
  'Asia/Taipei': 'Тайбэй',
  'Asia/Singapore': 'Сингапур',
  'Asia/Manila': 'Манила',
  'Asia/Tokyo': 'Токио',
  'Asia/Seoul': 'Сеул',
  'Africa/Cairo': 'Каир',
  'America/New_York': 'Нью-Йорк',
  'America/Toronto': 'Торонто',
  'America/Chicago': 'Чикаго',
  'America/Mexico_City': 'Мехико',
  'America/Denver': 'Денвер',
  'America/Phoenix': 'Финикс',
  'America/Los_Angeles': 'Лос-Анджелес',
  'America/Vancouver': 'Ванкувер',
  'America/Sao_Paulo': 'Сан-Паулу',
  'America/Argentina/Buenos_Aires': 'Буэнос-Айрес',
  'Pacific/Honolulu': 'Гонолулу',
  'Australia/Sydney': 'Сидней',
}

/** Часовой пояс браузера; при сбоях — дефолт бэкенда (Europe/Moscow) */
export const DETECTED_TIMEZONE: string = detectTimezone()

export interface TimezoneOption {
  /** IANA-имя — именно оно уходит в бэкенд */
  value: string
  /** Человекочитаемая подпись: крупный город, например «Москва» */
  label: string
}

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Moscow'
  } catch {
    return 'Europe/Moscow'
  }
}

function cityOf(zone: string): string {
  return CITY_LABELS[zone] ?? (zone.split('/').pop() ?? zone).replace(/_/g, ' ')
}

/**
 * Смещение зоны от UTC в минутах (с учётом летнего времени на текущую дату):
 * переводим «местное время зоны» в UTC и сравниваем с реальным моментом.
 */
function utcOffsetMinutes(zone: string, date = new Date()): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).formatToParts(date)
    const value = (type: string) => Number(parts.find((part) => part.type === type)?.value)
    const asUtc = Date.UTC(value('year'), value('month') - 1, value('day'), value('hour'), value('minute'))
    return Math.round((asUtc - date.getTime()) / 60_000)
  } catch {
    return 0
  }
}

function labelOf(zone: string): string {
  return cityOf(zone)
}

/**
 * Опции для селекта: пояс браузера — первым, далее по возрастанию смещения,
 * внутри смещения — по алфавиту. Полный IANA-список не показываем: только
 * крупные города; у пояса без крупного города в списке подпись будет по IANA-имени.
 */
export function timezoneOptions(): TimezoneOption[] {
  const zones = new Set<string>([...Object.keys(CITY_LABELS), DETECTED_TIMEZONE])
  const entries = [...zones].map((zone) => {
    const offset = utcOffsetMinutes(zone)
    return { value: zone, offset, label: labelOf(zone) }
  })

  const detected = entries.find((entry) => entry.value === DETECTED_TIMEZONE)
  const rest = entries
    .filter((entry) => entry.value !== DETECTED_TIMEZONE)
    .sort((a, b) => a.offset - b.offset || a.label.localeCompare(b.label, 'ru'))

  return detected ? [detected, ...rest] : rest
}
