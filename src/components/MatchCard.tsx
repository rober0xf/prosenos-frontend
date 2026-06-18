import type { Match, MatchStatus } from "../types";

function StatusBadge({
  status,
  minute,
}: {
  status: MatchStatus;
  minute?: number;
}) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-900/40 px-1.5 py-0.5 rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        {minute}&#39;
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="text-xs font-bold text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">
        Final
      </span>
    );
  }
  return null;
}

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const { homeTeam, awayTeam, homeScore, awayScore, status, startTime } = match;
  const isLive = status === "live";
  const isFinished = status === "finished";
  const showScore = homeScore !== null && awayScore !== null;

  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto] items-center px-4 py-3 gap-x-4 transition-colors ${
        isLive ? "bg-red-900/15 border-l-[3px] border-red-500" : ""
      }`}
    >
      {/* left column: status / time */}
      <div className="flex flex-col items-center justify-center min-w-12.5 text-center">
        {status === "scheduled" ? (
          <span className="text-md font-semibold text-gray-400 tabular-nums">
            {startTime}
          </span>
        ) : (
          <StatusBadge status={status} minute={match.minute} />
        )}
      </div>

      {/* middle column: team and player name */}
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col">
          <span
            className={`text-md ${isLive || isFinished ? "font-semibold text-gray-100" : "text-gray-400"}`}
          >
            {homeTeam.name}
          </span>
        </div>

        <div className="flex flex-col">
          <span
            className={`text-md ${isLive || isFinished ? "font-semibold text-gray-100" : "text-gray-400"}`}
          >
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* right column: stacked scores */}
      <div className="flex flex-col gap-y-2 text-right min-w-6">
        {showScore ? (
          <>
            <span
              className={`text-base font-bold tabular-nums ${isLive ? "text-red-400" : "text-gray-100"}`}
            >
              {homeScore}
            </span>
            <span
              className={`text-base font-bold tabular-nums ${isLive ? "text-red-400" : "text-gray-100"}`}
            >
              {awayScore}
            </span>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600 font-bold">-</span>
            <span className="text-sm text-gray-600 font-bold">-</span>
          </>
        )}
      </div>
    </div>
  );
}
