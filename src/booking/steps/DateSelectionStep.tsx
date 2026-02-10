import { useRef } from 'react'
import { useBookingState, useBookingDispatch } from '../BookingContext.tsx'
import { useI18n } from '../../i18n/I18nContext.tsx'
import { defaultConfig } from '../../config/restaurant.ts'
import { generateAvailableDates } from '../../mock/dates.ts'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '../../components/Icons.tsx'
import './DateSelectionStep.css'

const dates = generateAvailableDates(new Date(), 30, defaultConfig.closedDays)

export function DateSelectionStep() {
  const state = useBookingState()
  const dispatch = useBookingDispatch()
  const { t } = useI18n()
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

  return (
    <div className="date-selection-step">
      <h2 className="date-selection-step__title">
        {t.dateSelection.title} <strong>{t.dateSelection.titleBold}</strong>
      </h2>

      <div className="date-selection-step__strip-container">
        <button
          className="date-selection-step__arrow date-selection-step__arrow--left"
          onClick={handleScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon size={20} />
        </button>

        <div className="date-selection-step__strip" ref={scrollRef}>
          {dates.map((d) => {
            const isSelected = state.selectedDate === d.date
            let className = 'date-selection-step__day'
            if (d.isClosed) className += ' date-selection-step__day--closed'
            if (isSelected) className += ' date-selection-step__day--selected'

            return (
              <button
                key={d.date}
                className={className}
                onClick={() => dispatch({ type: 'SET_DATE', payload: d.date })}
                disabled={d.isClosed}
              >
                <span className="date-selection-step__day-name">
                  {t.days.short[d.dayOfWeek]}
                </span>
                <span className="date-selection-step__day-number">
                  {d.dayNumber}
                </span>
                <span className="date-selection-step__day-month">
                  {d.isClosed ? t.dateSelection.closed : t.months.short[d.monthIndex]}
                </span>
              </button>
            )
          })}

          <button className="date-selection-step__more-dates" disabled>
            <CalendarIcon size={20} />
            <span>{t.dateSelection.moreDates}</span>
          </button>
        </div>

        <button
          className="date-selection-step__arrow date-selection-step__arrow--right"
          onClick={handleScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </div>
  )
}
