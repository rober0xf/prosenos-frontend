import type { Sport } from '../types'

interface SportTabsProps {
  active: Sport
  onChange: (sport: Sport) => void
}

export function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mx-auto">
      <button
        onClick={() => onChange('football')}
        className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
          active === 'football'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        Fútbol
      </button>
      <button
        onClick={() => onChange('nba')}
        className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
          active === 'nba'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        NBA
      </button>
    </div>
  )
}
