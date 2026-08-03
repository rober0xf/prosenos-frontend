import { useState } from "react";
import { formatDateParam } from "../api/helpers";

function parseDateFromQuery(): Date {
  const params = new URLSearchParams(window.location.search);
  const dateStr = params.get("date");

  if (dateStr) {
    const [day, month, year] = dateStr.split("-").map(Number);
    if (day && month && year) {
      const parsed = new Date(year, month - 1, day);
      if (formatDateParam(parsed) === dateStr) {
        return parsed;
      }
    }
  }

  return new Date();
}

type DateUpdater = React.SetStateAction<Date>;

export function useUrlDate() {
  const [date, setDateState] = useState<Date>(parseDateFromQuery);

  const setDate = (next: DateUpdater) => {
    setDateState((current) => {
      const newDate = typeof next === "function" ? next(current) : next;

      const url = new URL(window.location.href);
      url.searchParams.set("date", formatDateParam(newDate));
      window.history.replaceState(null, "", url.toString());

      return newDate;
    });
  };

  return { date, setDate };
}
