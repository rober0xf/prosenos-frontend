import Image from "next/image";
import { Team } from "@/types";
import { cleanLogoPath } from "@/utils/cleanLogoName";
import "@/app/styles/team-display.css";

interface TeamDisplayProps {
  team: Team;
  scorers?: string[];
  align: "left" | "right";
}

export const TeamDisplay = ({
  team,
  scorers = [],
  align,
}: TeamDisplayProps) => {
  const isRight = align === "right";

  return (
    <section
      className={`team-display ${
        isRight ? "team-display-right" : "team-display-left"
      }`}
      aria-label={`${team.name} team`}
    >
      <div
        className={`team-display-identity ${
          isRight ? "team-display-identity-right" : "team-display-identity-left"
        }`}
      >
        {isRight && (
          <span className="team-display-name team-display-name-right">
            {team.name}
          </span>
        )}

        <Image
          src={cleanLogoPath(team.name)}
          alt=""
          width={20}
          height={20}
          className="team-display-logo"
        />

        {!isRight && <span className="team-display-name">{team.name}</span>}
      </div>

      {scorers.length > 0 && (
        <ul
          className={`team-display-scorers ${
            isRight ? "team-display-scorers-right" : "team-display-scorers-left"
          }`}
          aria-label="scorers"
        >
          {scorers.map((scorer, index) => (
            <li
              key={`${scorer}-${index}`}
              className={`team-display-scorer ${
                isRight ? "team-display-scorer-right" : ""
              }`}
            >
              {scorer}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
