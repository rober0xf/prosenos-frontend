import type { Match } from "../types";

import { cleanLogoPath } from "../utils/cleanLogoName";
import { StatusBadge } from "./StatusBadge";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    status,
    kickoff,
    aggHomeScore,
    aggAwayScore,
    homeScorers,
    awayScorers,
    homePenalties,
    awayPenalties,
  } = match;
  const isLive = status === "live";
  const isFinished = status === "finished";
  const showScore = homeScore !== null && awayScore !== null;

  const hasAggregate =
    aggHomeScore !== null &&
    aggHomeScore !== undefined &&
    aggAwayScore !== null &&
    aggAwayScore !== undefined;

  const hasPenalties =
    homePenalties !== null &&
    homePenalties !== undefined &&
    awayPenalties !== null &&
    awayPenalties !== undefined;

  const teamNameClass = `text-md truncate ${
    isLive || isFinished ? "font-semibold text-gray-100" : "text-gray-400"
  }`;
  const scoreClass = `text-base font-bold tabular-nums ${
    isLive ? "text-red-400" : "text-gray-100"
  }`;
  const scorerClass = "text-xs font-medium text-orange-400 truncate max-w-40";

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
        {/* home team: name+logo, scorers below, right-aligned */}
        <div className="flex flex-1 flex-col items-end justify-center gap-0.5 min-w-0">
          <div className="flex items-center justify-end gap-2.5 min-w-0">
            <span className={`${teamNameClass} text-right`}>
              {homeTeam.name}
            </span>
            <img
              src={cleanLogoPath(homeTeam.name)}
              alt=""
              className="w-5 h-5 object-contain shrink-0"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          {homeScorers && homeScorers.length > 0 && (
            <div className="flex flex-col items-end gap-0.5">
              {homeScorers.map((scorer, i) => (
                <span key={i} className={`${scorerClass} text-right`}>{scorer}</span>
              ))}
            </div>
          )}
        </div>

        {/* scores in the middle, with aggregate/penalties stacked below */}
        <div className="flex flex-col items-center gap-0.5 shrink-0">
          <div className="flex items-center gap-x-1.5">
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

          {/* "ida y vuelta" aggregate score */}
          {hasAggregate && (
            <span className="text-[11px] font-semibold text-blue-400 tabular-nums">
              {aggHomeScore} - {aggAwayScore}
            </span>
          )}

          {/* penalties, if the tie reached them */}
          {hasPenalties && (
            <span className="text-[11px] font-semibold text-amber-400 tabular-nums">
              {homePenalties} - {awayPenalties}
            </span>
          )}
        </div>

        {/* away team: logo+name, scorers below, left-aligned */}
        <div className="flex flex-1 flex-col items-start justify-center gap-0.5 min-w-0">
          <div className="flex items-center justify-start gap-2.5 min-w-0">
            <img
              src={cleanLogoPath(awayTeam.name)}
              alt=""
              className="w-5 h-5 object-contain shrink-0"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className={teamNameClass}>{awayTeam.name}</span>
          </div>
          {awayScorers && awayScorers.length > 0 && (
            <div className="flex flex-col items-start gap-0.5">
              {awayScorers.map((scorer, i) => (
                <span key={i} className={scorerClass}>{scorer}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
