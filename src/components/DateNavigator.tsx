export function DateNavigator({
  date,
  onPrev,
  onNext,
}: {
  date: Date
  onPrev: () => void
  onNext: () => void
}) {
  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-between px-4 py-2.5">
      <button
        onClick={onPrev}
        className="text-gray-500 hover:text-gray-800 text-lg leading-none cursor-pointer px-1"
        aria-label="Día anterior"
      >
        ‹
      </button>

      <span className="text-sm font-semibold text-gray-900">
        {isToday ? 'Hoy' : `${day}/${month}`}
      </span>

      <button
        onClick={onNext}
        className="text-gray-500 hover:text-gray-800 text-lg leading-none cursor-pointer px-1"
        aria-label="Día siguiente"
      >
        ›
      </button>
    </div>
  )
}
