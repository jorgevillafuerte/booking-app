export const Language = {
  ES: 'es',
  EN: 'en',
} as const

export type Language = (typeof Language)[keyof typeof Language]

export interface Translations {
  welcome: {
    greeting: string
    subtitle: string
    makeReservation: string
    viewMenu: string
  }
  guestCount: {
    title: string
    titleBold: string
  }
  dateSelection: {
    title: string
    titleBold: string
    moreDates: string
    closed: string
  }
  servicePreference: {
    title: string
    titleBold: string
  }
  timeSlot: {
    title: string
    availableReservations: string
    previousDay: string
    nextDay: string
    waitlist: string
    noSlots: string
  }
  confirmation: {
    title: string
    guests: string
    date: string
    service: string
    time: string
    confirmed: string
    confirmButton: string
    newReservation: string
    backToHome: string
  }
  home: {
    title: string
    newReservation: string
    emptyTitle: string
    emptySubtitle: string
    guests: string
    loadingError: string
  }
  errors: {
    submitFailed: string
    networkError: string
    retry: string
  }
  common: {
    back: string
    next: string
    personLabel: (n: number) => string
    poweredBy: string
    privacyPolicy: string
  }
  days: {
    short: string[]
  }
  months: {
    short: string[]
  }
}
