import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Translations } from './types.ts'
import { Language } from './types.ts'
import { es } from './es.ts'
import { en } from './en.ts'

const translations: Record<Language, Translations> = {
  [Language.ES]: es,
  [Language.EN]: en,
}

interface I18nContextValue {
  t: Translations
  locale: Language
  setLocale: (locale: Language) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Language>(Language.ES)

  const setLocale = useCallback((l: Language) => setLocaleState(l), [])
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === Language.ES ? Language.EN : Language.ES)),
    [],
  )

  const value: I18nContextValue = {
    t: translations[locale],
    locale,
    setLocale,
    toggleLocale,
  }

  return <I18nContext value={value}>{children}</I18nContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
