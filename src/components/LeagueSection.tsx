import type { Match } from "../types";
import { cleanLogoPath } from "../utils/cleanLogoName";
import { MatchCard } from "./MatchCard";

interface LeagueSectionProps {
  league: string;
  matches: Match[];
}

export const LeagueSection = ({ league, matches }: LeagueSectionProps) => {
  return (
    <div className="border border-green-700/50 rounded-lg overflow-hidden bg-green-950">
      <div className="bg-green-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <img
            src={cleanLogoPath(league)}
            alt={`${league} logo`}
            className="w-8 h-8 object-contain shrink-0"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <h2 className="text-xs font-bold text-green-100 uppercase tracking-wider leading-none">
            {league}
          </h2>
        </div>
      </div>

      <div className="divide-y divide-green-800/60">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};
