import { test } from "node:test";
import assert from "node:assert/strict";
import { initialTeam, parseTeam, validateTeam } from "../src/lib/team.ts";

test("team members keep stable identifiers when reordered", () => {
  const reordered = validateTeam([initialTeam[2], initialTeam[0]]);
  assert.deepEqual(reordered.map((member) => member.id), ["2", "0"]);
  assert.equal(parseTeam("[]").length, 0);
  assert.equal(parseTeam(undefined).length, 4);
  assert.throws(() => validateTeam([initialTeam[0], initialTeam[0]]));
  assert.throws(() => validateTeam([{ ...initialTeam[0], image: "https://example.com/picture.jpg" }]));
});
