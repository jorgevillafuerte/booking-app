import type { Translations } from './types.ts'

export const es: Translations = {
  welcome: {
    greeting: 'Bienvenido',
    subtitle: 'Reserva tu experiencia gastronómica',
    makeReservation: 'Hacer una reserva',
    viewMenu: 'Ver carta',
  },
  guestCount: {
    title: 'Escoja cantidad de',
    titleBold: 'comensales',
  },
  dateSelection: {
    title: 'Seleccionar',
    titleBold: 'fecha',
    moreDates: 'Más fechas',
    closed: 'Cerrado',
  },
  servicePreference: {
    title: 'Preferencia del',
    titleBold: 'servicio',
  },
  timeSlot: {
    title: 'Reservas disponibles',
    availableReservations: 'Reservas disponibles',
    previousDay: 'Día anterior',
    nextDay: 'Día siguiente',
    waitlist: 'Lista de espera',
    noSlots: 'No hay horarios disponibles para este día',
  },
  confirmation: {
    title: 'Confirmación',
    guests: 'Comensales',
    date: 'Fecha',
    service: 'Servicio',
    time: 'Hora',
    confirmed: 'Reserva confirmada',
    confirmButton: 'Confirmar reserva',
    newReservation: 'Nueva reserva',
    backToHome: 'Volver al inicio',
  },
  home: {
    title: 'Mis Reservas',
    newReservation: 'Nueva Reserva',
    emptyTitle: 'No tienes reservas',
    emptySubtitle: 'Comienza haciendo tu primera reserva',
    guests: 'Comensales',
    loadingError: 'Error al cargar las reservas',
  },
  errors: {
    submitFailed: 'No se pudo completar la reserva',
    networkError: 'Error de conexión. Verifica tu internet.',
    retry: 'Reintentar',
  },
  common: {
    back: 'Atrás',
    next: 'Siguiente',
    personLabel: (n: number) => n === 1 ? '1 PERSONA' : `${n} PERSONAS`,
    poweredBy: 'powered by',
    privacyPolicy: 'Política de privacidad',
  },
  days: {
    short: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  },
  months: {
    short: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  },
}
