import { Sport } from "@/types";
import "@/app/styles/sport-tabs.css";

interface SportTabsProps {
  active: Sport;
  onChange: (sport: Sport) => void;
}

export function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="sport-tabs" role="tablist" aria-label="sport">
      {/* Futbol tab */}
      <button
        type="button"
        role="tab"
        aria-selected={active === "futbol"}
        onClick={() => onChange("futbol")}
        className={`sport-tab ${active === "futbol" ? "active" : ""}`}
      >
        Futbol
      </button>

      {/* NBA tab */}
      <button
        type="button"
        role="tab"
        aria-selected={active === "nba"}
        onClick={() => onChange("nba")}
        className={`sport-tab ${active === "nba" ? "active" : ""}`}
      >
        NBA
      </button>
    </div>
  );
}
