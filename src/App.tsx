import { useState, useMemo } from "react";
import type { Match, Sport } from "./types";
import { SportTabs } from "./components/SportTabs";
import { DateNavigator } from "./components/DateNavigator";
import { LeagueSection } from "./components/LeagueSection";
import { useMatches } from "./hooks/useMatches";

function App() {
  const [sport, setSport] = useState<Sport>("futbol");
  const [currentDate, setCurrentDate] = useState(new Date());
  const { matches, loading, error } = useMatches(currentDate);

  const grouped = useMemo(() => {
    const filtered = matches.filter((m) => m.sport === sport);
    const map = new Map<string, Match[]>();

    for (const match of filtered) {
      const list = map.get(match.league) ?? [];
      list.push(match);
      map.set(match.league, list);
    }

    return Array.from(map.entries());
  }, [matches, sport]);

  const prevDay = () => {
    setCurrentDate((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() - 1);
      return next;
    });
  };

  const nextDay = () => {
    setCurrentDate((current) => {
      const next = new Date(current);
      next.setDate(next.getDate() + 1);
      return next;
    });
  };

  return (
    <div
      className="min-h-dvh bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/public/bg.webp')" }}
    >
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-semibold text-gray-100 text-center mb-3 tracking-wide drop-shadow-md">
            Prosenos
          </h1>
          <SportTabs active={sport} onChange={setSport} />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-3 p-5">
          <DateNavigator date={currentDate} onPrev={prevDay} onNext={nextDay} />

          {loading ? (
            <p className="text-center font-medium text-gray-200 py-8">
              Loading matches...
            </p>
          ) : error ? (
            <p className="text-center font-medium text-xl text-red-400 py-8">
              {error}
            </p>
          ) : grouped.length === 0 ? (
            <p className="text-center font-medium text-gray-200 py-8">
              There is not matches for this date
            </p>
          ) : (
            grouped.map(([league, leagueMatches]) => (
              <LeagueSection
                key={league}
                league={league}
                matches={leagueMatches}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
