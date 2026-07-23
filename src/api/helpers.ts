import type { ApiMatch, Match, MatchStatus } from "../types";

export function mapMatch(raw: ApiMatch): Match {
  return {
    id: raw.id,
    homeTeam: { name: raw.home_team },
    awayTeam: { name: raw.away_team },
    homeScore: raw.home_score,
    awayScore: raw.away_score,
    status: mapStatus(raw.status),
    league: raw.league,
    sport: "futbol",
    minute: raw.minute ?? -1,
    kickoff: formatKickoff(raw.kickoff),
  };
}

function mapStatus(status: string): MatchStatus {
  const s = status.toLowerCase();
  if (s === "primer tiempo" || s === "segundo tiempo") return "live";
  if (s === "entretiempo") return "ET";
  if (s === "finalizado" || s === "final") return "finished";
  if (s === "postponed" || s === "ppd") return "postponed";

  return "scheduled";
}

export function isToday(d: Date): boolean {
  const now = new Date();

  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export function formatDateParam(d: Date): string {
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatKickoff(d: string): string {
  return d.split(" ")[1];
}
