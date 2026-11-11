"use client";

import { formatEnglishOpeningHours } from "@/lib/opening-hours";
import { useSharedTextValue } from "./PreviewText";

export function OpeningHoursText({ id, fallback }: { id: string; fallback: string }) {
  return <>{formatEnglishOpeningHours(useSharedTextValue(id, fallback))}</>;
}
