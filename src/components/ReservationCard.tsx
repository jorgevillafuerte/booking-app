import type { ReservationResponse } from '../api/reservations.ts'
import { useI18n } from '../i18n/I18nContext.tsx'
import { defaultConfig } from '../config/restaurant.ts'
import './ReservationCard.css'

interface ReservationCardProps {
  reservation: ReservationResponse
}

export function ReservationCard({ reservation }: ReservationCardProps) {
  const { t } = useI18n()

  // Parse date and format with localized day/month
  const date = new Date(reservation.date + 'T00:00:00')
  const dayOfWeek = t.days.short[date.getDay()]
  const dayOfMonth = date.getDate()
  const month = t.months.short[date.getMonth()]
  const formattedDate = `${dayOfWeek} ${dayOfMonth}, ${month}`

  // Resolve service name from config
  const service = defaultConfig.services.find((s) => s.id === reservation.serviceId)
  const serviceName = service?.name || reservation.serviceId

  return (
    <div className="reservation-card">
      <div className="reservation-card__date">{formattedDate}</div>
      <div className="reservation-card__details">
        <div className="reservation-card__row">
          <span className="reservation-card__label">{t.home.guests}</span>
          <span className="reservation-card__value">{reservation.guestCount}</span>
        </div>
        <div className="reservation-card__row">
          <span className="reservation-card__label">{serviceName}</span>
          <span className="reservation-card__value">{reservation.timeSlot}</span>
        </div>
      </div>
    </div>
  )
}
