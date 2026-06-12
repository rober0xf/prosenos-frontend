import type { Match } from '../types'
import { MatchCard } from './MatchCard'

interface LeagueSectionProps {
  league: string
  matches: Match[]
}

export function LeagueSection({ league, matches }: LeagueSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {league}
        </h2>
      </div>
      <div className="divide-y divide-gray-100">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}
