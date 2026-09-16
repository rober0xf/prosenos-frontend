import { fetchMatches } from "@/api/matches";
import { formatDateParam } from "@/api/helpers";
import { MatchView } from "@/components/MatchView";
import { parseDateParam } from "@/utils/matches";
import { Match } from "@/types";

interface PageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const dateParam = params.date ?? formatDateParam(new Date());
  const date = parseDateParam(dateParam);
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

  let matches: Match[] = [];
  let error: string | null = null;

  try {
    matches = await fetchMatches(date, backendUrl);
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
