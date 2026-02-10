import { useBookingDispatch } from '../BookingContext.tsx'
import { useI18n } from '../../i18n/I18nContext.tsx'
import { defaultConfig } from '../../config/restaurant.ts'
import { ArrowRightIcon } from '../../components/Icons.tsx'
import './WelcomeStep.css'

export function WelcomeStep() {
  const dispatch = useBookingDispatch()
  const { t } = useI18n()

  return (
    <div className="welcome-step">
      <h1 className="welcome-step__greeting">{t.welcome.greeting}</h1>
      <p className="welcome-step__subtitle">{t.welcome.subtitle}</p>

      <button
        className="welcome-step__cta"
        onClick={() => dispatch({ type: 'START_BOOKING' })}
      >
        {t.welcome.makeReservation}
        <ArrowRightIcon size={20} />
      </button>

      {defaultConfig.menuUrl && (
        <a
          className="welcome-step__menu-btn"
          href={defaultConfig.menuUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.welcome.viewMenu}
        </a>
      )}
    </div>
  )
}
