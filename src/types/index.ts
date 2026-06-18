export type Sport = "futbol" | "nba";

export type MatchStatus = "scheduled" | "live" | "finished" | "postponed";

export interface Team {
  name: string;
  logo?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  startTime: string;
  league: string;
  sport: Sport;
  date: string; // "YYYY-MM-DD"
  minute?: number;
}
