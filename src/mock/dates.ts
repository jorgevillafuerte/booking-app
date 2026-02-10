export interface DateInfo {
  date: string
  dayOfWeek: number
  dayNumber: number
  monthIndex: number
  isClosed: boolean
}

export function generateAvailableDates(
  startDate: Date,
  count: number,
  closedDays: number[],
): DateInfo[] {
  const dates: DateInfo[] = []
  const current = new Date(startDate)
  current.setHours(0, 0, 0, 0)

  for (let i = 0; i < count; i++) {
    const dayOfWeek = current.getDay()
    const year = current.getFullYear()
    const month = String(current.getMonth() + 1).padStart(2, '0')
    const day = String(current.getDate()).padStart(2, '0')

    dates.push({
      date: `${year}-${month}-${day}`,
      dayOfWeek,
      dayNumber: current.getDate(),
      monthIndex: current.getMonth(),
      isClosed: closedDays.includes(dayOfWeek),
    })

    current.setDate(current.getDate() + 1)
  }

  return dates
}
