import { MatchStatus } from "@/types";
import "@/app/styles/status-badge.css";

interface StatusBadgeProps {
  status: MatchStatus;
  minute: number;
}

export const StatusBadge = ({ status, minute }: StatusBadgeProps) => {
  if (status === "live") {
    return (
      <span className="status-badge status-live">
        <span className="status-live-dot" aria-hidden="true" />
        {minute}&#39;
      </span>
    );
  }

  if (status === "ET") {
    return <span className="status-badge status-neutral">ET</span>;
  }

  if (status === "finished") {
    return <span className="status-badge status-neutral">Final</span>;
  }

  if (status === "postponed") {
    return <span className="status-badge status-neutral">Postponed</span>;
  }

  return null;
};
