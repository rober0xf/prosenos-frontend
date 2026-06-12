import type { Match, MatchStatus } from '../types'

function StatusBadge({ status, minute }: { status: MatchStatus; minute?: number }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
        {minute}&#39;
      </span>
    )
  }
  if (status === 'finished') {
    return <span className="text-xs font-semibold text-gray-500">Final</span>
  }
  return <span className="text-xs text-gray-400">{ /* startTime */ }&nbsp;</span>
}

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const { homeTeam, awayTeam, homeScore, awayScore, status, startTime } = match
  const isLive = status === 'live'
  const isFinished = status === 'finished'
  const showScore = homeScore !== null && awayScore !== null

  return (
    <div
      className={`flex items-center px-4 py-3 ${
        isLive ? 'bg-red-50' : ''
      }`}
    >
      {/* Home team */}
      <div className="flex-1 text-right pr-3">
        <span className={`text-sm ${isLive || isFinished ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
          {homeTeam.name}
        </span>
      </div>

      {/* Score / time column */}
      <div className="flex flex-col items-center min-w-[72px]">
        {showScore ? (
          <div className="flex items-baseline gap-2">
            <span className={`text-lg font-bold tabular-nums ${isLive ? 'text-red-700' : 'text-gray-900'}`}>
              {homeScore}
            </span>
            <span className="text-xs text-gray-400">-</span>
            <span className={`text-lg font-bold tabular-nums ${isLive ? 'text-red-700' : 'text-gray-900'}`}>
              {awayScore}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-500 font-medium">{startTime}</span>
        )}

        {/* Status below the score */}
        {status === 'scheduled' ? (
          <span className="text-[10px] text-gray-400 mt-0.5">{startTime}</span>
        ) : (
          <StatusBadge status={status} minute={match.minute} />
        )}
      </div>

      {/* Away team */}
      <div className="flex-1 text-left pl-3">
        <span className={`text-sm ${isLive || isFinished ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
          {awayTeam.name}
        </span>
      </div>
    </div>
  )
}
