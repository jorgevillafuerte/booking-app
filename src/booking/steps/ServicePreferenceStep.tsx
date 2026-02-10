import { useBookingDispatch } from '../BookingContext.tsx'
import { useI18n } from '../../i18n/I18nContext.tsx'
import { defaultConfig } from '../../config/restaurant.ts'
import './ServicePreferenceStep.css'

export function ServicePreferenceStep() {
  const dispatch = useBookingDispatch()
  const { t } = useI18n()

  return (
    <div className="service-preference-step">
      <h2 className="service-preference-step__title">
        {t.servicePreference.title} <strong>{t.servicePreference.titleBold}</strong>
      </h2>

      <div className="service-preference-step__options">
        {defaultConfig.services.map((service) => (
          <button
            key={service.id}
            className="service-preference-step__option"
            onClick={() => dispatch({ type: 'SET_SERVICE', payload: service.id })}
          >
            {service.name}
          </button>
        ))}
      </div>
    </div>
  )
}
