import "@/app/styles/score-column.css";

interface ScoreColumnProps {
  showScore: boolean;
  homeScore?: number;
  awayScore?: number;
  isLive: boolean;
  hasAggregate?: boolean;
  aggHomeScore?: number;
  aggAwayScore?: number;
  hasPenalties?: boolean;
  homePenalties?: number;
  awayPenalties?: number;
}

export const ScoreColumn = ({
  showScore,
  homeScore,
  awayScore,
  isLive,
  hasAggregate,
  aggHomeScore,
  aggAwayScore,
  hasPenalties,
  homePenalties,
  awayPenalties,
}: ScoreColumnProps) => {
  return (
    <div
      className="score-column"
      aria-label={isLive ? "live match score" : "match score"}
    >
      <div
        className="score-column-main"
        aria-live={isLive ? "polite" : undefined}
      >
        {showScore ? (
          <span
            className="score-column-score"
            aria-label={`${homeScore} to ${awayScore}`}
          >
            <span
              className={`score-column-value ${
                isLive ? "score-column-value-live" : ""
              }`}
              aria-hidden="true"
            >
              {homeScore}
            </span>
            <span className="score-column-separator" aria-hidden="true">
              –
            </span>
            <span
              className={`score-column-value ${
                isLive ? "score-column-value-live" : ""
              }`}
              aria-hidden="true"
            >
              {awayScore}
            </span>
          </span>
        ) : (
          <span className="score-column-empty" aria-label="score unavailable">
            –
          </span>
        )}
      </div>

      {hasAggregate && (
        <p className="score-column-aggregate">
          <span className="sr-only">Aggregate score: </span>
          {aggHomeScore} – {aggAwayScore}
        </p>
      )}

      {hasPenalties && (
        <p className="score-column-penalties">
          <span className="sr-only">Penalty score: </span>
          {homePenalties} – {awayPenalties}
        </p>
      )}
    </div>
  );
};
