import type { Translations } from './types.ts'

export const en: Translations = {
  welcome: {
    greeting: 'Welcome',
    subtitle: 'Book your dining experience',
    makeReservation: 'Make a reservation',
    viewMenu: 'View menu',
  },
  guestCount: {
    title: 'Choose number of',
    titleBold: 'guests',
  },
  dateSelection: {
    title: 'Select',
    titleBold: 'date',
    moreDates: 'More dates',
    closed: 'Closed',
  },
  servicePreference: {
    title: 'Service',
    titleBold: 'preference',
  },
  timeSlot: {
    title: 'Available reservations',
    availableReservations: 'Available reservations',
    previousDay: 'Previous day',
    nextDay: 'Next day',
    waitlist: 'Waitlist',
    noSlots: 'No time slots available for this day',
  },
  confirmation: {
    title: 'Confirmation',
    guests: 'Guests',
    date: 'Date',
    service: 'Service',
    time: 'Time',
    confirmed: 'Reservation confirmed',
    confirmButton: 'Confirm reservation',
    newReservation: 'New reservation',
    backToHome: 'Back to home',
  },
  home: {
    title: 'My Reservations',
    newReservation: 'New Reservation',
    emptyTitle: 'No reservations yet',
    emptySubtitle: 'Start by making your first reservation',
    guests: 'Guests',
    loadingError: 'Error loading reservations',
  },
  errors: {
    submitFailed: 'Could not complete the reservation',
    networkError: 'Connection error. Check your internet.',
    retry: 'Retry',
  },
  common: {
    back: 'Back',
    next: 'Next',
    personLabel: (n: number) => n === 1 ? '1 GUEST' : `${n} GUESTS`,
    poweredBy: 'powered by',
    privacyPolicy: 'Privacy policy',
  },
  days: {
    short: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  },
  months: {
    short: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  },
}
