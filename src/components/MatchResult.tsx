import { Match } from "@/types";
import { LeagueSection } from "./LeagueSection";
import "@/app/styles/match-result.css";

interface MatchResultProps {
  loading: boolean;
  error: string | null;
  grouped: [string, Match[]][];
}

export const MatchResult = ({ loading, error, grouped }: MatchResultProps) => {
  if (loading) {
    return <p className="match-result-message">Loading matches...</p>;
  }

  if (error) {
    return <p className="match-result-error">{error}</p>;
  }

  if (grouped.length === 0) {
    return (
      <p className="match-result-message">
        There are not matches for this date
      </p>
    );
  }

  return (
    <>
      {grouped.map(([league, leagueMatches]) => (
        <LeagueSection key={league} league={league} matches={leagueMatches} />
      ))}
    </>
  );
};
