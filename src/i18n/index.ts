import type { Dictionary } from './types'
import { ru } from './ru'

// Словари локалей — новые языки добавляются сюда.
const dictionaries = { ru } satisfies Record<string, Dictionary>

export type Locale = keyof typeof dictionaries
export const defaultLocale: Locale = 'ru'

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale]
}

// Пока локаль одна. При добавлении переключателя языка хук расширяется,
// компоненты менять не придётся.
export function useTranslation(locale: Locale = defaultLocale): Dictionary {
  return getDictionary(locale)
}
