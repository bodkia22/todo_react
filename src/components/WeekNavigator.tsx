interface WeekNavigatorProps {
  weekStart: Date
  onPrevious: () => void
  onToday: () => void
  onNext: () => void
}


const WeekNavigator = ({ weekStart, onPrevious, onToday, onNext }: WeekNavigatorProps) => {
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })

  const rangeLabel = `${formatDate(weekStart)} — ${formatDate(weekEnd)}`

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex gap-1">
        <button
          onClick={onPrevious}
          className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          aria-label="Previous week"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          aria-label="Next week"
        >
          ›
        </button>
      </div>

      <h2 className="text-xl font-semibold text-white">
        {rangeLabel}
      </h2>

      <button
        onClick={onToday}
        className="ml-auto px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Today
      </button>
    </div>
  )
}

export default WeekNavigator;