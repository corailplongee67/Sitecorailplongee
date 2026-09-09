export function nextAvailableEventSlug(candidate: string, existingSlugs: Iterable<string | null | undefined>) {
  const base = candidate || "evenement";
  const used = new Set(
    [...existingSlugs]
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => slug.toLowerCase()),
  );

  if (!used.has(base.toLowerCase())) return base;

  let suffix = 2;
  while (used.has(`${base}-${suffix}`.toLowerCase())) suffix += 1;
  return `${base}-${suffix}`;
}
