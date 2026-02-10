import { Step } from './types.ts'
import type { BookingState, BookingAction } from './types.ts'

export const initialBookingState: BookingState = {
  currentStep: Step.Welcome,
  direction: 'forward',
  guestCount: null,
  selectedDate: null,
  selectedService: null,
  selectedTimeSlot: null,
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'START_BOOKING':
      return { ...state, currentStep: Step.GuestCount, direction: 'forward' }

    case 'SET_GUEST_COUNT':
      return {
        ...state,
        guestCount: action.payload,
        selectedDate: null,
        selectedService: null,
        selectedTimeSlot: null,
        currentStep: Step.DateSelection,
        direction: 'forward',
      }

    case 'SET_DATE':
      return {
        ...state,
        selectedDate: action.payload,
        selectedService: null,
        selectedTimeSlot: null,
        currentStep: Step.ServicePreference,
        direction: 'forward',
      }

    case 'SET_SERVICE':
      return {
        ...state,
        selectedService: action.payload,
        selectedTimeSlot: null,
        currentStep: Step.TimeSlot,
        direction: 'forward',
      }

    case 'SET_TIME_SLOT':
      return {
        ...state,
        selectedTimeSlot: action.payload,
        currentStep: Step.Confirmation,
        direction: 'forward',
      }

    case 'GO_BACK': {
      const prevStep = Math.max(0, state.currentStep - 1) as Step
      const cleared: Partial<BookingState> = {}
      if (prevStep < Step.GuestCount) {
        cleared.guestCount = null
        cleared.selectedDate = null
        cleared.selectedService = null
        cleared.selectedTimeSlot = null
      } else if (prevStep < Step.DateSelection) {
        cleared.selectedDate = null
        cleared.selectedService = null
        cleared.selectedTimeSlot = null
      } else if (prevStep < Step.ServicePreference) {
        cleared.selectedService = null
        cleared.selectedTimeSlot = null
      } else if (prevStep < Step.TimeSlot) {
        cleared.selectedTimeSlot = null
      }
      return { ...state, ...cleared, currentStep: prevStep, direction: 'back' }
    }

    case 'RESET':
      return initialBookingState

    default: {
      const _exhaustive: never = action
      return _exhaustive
    }
  }
}
