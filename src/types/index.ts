export type Sport = "futbol" | "nba";

export type MatchStatus =
  | "scheduled"
  | "live"
  | "finished"
  | "postponed"
  | "ET";

export interface Team {
  name: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  league: string;
  sport: Sport;
  minute: number;
  kickoff: string;
}

export interface ApiMatch {
  id: string;
  league: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
  minute: number;
  kickoff: string;
}
