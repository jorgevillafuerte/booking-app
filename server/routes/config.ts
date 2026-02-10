import { Hono } from 'hono'

const config = new Hono()

const restaurantConfigs: Record<string, unknown> = {
  pausa: {
    name: 'Pausa del Porvenir',
    logoUrl: '/logo.svg',
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
  },
}

config.get('/:restaurantId', (c) => {
  const { restaurantId } = c.req.param()
  const restaurant = restaurantConfigs[restaurantId]

  if (!restaurant) {
    return c.json({ error: 'Restaurant not found' }, 404)
  }

  return c.json(restaurant)
})

export { config }
