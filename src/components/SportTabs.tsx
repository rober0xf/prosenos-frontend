import type { Sport } from "../types";

interface SportTabsProps {
  active: Sport;
  onChange: (sport: Sport) => void;
}

export function SportTabs({ active, onChange }: SportTabsProps) {
  return (
    <div className="flex gap-6 w-fit mx-auto px-2">
      {/* Futbol tab */}
      <button
        onClick={() => onChange("futbol")}
        className={`px-2 py-2 text-sm font-bold border-b-2 transition-all duration-200 cursor-pointer ${
          active === "futbol"
            ? "border-[#FCBF49] text-gray-900"
            : "border-[#E5A922]/30 text-gray-500 hover:border-[#E5A922] hover:text-gray-700"
        }`}
      >
        Futbol
      </button>

      {/* NBA tab */}
      <button
        onClick={() => onChange("nba")}
        className={`px-2 py-2 text-sm font-bold border-b-2 transition-all duration-200 cursor-pointer ${
          active === "nba"
            ? "border-[#FCBF49] text-gray-900"
            : "border-[#E5A922]/30 text-gray-500 hover:border-[#E5A922] hover:text-gray-700"
        }`}
      >
        NBA
      </button>
    </div>
  );
}
