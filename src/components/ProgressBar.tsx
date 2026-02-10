import { useBookingState } from '../booking/BookingContext.tsx'
import { Step, TOTAL_STEPS } from '../booking/types.ts'
import './ProgressBar.css'

export function ProgressBar() {
  const state = useBookingState()

  if (state.currentStep === Step.Welcome) return null

  const progress = (state.currentStep / (TOTAL_STEPS - 1)) * 100

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="progress-bar__fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
