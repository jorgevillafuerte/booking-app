import { useI18n } from '../i18n/I18nContext.tsx'
import { defaultConfig } from '../config/restaurant.ts'
import { UserIcon } from './Icons.tsx'
import './HomeHeader.css'

export function HomeHeader() {
  const { locale, toggleLocale } = useI18n()

  return (
    <header className="home-header">
      <button
        className="home-header__lang-btn"
        onClick={toggleLocale}
        aria-label="Toggle language"
      >
        {locale === 'es' ? 'ES' : 'EN'}
      </button>

      <div className="home-header__center">
        <span className="home-header__logo">{defaultConfig.name}</span>
      </div>

      <div className="home-header__right">
        <UserIcon size={24} />
      </div>
    </header>
  )
}
