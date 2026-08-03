import type { Match } from "../types";

import { cleanLogoPath } from "../utils/cleanLogoName";
import { StatusBadge } from "./StatusBadge";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const { homeTeam, awayTeam, homeScore, awayScore, status, kickoff } = match;
  const isLive = status === "live";
  const isFinished = status === "finished";
  const showScore = homeScore !== null && awayScore !== null;
  const teamNameClass = `text-md ${
    isLive || isFinished ? "font-semibold text-gray-100" : "text-gray-400"
  }`;
  const scoreClass = `text-base font-bold tabular-nums ${
    isLive ? "text-red-400" : "text-gray-100"
  }`;

  return (
    <div
      className={`grid grid-cols-[auto_1fr] items-center px-4 py-3 gap-x-4 transition-colors ${
        isLive ? "bg-red-900/15 border-l-[3px] border-red-500" : ""
      }`}
    >
      {/* left column: status / time */}
      <div className="flex flex-col items-center justify-center min-w-12.5 text-center">
        {status === "scheduled" ? (
          <span className="text-md font-semibold text-gray-400 tabular-nums">
            {kickoff ?? "—"}
          </span>
        ) : (
          <StatusBadge status={status} minute={match.minute} />
        )}
      </div>

      {/* right column: Team 1 (score) - (score) Team 2 on one row */}
      <div className="flex items-center gap-x-3">
        {/* home team: name then logo, aligned to the right of its cell */}
        <div className="flex flex-1 items-center justify-end gap-2.5 min-w-0">
          <span className={`${teamNameClass} text-right`}>{homeTeam.name}</span>
          <img
            src={cleanLogoPath(homeTeam.name)}
            alt=""
            className="w-5 h-5 object-contain shrink-0"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        {/* scores in the middle */}
        <div className="flex items-center gap-x-1.5 shrink-0">
          {showScore ? (
            <>
              <span className={scoreClass}>{homeScore}</span>
              <span className="text-gray-500 font-bold">-</span>
              <span className={scoreClass}>{awayScore}</span>
            </>
          ) : (
            <span className="text-sm text-gray-600 font-bold tabular-nums">
              - : -
            </span>
          )}
        </div>

        {/* away team: logo then name, aligned to the left of its cell */}
        <div className="flex flex-1 items-center justify-start gap-2.5 min-w-0">
          <img
            src={cleanLogoPath(awayTeam.name)}
            alt=""
            className="w-5 h-5 object-contain shrink-0"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className={teamNameClass}>{awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
};
