import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'
import type { BookingState, BookingAction } from './types.ts'
import { bookingReducer, initialBookingState } from './bookingReducer.ts'

const BookingStateContext = createContext<BookingState | null>(null)
const BookingDispatchContext = createContext<Dispatch<BookingAction> | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState)

  return (
    <BookingStateContext value={state}>
      <BookingDispatchContext value={dispatch}>
        {children}
      </BookingDispatchContext>
    </BookingStateContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBookingState(): BookingState {
  const ctx = useContext(BookingStateContext)
  if (!ctx) throw new Error('useBookingState must be used within BookingProvider')
  return ctx
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBookingDispatch(): Dispatch<BookingAction> {
  const ctx = useContext(BookingDispatchContext)
  if (!ctx) throw new Error('useBookingDispatch must be used within BookingProvider')
  return ctx
}
