import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire, Module } from "node:module";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");

test("conditions use shared values while preserving an existing customized paragraph", async () => {
  const filename = path.resolve("src/components/ReunionConditionsText.tsx");
  const source = await readFile(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  const pageModule = new Module(filename);
  pageModule.filename = filename;
  pageModule.paths = Module._nodeModulePaths(path.dirname(filename));
  let stored = {};
  const originalRequire = pageModule.require.bind(pageModule);
  pageModule.require = (id) => id === "./PreviewText" ? {
    PreviewText: ({ id, children }) => React.createElement(React.Fragment, null, stored[id] ?? children),
    usePreviewTextValue: (id, fallback) => stored[id] ?? fallback,
  } : originalRequire(id);
  pageModule._compile(output, filename);
  const render = () => renderToStaticMarkup(React.createElement(pageModule.exports.ReunionConditionsText));
  assert.match(render(), /possibles 365 jours par an, avec une température de l’eau qui évolue entre 24 et 30°, et une visibilité excellente\./);
  stored = { "reunion.facts.days.value": "300", "reunion.facts.temperature.value": "20–27°", "reunion.facts.visibility.value": "Bonne" };
  assert.match(render(), /possibles 300 jours par an, avec une température de l’eau qui évolue entre 20 et 27°, et une visibilité bonne\./);
  stored["ReunionDivingPage.cbf0a61c043a.1"] = "Paragraphe déjà personnalisé.";
  assert.equal(render(), "Paragraphe déjà personnalisé.");
});
