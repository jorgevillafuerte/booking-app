import { useState } from 'react'
import { useBookingState, useBookingDispatch } from '../BookingContext.tsx'
import { useI18n } from '../../i18n/I18nContext.tsx'
import { defaultConfig } from '../../config/restaurant.ts'
import { PlusIcon, MinusIcon, ArrowRightIcon } from '../../components/Icons.tsx'
import './GuestCountStep.css'

export function GuestCountStep() {
  const state = useBookingState()
  const dispatch = useBookingDispatch()
  const { t } = useI18n()

  const { min, max, quickSelectMax } = defaultConfig.guestLimits
  const [showCustom, setShowCustom] = useState<boolean>(false)
  const [customCount, setCustomCount] = useState<number>(quickSelectMax + 1)

  const quickOptions: number[] = []
  for (let i = min; i <= quickSelectMax; i++) {
    quickOptions.push(i)
  }

  return (
    <div className="guest-count-step">
      <h2 className="guest-count-step__title">
        {t.guestCount.title} <strong>{t.guestCount.titleBold}</strong>
      </h2>

      <div className="guest-count-step__grid">
        {quickOptions.map((n) => (
          <button
            key={n}
            className={`guest-count-step__circle${state.guestCount === n ? ' guest-count-step__circle--selected' : ''}`}
            onClick={() => dispatch({ type: 'SET_GUEST_COUNT', payload: n })}
          >
            {n}
          </button>
        ))}
        <button
          className={`guest-count-step__circle guest-count-step__more${showCustom ? ' guest-count-step__circle--selected' : ''}`}
          onClick={() => setShowCustom(!showCustom)}
        >
          {quickSelectMax}+
        </button>
      </div>

      {showCustom && (
        <div className="guest-count-step__counter">
          <button
            className="guest-count-step__counter-btn"
            onClick={() => setCustomCount((c) => Math.max(quickSelectMax + 1, c - 1))}
            disabled={customCount <= quickSelectMax + 1}
            aria-label="Decrease guest count"
          >
            <MinusIcon size={20} />
          </button>
          <span className="guest-count-step__counter-value">{customCount}</span>
          <button
            className="guest-count-step__counter-btn"
            onClick={() => setCustomCount((c) => Math.min(max, c + 1))}
            disabled={customCount >= max}
            aria-label="Increase guest count"
          >
            <PlusIcon size={20} />
          </button>
        </div>
      )}

      {showCustom && (
        <button
          className="guest-count-step__confirm"
          onClick={() => dispatch({ type: 'SET_GUEST_COUNT', payload: customCount })}
        >
          {t.common.personLabel(customCount)}
          <ArrowRightIcon size={18} />
        </button>
      )}
    </div>
  )
}
