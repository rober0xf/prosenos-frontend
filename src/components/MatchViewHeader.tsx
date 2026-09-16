import { Sport } from "@/types";
import { SportTabs } from "./SportTabs";
import "@/app/styles/match-view-header.css";

interface MatchViewHeaderProps {
  sport: Sport;
  onSportChange: (sport: Sport) => void;
}

export const MatchViewHeader = ({
  sport,
  onSportChange,
}: MatchViewHeaderProps) => {
  return (
    <header className="match-header">
      <div className="match-header-content">
        <h1 className="match-title">Prosenos</h1>
        <SportTabs active={sport} onChange={onSportChange} />
      </div>
    </header>
  );
};
