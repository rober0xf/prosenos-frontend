"use client";

import { formatDateParam } from "@/api/helpers";
import { Match, Sport } from "@/types";
import { groupMatchesByLeague, parseDateParam } from "@/utils/matches";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MatchViewHeader } from "./MatchViewHeader";
import { DateNavigator } from "./DateNavigator";
import { MatchResult } from "./MatchResult";
import "@/app/styles/match-view.css";

interface MatchViewProps {
  initialMatches: Match[];
  initialDate: string;
  initialError: string | null;
}

export const MatchView = ({
  initialMatches,
  initialDate,
  initialError,
}: MatchViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sport, setSport] = useState<Sport>("futbol");

  const currentDateParam = searchParams.get("date") ?? initialDate;
  const currentDate = parseDateParam(currentDateParam);

  const grouped = useMemo(
    () => groupMatchesByLeague(initialMatches, sport),
    [initialMatches, sport],
  );

  const navigateDate = (offset: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + offset);
    router.push(`/?date=${formatDateParam(next)}`);
  };

  return (
    <div className="match-view">
      <MatchViewHeader sport={sport} onSportChange={setSport} />

      <main className="match-main">
        <div className="match-content">
          <DateNavigator
            date={currentDate}
            onPrev={() => navigateDate(-1)}
            onNext={() => navigateDate(1)}
          />
          <MatchResult loading={false} error={initialError} grouped={grouped} />
        </div>
      </main>
    </div>
  );
};
