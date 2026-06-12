import { useState, useMemo } from 'react'
import type { Sport } from './types'
import { matches } from './data/dummy'
import { SportTabs } from './components/SportTabs'
import { DateNavigator } from './components/DateNavigator'
import { LeagueSection } from './components/LeagueSection'

function formatDate(d: Date) {
  const y = d.getFullYear()
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${day}`
}

function App() {
  const [sport, setSport] = useState<Sport>('football')
  const [currentDate, setCurrentDate] = useState(() => new Date())

  const dateStr = formatDate(currentDate)

  const grouped = useMemo(() => {
    const filtered = matches.filter((m) => m.sport === sport && m.date === dateStr)
    const map = new Map<string, typeof filtered>()
    for (const m of filtered) {
      const list = map.get(m.league) ?? []
      list.push(m)
      map.set(m.league, list)
    }
    return Array.from(map.entries())
  }, [sport, dateStr])

  const prevDay = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() - 1)
    setCurrentDate(d)
  }

  const nextDay = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + 1)
    setCurrentDate(d)
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-xl mx-auto px-4 py-3">
          <h1 className="text-lg font-bold text-gray-900 text-center mb-3">
            Marcadores
          </h1>
          <SportTabs active={sport} onChange={setSport} />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          <DateNavigator
            date={currentDate}
            onPrev={prevDay}
            onNext={nextDay}
          />

          {grouped.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">
              No hay partidos para esta fecha
            </p>
          ) : (
            grouped.map(([league, leagueMatches]) => (
              <LeagueSection key={league} league={league} matches={leagueMatches} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default App
