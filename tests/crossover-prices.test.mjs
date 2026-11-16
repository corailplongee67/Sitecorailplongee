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

test("passerelles show current catalog prices including cents and hide missing entries", async () => {
  const filename = path.resolve("src/components/CrossoverPage.tsx");
  const source = await readFile(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  const pageModule = new Module(filename);
  pageModule.filename = filename;
  pageModule.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = pageModule.require.bind(pageModule);
  const Empty = () => null;
  pageModule.require = (id) => {
    if (id === "./PreviewText") return { PreviewText: ({ children }) => React.createElement(React.Fragment, null, children) };
    if (id === "./SiteImage") return { SiteImage: Empty };
    if (id === "@/components/Header") return { Header: Empty };
    if (id === "@/components/Footer") return { Footer: Empty };
    if (id === "lucide-react") return { ArrowUpRight: Empty };
    return originalRequire(id);
  };
  pageModule._compile(output, filename);
  const page = new JSDOM(renderToStaticMarkup(React.createElement(pageModule.exports.CrossoverPage, {
    bookingLinks: { agenda: "/agenda", gift_dive: "/gift", customer_account: "/account", french_training_booking: "/book", ssi_booking: "/ssi", main_booking: "/book", shop: "/shop" },
    prices: [{ section_code: "bridges", content_key: "bridge-ssi-level-2", label_fr: "Passerelle personnalisée", amount_cents: 14750 }],
  }))).window.document;
  assert.equal(page.querySelectorAll(".crossover-origin-card").length, 1);
  assert.match(page.querySelector(".crossover-origin-price").textContent, /147,50\s*€/);
  assert.equal(page.querySelector(".crossover-origin-card h3").textContent, "Passerelle personnalisée");
});
