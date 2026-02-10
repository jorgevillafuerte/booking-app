import { useI18n } from '../i18n/I18nContext.tsx'
import { useBookingState } from '../booking/BookingContext.tsx'
import { Step } from '../booking/types.ts'
import { defaultConfig } from '../config/restaurant.ts'
import { PillBadge } from './PillBadge.tsx'
import { UserIcon } from './Icons.tsx'
import './Header.css'

export function Header() {
  const { t, locale, toggleLocale } = useI18n()
  const state = useBookingState()

  const pills: string[] = []
  if (state.guestCount !== null) {
    pills.push(t.common.personLabel(state.guestCount))
  }
  if (state.selectedDate) {
    const d = new Date(state.selectedDate + 'T00:00:00')
    const day = t.days.short[d.getDay()]
    const num = d.getDate()
    const month = t.months.short[d.getMonth()]
    pills.push(`${day} ${num}, ${month}`)
  }
  if (state.selectedService) {
    const service = defaultConfig.services.find((s) => s.id === state.selectedService)
    if (service) {
      pills.push(service.name.toUpperCase())
    }
  }

  const showPills = state.currentStep > Step.Welcome

  return (
    <header className="header">
      <button
        className="header__lang-btn"
        onClick={toggleLocale}
        aria-label="Toggle language"
      >
        {locale === 'es' ? 'ES' : 'EN'}
      </button>

      <div className="header__center">
        <span className="header__logo">{defaultConfig.name}</span>
        {showPills && pills.length > 0 && (
          <div className="header__pills">
            {pills.map((pill) => (
              <PillBadge key={pill} text={pill} />
            ))}
          </div>
        )}
      </div>

      <div className="header__right">
        <UserIcon size={24} />
      </div>
    </header>
  )
}
