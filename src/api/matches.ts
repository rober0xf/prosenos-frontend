import type { ApiMatch, Match } from "../types";
import { isToday, formatDateParam, mapMatch } from "./helpers";

export async function fetchMatches(
  date: Date,
  baseUrl?: string,
): Promise<Match[]> {
  const path = isToday(date)
    ? "/api/v1/matches/today"
    : `/api/v1/matches/${formatDateParam(date)}`;

  const url = baseUrl ? `${baseUrl}${path}` : path;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching matches: ${res.status}`);
  }
  const data: ApiMatch[] = await res.json();

  return data.map(mapMatch);
}