import type { Match } from "../types";
import { MatchCard } from "./MatchCard";

interface LeagueSectionProps {
  league: string;
  matches: Match[];
}

export function LeagueSection({ league, matches }: LeagueSectionProps) {
  return (
    <div className="border border-[#74ACDF] rounded-lg overflow-hidden shadow-sm">
      <div className="bg-[#74ACDF] px-4 py-2.5 border-b border-[#74ACDF]">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {league}
        </h2>
      </div>

      <div className="divide-y divide-[#74ACDF]/40 bg-white">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
