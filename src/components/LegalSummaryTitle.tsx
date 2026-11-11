"use client";

import { usePreviewTextValue } from "./PreviewText";

export function LegalSummaryTitle({ id, title }: { id: string; title: string }) {
  const currentTitle = usePreviewTextValue(id, title);
  return <>{currentTitle.replace(/^\d+[.]?\s*/, "")}</>;
}
