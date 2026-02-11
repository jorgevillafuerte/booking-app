import { useState, useEffect } from 'react'
import type { ReservationResponse } from '../api/reservations.ts'
import { fetchReservations } from '../api/reservations.ts'
import { useI18n } from '../i18n/I18nContext.tsx'
import { Header } from './Header.tsx'
import { Footer } from './Footer.tsx'
import { ReservationCard } from './ReservationCard.tsx'
import './HomeScreen.css'

interface HomeScreenProps {
  onNewReservation: () => void
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export function HomeScreen({ onNewReservation }: HomeScreenProps) {
  const { t } = useI18n()
  const [reservations, setReservations] = useState<ReservationResponse[]>([])
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')

  useEffect(() => {
    let cancelled = false

    const loadReservations = async () => {
      setLoadingState('loading')
      try {
        const data = await fetchReservations()
        if (!cancelled) {
          setReservations(data)
          setLoadingState('success')
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch reservations:', error)
          setLoadingState('error')
        }
      }
    }

    loadReservations()

    return () => {
      cancelled = true
    }
  }, [])

  const handleRetry = () => {
    setLoadingState('loading')
    fetchReservations()
      .then((data) => {
        setReservations(data)
        setLoadingState('success')
      })
      .catch((error) => {
        console.error('Failed to fetch reservations:', error)
        setLoadingState('error')
      })
  }

  return (
    <div className="home-screen">
      <Header />
      <main className="home-screen__main">
        <div className="home-screen__content">
          <h1 className="home-screen__title">{t.home.title}</h1>

          {loadingState === 'loading' && (
            <div className="home-screen__loading">
              <div className="home-screen__spinner" />
            </div>
          )}

          {loadingState === 'error' && (
            <div className="home-screen__error">
              <p className="home-screen__error-message">{t.home.loadingError}</p>
              <button
                className="home-screen__retry-button"
                onClick={handleRetry}
              >
                {t.errors.retry}
              </button>
            </div>
          )}

          {loadingState === 'success' && reservations.length === 0 && (
            <div className="home-screen__empty">
              <h2 className="home-screen__empty-title">{t.home.emptyTitle}</h2>
              <p className="home-screen__empty-subtitle">{t.home.emptySubtitle}</p>
              <button
                className="home-screen__cta-button"
                onClick={onNewReservation}
              >
                {t.home.newReservation}
              </button>
            </div>
          )}

          {loadingState === 'success' && reservations.length > 0 && (
            <>
              <div className="home-screen__list">
                {reservations.map((reservation) => (
                  <ReservationCard key={reservation.id} reservation={reservation} />
                ))}
              </div>
              <button
                className="home-screen__new-reservation-button"
                onClick={onNewReservation}
              >
                {t.home.newReservation}
              </button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
