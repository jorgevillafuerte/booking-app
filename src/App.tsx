import { BookingProvider, useBookingState } from './booking/BookingContext.tsx'
import { BookingCard } from './components/BookingCard.tsx'
import { Header } from './components/Header.tsx'
import { ProgressBar } from './components/ProgressBar.tsx'
import { BackButton } from './components/BackButton.tsx'
import { Footer } from './components/Footer.tsx'
import { StepRenderer } from './booking/steps/StepRenderer.tsx'
import './App.css'

function BookingFlow() {
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
            <StepRenderer />
          </div>
        </BookingCard>
        <ProgressBar />
        <BackButton />
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  )
}

export default App
