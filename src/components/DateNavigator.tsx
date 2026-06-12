export function DateNavigator({
  date,
  onPrev,
  onNext,
}: {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
}) {
  // normalize date to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // compare timestapms
  const isToday = targetDate.getTime() === today.getTime();
  const isTomorrow = targetDate.getTime() === tomorrow.getTime();
  const isYesterday = targetDate.getTime() === yesterday.getTime();

  // display
  const getLabel = () => {
    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";
    if (isYesterday) return "Yesterday";

    // fallback
    const day = targetDate.getDate().toString().padStart(2, "0");
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex items-center justify-between px-4 py-2.5">
      <button
        onClick={onPrev}
        className="text-gray-500 hover:text-gray-800 text-lg leading-none cursor-pointer px-1"
        aria-label="Yesterday"
      >
        ‹
      </button>

      <span className="text-sm font-semibold text-gray-900">{getLabel()}</span>

      <button
        onClick={onNext}
        className="text-gray-500 hover:text-gray-800 text-lg leading-none cursor-pointer px-1"
        aria-label="Tomorrow"
      >
        ›
      </button>
    </div>
  );
}
