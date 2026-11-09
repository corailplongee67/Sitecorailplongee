"use client";

import { SiteImage } from "./SiteImage";
import { usePreviewTextValue } from "./PreviewText";

export function AboutTeamImage({ image, name, role, index, english }: { image: string; name: string; role: string; index: number; english: boolean }) {
  const displayedName = usePreviewTextValue(`about.team.${index}.name`, name);
  const displayedRole = usePreviewTextValue(`about.team.${index}.role`, role);
  return <SiteImage src={image} alt={`${displayedName}, ${displayedRole} ${english ? "at" : "chez"} Corail Plongée`} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" />;
}
