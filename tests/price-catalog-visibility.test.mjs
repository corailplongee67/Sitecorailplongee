import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire, Module } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

test("an empty active catalog stays empty instead of restoring hidden prices", async () => {
  const filename = path.resolve("src/lib/content-data.ts");
  const source = await readFile(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const compiled = new Module(filename);
  compiled.filename = filename;
  compiled.paths = Module._nodeModulePaths(path.dirname(filename));
  let result = { data: [], error: null };
  const query = { select() { return this; }, eq() { return this; }, order() { return Promise.resolve(result); } };
  const mocks = {
    "./site-data": {},
    "./pricing-data": { fallbackPriceCatalog: ["fallback-price"], fallbackPriceSections: ["fallback-section"] },
    "./events-data": {},
    "./supabase/server": { hasSupabaseEnv: () => true, createClient: async () => ({ from: () => query }) },
  };
  const originalRequire = compiled.require.bind(compiled);
  compiled.require = (id) => Object.hasOwn(mocks, id) ? mocks[id] : originalRequire(id);
  compiled._compile(output, filename);
  assert.deepEqual(await compiled.exports.getPriceCatalog(), { sections: [], prices: [] });
  result = { data: null, error: { message: "unavailable" } };
  assert.deepEqual(await compiled.exports.getPriceCatalog(), { sections: ["fallback-section"], prices: ["fallback-price"] });
});
