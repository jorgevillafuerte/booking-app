import type { TimeSlotOption } from '../config/restaurant.ts'

export interface TimeSlotInfo {
  time: string
  available: boolean
  waitlist: boolean
}

function hashDate(date: string): number {
  let hash = 0
  for (let i = 0; i < date.length; i++) {
    const char = date.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

export function getTimeSlotsForDate(
  date: string,
  slots: TimeSlotOption[],
): TimeSlotInfo[] {
  const seed = hashDate(date)
  let hasAvailable = false

  const result = slots.map((slot, index) => {
    const value = (seed + index * 7) % 10
    const available = value < 6
    const waitlist = !available && value < 8
    if (available) hasAvailable = true
    return { time: slot.time, available, waitlist }
  })

  if (!hasAvailable && result.length > 0) {
    result[0].available = true
    result[0].waitlist = false
  }

  return result
}

function addDays(date: string, days: number): string {
  const d = new Date(date + 'T00:00:00')
  d.setDate(d.getDate() + days)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function isClosedDay(date: string, closedDays: number[]): boolean {
  const d = new Date(date + 'T00:00:00')
  return closedDays.includes(d.getDay())
}

export function getAdjacentDaySlots(
  date: string,
  slots: TimeSlotOption[],
  closedDays: number[],
): {
  prevDate: string | null
  prevSlots: TimeSlotInfo[]
  nextDate: string | null
  nextSlots: TimeSlotInfo[]
} {
  let prevDate: string | null = null
  for (let i = 1; i <= 7; i++) {
    const candidate = addDays(date, -i)
    if (!isClosedDay(candidate, closedDays)) {
      prevDate = candidate
      break
    }
  }

  let nextDate: string | null = null
  for (let i = 1; i <= 7; i++) {
    const candidate = addDays(date, i)
    if (!isClosedDay(candidate, closedDays)) {
      nextDate = candidate
      break
    }
  }

  return {
    prevDate,
    prevSlots: prevDate ? getTimeSlotsForDate(prevDate, slots) : [],
    nextDate,
    nextSlots: nextDate ? getTimeSlotsForDate(nextDate, slots) : [],
  }
}
