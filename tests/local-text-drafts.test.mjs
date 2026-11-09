import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import path from "node:path";
import { createRequire, Module } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const sourcePath = path.resolve("src/lib/local-text-drafts.ts");

test("drafts stay local, reviews become stale after changes, and production writes are rejected", async () => {
  const source = (await readFile(sourcePath, "utf8")).replace('import "server-only";', "");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const compiledModule = new Module(sourcePath);
  compiledModule.filename = sourcePath;
  compiledModule.paths = Module._nodeModulePaths(path.dirname(sourcePath));
  const scopeSource = await readFile(path.resolve("src/lib/text-draft-scope.ts"), "utf8");
  const scopeModule = new Module(path.resolve("src/lib/text-draft-scope.ts"));
  scopeModule._compile(ts.transpileModule(scopeSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, scopeModule.id);
  const originalRequire = compiledModule.require.bind(compiledModule);
  compiledModule.require = (id) => id === "./text-draft-scope" ? scopeModule.exports : originalRequire(id);
  const temp = await mkdtemp(path.join(tmpdir(), "corail-drafts-"));
  const previousCwd = process.cwd();
  const previousEnv = process.env.NODE_ENV;
  try {
    process.chdir(temp);
    process.env.NODE_ENV = "development";
    compiledModule._compile(compiled, sourcePath);
    await compiledModule.exports.writeLocalTextDraft("page.title", "Bonjour");
    await assert.rejects(compiledModule.exports.writeLocalTextDraft("EventsPage.title", "Interdit"));
    const eventKey = "EventsPage.title";
    const eventFile = path.join(temp, ".local-data", "text-drafts", `${createHash("sha256").update(eventKey).digest("hex")}.json`);
    await writeFile(eventFile, JSON.stringify({ id: eventKey, text: "Ancien essai" }));
    assert.deepEqual(await compiledModule.exports.readLocalTextDrafts(), { "page.title": "Bonjour" });
    await assert.rejects(compiledModule.exports.requestLocalTextReview({ "page.title": "Ancienne version" }), /ont changé/);
    await compiledModule.exports.requestLocalTextReview({ "page.title": "Bonjour" });
    assert.equal((await compiledModule.exports.readLocalTextReview()).current, true);
    await compiledModule.exports.writeLocalTextDraft("page.title", "Nouveau texte");
    assert.equal((await compiledModule.exports.readLocalTextReview()).current, false);
    await compiledModule.exports.writeLocalTextDraft("page.title", null);
    assert.deepEqual(await compiledModule.exports.readLocalTextDrafts(), {});
    await assert.rejects(compiledModule.exports.requestLocalTextReview({}));
    const invalidFile = path.join(temp, ".local-data", "text-drafts", `${"a".repeat(64)}.json`);
    await writeFile(invalidFile, "not json");
    await assert.rejects(compiledModule.exports.requestLocalTextReview({}));
    await rm(invalidFile);
    process.env.NODE_ENV = "production";
    await assert.rejects(compiledModule.exports.writeLocalTextDraft("page.title", "Interdit"));
  } finally {
    process.chdir(previousCwd);
    if (previousEnv === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = previousEnv;
    await rm(temp, { recursive: true, force: true });
  }
});
