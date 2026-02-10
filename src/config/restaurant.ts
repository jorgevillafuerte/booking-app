export interface ServiceOption {
  id: string
  name: string
}

export interface TimeSlotOption {
  time: string
  available: boolean
}

export interface GuestLimits {
  min: number
  max: number
  quickSelectMax: number
}

export interface ThemeConfig {
  colorPrimary: string
  colorSurface: string
  colorSurfaceAlpha: string
  colorText: string
  colorTextSecondary: string
  colorBackground: string
  colorButton: string
  colorButtonText: string
  colorButtonOutline: string
  colorDisabled: string
  colorProgressBg: string
  colorProgressFill: string
  colorSelectedBg: string
  colorSelectedText: string
  colorHoverBg: string
  colorPillBg: string
  colorPillText: string
  fontFamily: string
  borderRadiusCard: string
  borderRadiusPill: string
}

export interface RestaurantConfig {
  name: string
  logoUrl: string
  menuUrl?: string
  services: ServiceOption[]
  timeSlots: TimeSlotOption[]
  guestLimits: GuestLimits
  closedDays: number[]
  theme: ThemeConfig
}

export const defaultConfig: RestaurantConfig = {
  name: 'Pausa del Porvenir',
  logoUrl: '/logo.svg',
  menuUrl: undefined,
  services: [
    { id: 'experiencia', name: 'Experiencia Pausa El Porvenir' },
    { id: 'degustaciones', name: 'Degustaciones' },
  ],
  timeSlots: [
    { time: '11:00', available: true },
    { time: '13:00', available: false },
    { time: '14:00', available: false },
  ],
  guestLimits: {
    min: 1,
    max: 20,
    quickSelectMax: 4,
  },
  closedDays: [0],
  theme: {
    colorPrimary: '#c4a08a',
    colorSurface: 'rgba(196, 160, 138, 0.85)',
    colorSurfaceAlpha: 'rgba(196, 160, 138, 0.65)',
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255, 255, 255, 0.7)',
    colorBackground: '#3a2a20',
    colorButton: '#ffffff',
    colorButtonText: '#8b7068',
    colorButtonOutline: 'rgba(255, 255, 255, 0.5)',
    colorDisabled: 'rgba(255, 255, 255, 0.3)',
    colorProgressBg: 'rgba(255, 255, 255, 0.2)',
    colorProgressFill: '#ffffff',
    colorSelectedBg: '#ffffff',
    colorSelectedText: '#8b7068',
    colorHoverBg: 'rgba(255, 255, 255, 0.15)',
    colorPillBg: 'rgba(255, 255, 255, 0.2)',
    colorPillText: '#ffffff',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    borderRadiusCard: '24px',
    borderRadiusPill: '999px',
  },
}
