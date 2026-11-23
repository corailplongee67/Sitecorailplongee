"use client";

import { initialTeam, parseTeam, TEAM_TEXT_KEY } from "@/lib/team";
import { AboutTeamImage } from "./AboutTeamImage";
import { PreviewText, useSharedTextValue } from "./PreviewText";

export function TeamGrid({ english = false }: { english?: boolean }) {
  const raw = useSharedTextValue(TEAM_TEXT_KEY, JSON.stringify(initialTeam));
  const members = parseTeam(raw);
  return <div className="about-origin-team-grid">{members.map((member) => <article className="about-origin-team-card" key={member.id}>
    <div className="about-origin-team-image"><AboutTeamImage image={member.image} name={member.name} role={member.role} index={member.textKey ?? member.id} english={english} /></div>
    <div><h3><PreviewText id={`about.team.${member.textKey ?? member.id}.name`}>{member.name}</PreviewText></h3><p><PreviewText id={`about.team.${member.textKey ?? member.id}.role`}>{member.role}</PreviewText></p></div>
  </article>)}</div>;
}
