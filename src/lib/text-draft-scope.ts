// Event content remains under its existing dedicated administration workflow.
export function isExcludedEventTextKey(id: string) {
  return id.startsWith("events.") || id.startsWith("EventsPage.") || id.startsWith("EventDetailPage.") || id.startsWith("home.events.") || [
    "FrenchHomePage.rich.a5dff32d247c.1",
    "FrenchHomePage.link.7fff04a217a8.1",
    "FrenchHomePage.link.f849287da0ac.1",
    "navigation./evenements/",
  ].includes(id);
}

export function sameTextDrafts(expected: unknown, actual: Record<string, string>) {
  if (!expected || typeof expected !== "object" || Array.isArray(expected)) return false;
  const entries = Object.entries(expected);
  if (entries.some(([key, value]) => !key || key.length > 500 || typeof value !== "string" || value.length > 5000 || isExcludedEventTextKey(key))) return false;
  const actualEntries = Object.entries(actual);
  return entries.length === actualEntries.length && entries.every(([key, value]) => Object.hasOwn(actual, key) && actual[key] === value);
}
