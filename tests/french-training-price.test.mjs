import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire, Module } from "node:module";
import { JSDOM } from "jsdom";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");

test("French training prices follow the existing catalog across both placements", async () => {
  const filename = path.resolve("src/components/FrenchTrainingPage.tsx");
  const source = await readFile(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  const pageModule = new Module(filename);
  pageModule.filename = filename;
  pageModule.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = pageModule.require.bind(pageModule);
  const Empty = () => null;
  const Link = ({ children }) => React.createElement("a", null, children);
  pageModule.require = (id) => {
    if (id === "./PreviewText") return { PreviewText: ({ children }) => React.createElement(React.Fragment, null, children) };
    if (id === "./SiteImage") return { SiteImage: Empty };
    if (id === "next/link") return { __esModule: true, default: Link };
    if (id === "@/components/Header") return { Header: Empty };
    if (id === "@/components/Footer") return { Footer: Empty };
    if (id === "lucide-react") return { ArrowUpRight: Empty, Check: Empty };
    return originalRequire(id);
  };
  pageModule._compile(output, filename);
  const prices = [
    { content_key: "french-pe20", amount_cents: 43050 },
    { content_key: "french-level-2", amount_cents: 77500, prefix_fr: "À partir de ", suffix_fr: " / personne" },
    { content_key: "french-level-3-rifap", amount_cents: 90500 },
    { content_key: "french-level-3", amount_cents: 79500 },
    { content_key: "french-ffessm-licence", amount_cents: 6250 },
  ];
  const render = (locale, entries = prices) => new JSDOM(renderToStaticMarkup(React.createElement(pageModule.exports.FrenchTrainingPage, {
    bookingLinks: { agenda: "/agenda", gift_dive: "/gift", customer_account: "/account", french_training_booking: "/book" }, prices: entries, locale,
  }))).window.document;
  const page = render("fr");
  assert.match(page.querySelector("#niveau-1 header strong").textContent, /430,50\s*€/);
  assert.match(page.querySelector("#niveau-1 .french-training-origin-level-details p strong").textContent, /430,50\s*€/);
  assert.match(page.querySelector("#niveau-2 header strong").textContent, /À partir de 775\s*€ \/ personne/);
  assert.match(page.querySelector("#niveau-3 header strong").textContent, /905\s*€/);
  assert.equal([...page.querySelectorAll(".french-training-origin-options p:first-child")].length, 4);
  for (const licence of page.querySelectorAll(".french-training-origin-options p:first-child")) assert.match(licence.textContent, /Licence 62,50€ pour le diplôme FFESSM \/ CMAS/);
  assert.match(render("en").querySelector("#niveau-3 header strong").textContent, /795/);
  assert.equal(render("fr", []).querySelector("#niveau-1 header strong"), null);
});
