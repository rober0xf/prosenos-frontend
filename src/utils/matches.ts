import { Match, Sport } from "@/types";

export function groupMatchesByLeague(matches: Match[], sport: Sport) {
  const filtered = matches.filter((m) => m.sport === sport);
  const map = new Map<string, Match[]>();

  for (const match of filtered) {
    const list = map.get(match.league) ?? [];
    list.push(match);
    map.set(match.league, list);
  }

  return Array.from(map.entries());
}

export function parseDateParam(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  if (day && month && year) {
    return new Date(year, month - 1, day);
  }

  return new Date();
}
