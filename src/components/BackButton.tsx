import { useBookingState, useBookingDispatch } from '../booking/BookingContext.tsx'
import { Step } from '../booking/types.ts'
import { useI18n } from '../i18n/I18nContext.tsx'
import { ArrowBackIcon } from './Icons.tsx'
import './BackButton.css'

export function BackButton() {
  const state = useBookingState()
  const dispatch = useBookingDispatch()
  const { t } = useI18n()

  if (state.currentStep === Step.Welcome) return null

  return (
    <button
      className="back-button"
      onClick={() => dispatch({ type: 'GO_BACK' })}
      aria-label={t.common.back}
    >
      <ArrowBackIcon size={20} />
    </button>
  )
}
