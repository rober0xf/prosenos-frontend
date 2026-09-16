import "@/app/styles/navigator.css";

export function DateNavigator({
  date,
  onPrev,
  onNext,
}: {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isToday = targetDate.getTime() === today.getTime();
  const isTomorrow = targetDate.getTime() === tomorrow.getTime();
  const isYesterday = targetDate.getTime() === yesterday.getTime();

  const getLabel = () => {
    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";
    if (isYesterday) return "Yesterday";

    const day = targetDate.getDate().toString().padStart(2, "0");
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <nav className="date-navigation" aria-label="date navigation">
      <button
        onClick={onPrev}
        className="date-navigation-button"
        aria-label="Yesterday"
      >
        ‹
      </button>

      <span className="date-navigation-label">{getLabel()}</span>

      <button
        onClick={onNext}
        className="date-navigation-button"
        aria-label="Tomorrow"
      >
        ›
      </button>
    </nav>
  );
}
