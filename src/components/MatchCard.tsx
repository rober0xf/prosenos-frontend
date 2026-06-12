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
      <span className="inline-flex items-center gap-1 text-md font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
        {minute}&#39;
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="text-md font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
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
      className={`grid grid-cols-[auto_1fr_auto] items-center px-4 py-3.5 gap-x-4 transition-colors ${
        isLive ? "bg-red-50/60 border-l-4 border-red-500" : "bg-white"
      }`}
    >
      {/* left column: status / time */}
      <div className="flex flex-col items-center justify-center min-w-12.5 text-center">
        {status === "scheduled" ? (
          <span className="text-md font-semibold text-gray-600 tabular-nums">
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
            className={`text-md ${isLive || isFinished ? "font-semibold text-gray-900" : "text-gray-600"}`}
          >
            {homeTeam.name}
          </span>
          {/* TODO: add home goalscorers here */}
        </div>

        <div className="flex flex-col">
          <span
            className={`text-md ${isLive || isFinished ? "font-semibold text-gray-900" : "text-gray-600"}`}
          >
            {awayTeam.name}
          </span>
          {/* TODO: add away goalscorers here */}
        </div>
      </div>

      {/* right column: stacked scores */}
      <div className="flex flex-col gap-y-2 text-right min-w-6">
        {showScore ? (
          <>
            <span
              className={`text-base font-bold tabular-nums ${isLive ? "text-red-600" : "text-gray-900"}`}
            >
              {homeScore}
            </span>
            <span
              className={`text-base font-bold tabular-nums ${isLive ? "text-red-600" : "text-gray-900"}`}
            >
              {awayScore}
            </span>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300 font-bold">-</span>
            <span className="text-sm text-gray-300 font-bold">-</span>
          </>
        )}
      </div>
    </div>
  );
}
