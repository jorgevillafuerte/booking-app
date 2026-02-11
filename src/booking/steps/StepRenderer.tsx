import { useBookingState } from '../BookingContext.tsx'
import { Step } from '../types.ts'
import { WelcomeStep } from './WelcomeStep.tsx'
import { GuestCountStep } from './GuestCountStep.tsx'
import { DateSelectionStep } from './DateSelectionStep.tsx'
import { ServicePreferenceStep } from './ServicePreferenceStep.tsx'
import { TimeSlotStep } from './TimeSlotStep.tsx'
import { ConfirmationStep } from './ConfirmationStep.tsx'

interface StepRendererProps {
  onGoHome?: () => void
}

export function StepRenderer({ onGoHome }: StepRendererProps) {
  const { currentStep } = useBookingState()

  switch (currentStep) {
    case Step.Welcome:
      return <WelcomeStep />
    case Step.GuestCount:
      return <GuestCountStep />
    case Step.DateSelection:
      return <DateSelectionStep />
    case Step.ServicePreference:
      return <ServicePreferenceStep />
    case Step.TimeSlot:
      return <TimeSlotStep />
    case Step.Confirmation:
      return <ConfirmationStep onGoHome={onGoHome} />
    default: {
      const _exhaustive: never = currentStep
      return _exhaustive
    }
  }
}
