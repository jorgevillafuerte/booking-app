export const Step = {
  Welcome: 0,
  GuestCount: 1,
  DateSelection: 2,
  ServicePreference: 3,
  TimeSlot: 4,
  Confirmation: 5,
} as const

export type Step = (typeof Step)[keyof typeof Step]

export const TOTAL_STEPS = 6

export type Direction = 'forward' | 'back'

export interface BookingState {
  currentStep: Step
  direction: Direction
  guestCount: number | null
  selectedDate: string | null
  selectedService: string | null
  selectedTimeSlot: string | null
}

export type BookingAction =
  | { type: 'START_BOOKING' }
  | { type: 'SET_GUEST_COUNT'; payload: number }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_SERVICE'; payload: string }
  | { type: 'SET_TIME_SLOT'; payload: string }
  | { type: 'GO_BACK' }
  | { type: 'RESET' }
