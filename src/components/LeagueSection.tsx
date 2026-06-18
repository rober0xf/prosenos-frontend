import type { Match } from "../types";
import { MatchCard } from "./MatchCard";

interface LeagueSectionProps {
  league: string;
  matches: Match[];
}

export function LeagueSection({ league, matches }: LeagueSectionProps) {
  return (
    <div className="border border-green-700/50 rounded-lg overflow-hidden bg-green-950">
      <div className="bg-green-900 px-4 py-2">
        <h2 className="text-xs font-bold text-green-100 uppercase tracking-wider">
          {league}
        </h2>
      </div>

      <div className="divide-y divide-green-800/60">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
