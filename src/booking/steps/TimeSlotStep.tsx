import { useBookingState, useBookingDispatch } from '../BookingContext.tsx'
import { useI18n } from '../../i18n/I18nContext.tsx'
import { defaultConfig } from '../../config/restaurant.ts'
import { getTimeSlotsForDate, getAdjacentDaySlots } from '../../mock/timeSlots.ts'
import { ChevronLeftIcon, ChevronRightIcon } from '../../components/Icons.tsx'
import './TimeSlotStep.css'

export function TimeSlotStep() {
  const state = useBookingState()
  const dispatch = useBookingDispatch()
  const { t } = useI18n()

  const selectedDate = state.selectedDate!
  const slots = getTimeSlotsForDate(selectedDate, defaultConfig.timeSlots)
  const adjacent = getAdjacentDaySlots(selectedDate, defaultConfig.timeSlots, defaultConfig.closedDays)

  const dateObj = new Date(selectedDate + 'T00:00:00')
  const dateDisplay = `${t.days.short[dateObj.getDay()]} ${dateObj.getDate()}, ${t.months.short[dateObj.getMonth()]}`

  const hasAvailable = slots.some((s) => s.available)

  return (
    <div className="time-slot-step">
      <h2 className="time-slot-step__title">{t.timeSlot.title}</h2>
      <p className="time-slot-step__date-display">{dateDisplay}</p>

      {hasAvailable ? (
        <div className="time-slot-step__grid">
          {slots.map((slot) => {
            if (slot.waitlist) {
              return (
                <div
                  key={slot.time}
                  className="time-slot-step__slot time-slot-step__slot--waitlist"
                >
                  <span>{slot.time}</span>
                  <span className="time-slot-step__waitlist-label">{t.timeSlot.waitlist}</span>
                </div>
              )
            }

            return (
              <button
                key={slot.time}
                className={`time-slot-step__slot${slot.available ? ' time-slot-step__slot--available' : ' time-slot-step__slot--unavailable'}`}
                onClick={() => dispatch({ type: 'SET_TIME_SLOT', payload: slot.time })}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            )
          })}
        </div>
      ) : (
        <p className="time-slot-step__no-slots">{t.timeSlot.noSlots}</p>
      )}

      <div className="time-slot-step__adjacent">
        {adjacent.prevDate && (
          <div className="time-slot-step__adjacent-section">
            <div className="time-slot-step__adjacent-header">
              <ChevronLeftIcon size={16} />
              <span>{t.timeSlot.previousDay}</span>
            </div>
            <div className="time-slot-step__adjacent-slots">
              {adjacent.prevSlots.filter((s) => s.available).map((s) => (
                <span key={s.time} className="time-slot-step__adjacent-slot">{s.time}</span>
              ))}
            </div>
          </div>
        )}

        {adjacent.nextDate && (
          <div className="time-slot-step__adjacent-section">
            <div className="time-slot-step__adjacent-header">
              <span>{t.timeSlot.nextDay}</span>
              <ChevronRightIcon size={16} />
            </div>
            <div className="time-slot-step__adjacent-slots">
              {adjacent.nextSlots.filter((s) => s.available).map((s) => (
                <span key={s.time} className="time-slot-step__adjacent-slot">{s.time}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
