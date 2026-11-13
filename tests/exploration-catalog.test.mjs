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

test("exploration labels can change without disconnecting catalog counts", async () => {
  const filename = path.resolve("src/components/ExplorationPage.tsx");
  const source = await readFile(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  const pageModule = new Module(filename);
  pageModule.filename = filename;
  pageModule.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = pageModule.require.bind(pageModule);
  const Empty = () => null;
  const Link = ({ children }) => React.createElement("a", null, children);
  const edited = { "exploration.catalog.heading": "Nos formules", "exploration.catalog.guided": "avec guide", "exploration.catalog.autonomous": "en autonomie" };
  pageModule.require = (id) => {
    if (id === "./PreviewText") return { PreviewText: ({ id: key, children }) => React.createElement(React.Fragment, null, edited[key] ?? children) };
    if (id === "./SiteImage") return { SiteImage: Empty };
    if (id === "next/link") return { __esModule: true, default: Link };
    if (id === "@/components/Header") return { Header: Empty };
    if (id === "@/components/Footer") return { Footer: Empty };
    if (id === "lucide-react") return { ArrowRight: Empty, ArrowUpRight: Empty, Compass: Empty, MapPin: Empty, Waves: Empty };
    return originalRequire(id);
  };
  pageModule._compile(output, filename);
  const prices = [
    { section_code: "exploration", price_column: "guided" },
    { section_code: "exploration", price_column: "guided" },
    { section_code: "exploration", price_column: "autonomous" },
    { section_code: "other", price_column: "guided" },
  ];
  const props = { prices, bookingLinks: { agenda: "#", gift_dive: "#", customer_account: "#", exploration_booking: "#" } };
  const document = new JSDOM(renderToStaticMarkup(React.createElement(pageModule.exports.ExplorationPage, props))).window.document;
  const catalog = document.querySelector(".exploration-practical-catalog");
  assert.equal(catalog.querySelector("strong").textContent, "Nos formules");
  assert.equal(catalog.querySelector("span").textContent, "2 avec guide · 1 en autonomie");
});
