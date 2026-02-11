import { useState } from 'react'
import { useBookingState, useBookingDispatch } from '../BookingContext.tsx'
import { useI18n } from '../../i18n/I18nContext.tsx'
import { defaultConfig } from '../../config/restaurant.ts'
import { createReservation } from '../../api/reservations.ts'
import { CheckCircleIcon, ArrowRightIcon } from '../../components/Icons.tsx'
import './ConfirmationStep.css'

interface ConfirmationStepProps {
  onGoHome?: () => void
}

export function ConfirmationStep({ onGoHome }: ConfirmationStepProps) {
  const state = useBookingState()
  const dispatch = useBookingDispatch()
  const { t } = useI18n()

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const guestLabel = t.common.personLabel(state.guestCount!)
  const dateObj = new Date(state.selectedDate! + 'T00:00:00')
  const dateDisplay = `${t.days.short[dateObj.getDay()]} ${dateObj.getDate()}, ${t.months.short[dateObj.getMonth()]}`
  const serviceName = defaultConfig.services.find((s) => s.id === state.selectedService)?.name ?? state.selectedService!
  const timeDisplay = state.selectedTimeSlot!

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await createReservation({
        restaurantId: 'pausa',
        guestCount: state.guestCount!,
        date: state.selectedDate!,
        serviceId: state.selectedService!,
        timeSlot: state.selectedTimeSlot!,
      })
      setIsConfirmed(true)
    } catch {
      setSubmitError(navigator.onLine ? t.errors.submitFailed : t.errors.networkError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="confirmation-step">
      {isConfirmed && (
        <div className="confirmation-step__success-icon">
          <CheckCircleIcon size={56} />
        </div>
      )}

      <h2 className="confirmation-step__title">
        {isConfirmed ? t.confirmation.confirmed : t.confirmation.title}
      </h2>

      <dl className="confirmation-step__summary">
        <dt className="confirmation-step__label">{t.confirmation.guests}</dt>
        <dd className="confirmation-step__value">{guestLabel}</dd>

        <dt className="confirmation-step__label">{t.confirmation.date}</dt>
        <dd className="confirmation-step__value">{dateDisplay}</dd>

        <dt className="confirmation-step__label">{t.confirmation.service}</dt>
        <dd className="confirmation-step__value">{serviceName}</dd>

        <dt className="confirmation-step__label">{t.confirmation.time}</dt>
        <dd className="confirmation-step__value">{timeDisplay}</dd>
      </dl>

      {submitError && (
        <div className="confirmation-step__error" role="alert">
          <p>{submitError}</p>
        </div>
      )}

      {isConfirmed ? (
        <button
          className="confirmation-step__new-btn"
          onClick={() => {
            dispatch({ type: 'RESET' })
            if (onGoHome) onGoHome()
          }}
        >
          {t.confirmation.backToHome}
        </button>
      ) : (
        <button
          className="confirmation-step__cta"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {t.confirmation.confirmButton}
          <ArrowRightIcon size={18} />
        </button>
      )}
    </div>
  )
}
