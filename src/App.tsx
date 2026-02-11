import { useState } from 'react'
import { BookingProvider, useBookingState } from './booking/BookingContext.tsx'
import { BookingCard } from './components/BookingCard.tsx'
import { Header } from './components/Header.tsx'
import { ProgressBar } from './components/ProgressBar.tsx'
import { BackButton } from './components/BackButton.tsx'
import { Footer } from './components/Footer.tsx'
import { StepRenderer } from './booking/steps/StepRenderer.tsx'
import { HomeScreen } from './components/HomeScreen.tsx'
import './App.css'

interface BookingFlowProps {
  onGoHome: () => void
}

function BookingFlow({ onGoHome }: BookingFlowProps) {
  const state = useBookingState()

  return (
    <div className="app">
      <div className="booking-layout">
        <BookingCard>
          <Header />
          <div
            key={state.currentStep}
            className={`step-content step-content--${state.direction}`}
          >
            <StepRenderer onGoHome={onGoHome} />
          </div>
        </BookingCard>
        <ProgressBar />
        <BackButton onGoHome={onGoHome} />
        <Footer />
      </div>
    </div>
  )
}

type AppView = 'home' | 'booking'

function App() {
  const [view, setView] = useState<AppView>('home')
  const [refreshKey, setRefreshKey] = useState<number>(0)

  const handleGoHome = () => {
    setRefreshKey((prev) => prev + 1)
    setView('home')
  }

  const handleNewReservation = () => {
    setView('booking')
  }

  if (view === 'home') {
    return <HomeScreen onNewReservation={handleNewReservation} key={refreshKey} />
  }

  return (
    <BookingProvider>
      <BookingFlow onGoHome={handleGoHome} />
    </BookingProvider>
  )
}

export default App
