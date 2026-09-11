"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Match, Sport } from "@/types";
import { SportTabs } from "@/components/SportTabs";
import { DateNavigator } from "@/components/DateNavigator";
import { LeagueSection } from "@/components/LeagueSection";
import { useMatches } from "@/hooks/useMatches";
import { formatDateParam } from "@/api/helpers";

interface MatchViewProps {
  initialMatches: Match[];
  initialDate: string;
  initialError: string | null;
}

export function MatchView({
  initialMatches,
  initialDate,
  initialError,
}: MatchViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sport, setSport] = useState<Sport>("futbol");

  const currentDateParam = searchParams.get("date") ?? initialDate;
  const currentDate = parseDateParam(currentDateParam);

  const { matches, loading, error } = useMatches(
    currentDate,
    initialMatches,
    initialError,
  );

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

  const navigateDate = (offset: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + offset);
    const param = formatDateParam(next);
    router.push(`/?date=${param}`);
  };

  return (
    <div
      className="min-h-dvh bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.webp')" }}
    >
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-semibold text-gray-100 text-center mb-3 tracking-wide drop-shadow-md">
            Prosenos
          </h1>
          <SportTabs active={sport} onChange={setSport} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-3 p-5">
          <DateNavigator
            date={currentDate}
            onPrev={() => navigateDate(-1)}
            onNext={() => navigateDate(1)}
          />

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
              There are not matches for this date
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

function parseDateParam(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  if (day && month && year) {
    return new Date(year, month - 1, day);
  }
  return new Date();
}
