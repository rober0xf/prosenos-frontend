import { fetchMatches } from "@/api/matches";
import { formatDateParam } from "@/api/helpers";
import { MatchView } from "@/components/MatchView";
import type { Match } from "@/types";

function parseDate(dateStr: string | undefined): Date {
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const date = parseDate(params.date);
  const dateParam = formatDateParam(date);

  let matches: Match[] = [];
  let error: string | null = null;

  try {
    matches = await fetchMatches(date, "http://localhost:8000");
  } catch (err) {
    error = err instanceof Error ? err.message : "unknown error";
  }

  return (
    <MatchView
      initialMatches={matches}
      initialDate={dateParam}
      initialError={error}
    />
  );
}
