import { MatchStatus } from "@/types";
import { StatusBadge } from "./StatusBadge";
import "@/app/styles/match-time-status.css";

interface MatchTimeStatusProps {
  status: MatchStatus;
  kickoff?: string;
  minute: number;
}

export const MatchTimeStatus = ({
  status,
  kickoff,
  minute,
}: MatchTimeStatusProps) => {
  return (
    <div className="match-time-status">
      {status === "scheduled" ? (
        <span className="match-time-status-kickoff">{kickoff ?? "—"}</span>
      ) : (
        <StatusBadge status={status} minute={minute} />
      )}
    </div>
  );
};
