"use client";

import { PreviewText, usePreviewTextValue } from "./PreviewText";

const originalNote = "Sur la côte sous le vent, les conditions de plongées sont idéales, possibles 365 jours par an, avec une température de l’eau qui évolue entre 24 et 30°, et une visibilité excellente.";

export function ReunionConditionsEyebrow() {
  const original = "365 jours de plongée";
  const existing = usePreviewTextValue("ReunionDivingPage.5dae7ae935f2.1", original);
  if (existing !== original) return <PreviewText id="ReunionDivingPage.5dae7ae935f2.1">{original}</PreviewText>;
  return <><PreviewText id="reunion.facts.days.value">365</PreviewText><PreviewText id="reunion.conditions.days-heading"> jours de plongée</PreviewText></>;
}

export function ReunionConditionsText() {
  const existing = usePreviewTextValue("ReunionDivingPage.cbf0a61c043a.1", originalNote);
  const days = usePreviewTextValue("reunion.facts.days.value", "365");
  const temperature = usePreviewTextValue("reunion.facts.temperature.value", "24–30°");
  const visibility = usePreviewTextValue("reunion.facts.visibility.value", "Excellente");

  // Preserve a paragraph already customized through the editor.
  if (existing !== originalNote) {
    return <PreviewText id="ReunionDivingPage.cbf0a61c043a.1">{originalNote}</PreviewText>;
  }

  const temperatureInSentence = temperature.replace(/\s*[–-]\s*/, " et ");
  return <>
    <PreviewText id="reunion.conditions.before-days">Sur la côte sous le vent, les conditions de plongées sont idéales, possibles </PreviewText>
    {days}
    <PreviewText id="reunion.conditions.before-temperature"> jours par an, avec une température de l’eau qui évolue entre </PreviewText>
    {temperatureInSentence}
    <PreviewText id="reunion.conditions.before-visibility">, et une visibilité </PreviewText>
    {visibility.toLocaleLowerCase("fr-FR")}.
  </>;
}
