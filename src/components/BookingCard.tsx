import type { ReactNode } from 'react'
import './BookingCard.css'

export function BookingCard({ children }: { children: ReactNode }) {
  return <div className="booking-card">{children}</div>
}
