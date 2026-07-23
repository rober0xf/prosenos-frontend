import type { MatchStatus } from "../types";

interface StatusBadgeProps {
  status: MatchStatus;
  minute: number;
}

export const StatusBadge = ({ status, minute }: StatusBadgeProps) => {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-400 bg-red-900/40 px-1.5 py-0.5 rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        {minute}&#39;
      </span>
    );
  }

  if (status === "ET") {
    return (
      <span className="text-xs font-bold text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">
        ET
      </span>
    );
  }

  if (status === "finished") {
    return (
      <span className="text-xs font-bold text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">
        Final
      </span>
    );
  }

  if (status === "postponed") {
    return (
      <span className="text-xs font-bold text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">
        Postponed
      </span>
    );
  }

  return null;
};
