import assert from "node:assert/strict";
import test from "node:test";
import { nextAvailableEventSlug } from "../src/lib/event-slugs.ts";

test("keeps an unused event slug", () => {
  assert.equal(nextAvailableEventSlug("plongee-de-nuit", ["sortie-epave"]), "plongee-de-nuit");
});

test("adds the first available numeric suffix to a duplicate event slug", () => {
  assert.equal(
    nextAvailableEventSlug("plongee-de-nuit", ["plongee-de-nuit", "plongee-de-nuit-2", "plongee-de-nuit-4"]),
    "plongee-de-nuit-3",
  );
});

test("uses a stable fallback when a title cannot produce a slug", () => {
  assert.equal(nextAvailableEventSlug("", ["evenement"]), "evenement-2");
});
