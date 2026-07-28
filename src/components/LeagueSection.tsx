import type { Match } from "../types";
import { cleanLogoPath } from "../utils/cleanLogoName";
import { MatchCard } from "./MatchCard";

interface LeagueSectionProps {
  league: string;
  matches: Match[];
}

export const LeagueSection = ({ league, matches }: LeagueSectionProps) => {
  return (
    <div className="backdrop-blur-sm  border-slate-900/30 border-2 rounded-lg overflow-hidden">
      {/* league header colors */}
      <div className="bg-yellow-200/20 backdrop-blur-lg px-2 py-2">
        <div className="flex items-center gap-3">
          <img
            src={cleanLogoPath(league)}
            alt={`${league} logo`}
            className="w-10 h-10 object-contain shrink-0"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">
            {league}
          </h2>
        </div>
      </div>

      {/* matches container */}
      <div className="bg-blue-950/60 backdrop-blur-lg divide-y divide-white/10">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};
