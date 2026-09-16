import { Match, MatchStatus, Team } from "@/types";
import { MatchTimeStatus } from "./MatchTimeStatus";
import { TeamDisplay } from "./TeamDisplay";
import { ScoreColumn } from "./ScoreColumn";
import "@/app/styles/match-card.css";

interface MatchCardProps {
  match: Match;
  status: MatchStatus;
  isLive: boolean;
  kickoff?: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScorers?: string[];
  awayScorers?: string[];
  showScore: boolean;
  homeScore?: number;
  awayScore?: number;
  hasAggregate?: boolean;
  aggHomeScore?: number;
  aggAwayScore?: number;
  hasPenalties?: boolean;
  homePenalties?: number;
  awayPenalties?: number;
}

export const MatchCard = ({
  match,
  status,
  isLive,
  kickoff,
  homeTeam,
  awayTeam,
  homeScorers,
  awayScorers,
  showScore,
  homeScore,
  awayScore,
  hasAggregate,
  aggHomeScore,
  aggAwayScore,
  hasPenalties,
  homePenalties,
  awayPenalties,
}: MatchCardProps) => {
  return (
    <article className={`match-card ${isLive ? "match-card-live" : ""}`}>
      <MatchTimeStatus
        status={status}
        kickoff={kickoff}
        minute={match.minute}
      />

      <div className="match-card-teams">
        <TeamDisplay team={homeTeam} scorers={homeScorers} align="right" />

        <ScoreColumn
          showScore={showScore}
          homeScore={homeScore}
          awayScore={awayScore}
          isLive={isLive}
          hasAggregate={hasAggregate}
          aggHomeScore={aggHomeScore}
          aggAwayScore={aggAwayScore}
          hasPenalties={hasPenalties}
          homePenalties={homePenalties}
          awayPenalties={awayPenalties}
        />

        <TeamDisplay team={awayTeam} scorers={awayScorers} align="left" />
      </div>
    </article>
  );
};
