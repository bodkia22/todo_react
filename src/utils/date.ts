export const getWeekDates = (weekStart: Date): Date[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })
}

export const getMonday = (date: Date): Date => {
  const day = date.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(date)
  monday.setDate(date.getDate() + diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date)
  d.setDate(date.getDate() + days)
  return d
}

export const dateKey = (d: Date): string => d.toISOString().slice(0, 10)   // "2026-04-28"

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()