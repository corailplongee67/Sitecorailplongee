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

test("rates preserve cents in both price layouts and both languages", async () => {
  const filename = path.resolve("src/components/RatesPage.tsx");
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
    if (id === "./Header") return { Header: Empty };
    if (id === "./Footer") return { Footer: Empty };
    if (id === "./BookingCta") return { BookingCta: Empty };
    if (id === "lucide-react") return { ArrowRight: Empty, Check: Empty, Info: Empty };
    return originalRequire(id);
  };
  pageModule._compile(output, filename);
  const sections = [
    { code: "list", title_fr: "Liste", title_en: "List", layout: "list", booking_link_key: null },
    { code: "compare", title_fr: "Comparaison", title_en: "Comparison", layout: "comparison", booking_link_key: null },
  ];
  const base = { subcategory_fr: "", subcategory_en: "", label_fr: "Plongée", label_en: "Dive", prefix_fr: "", suffix_fr: "", prefix_en: "", suffix_en: "" };
  const prices = [
    { ...base, id: "one", section_code: "list", amount_cents: 1250 },
    { ...base, id: "two", section_code: "list", amount_cents: 1200 },
    { ...base, id: "three", section_code: "compare", price_column: "guided", amount_cents: 1250 },
  ];
  const props = { sections, prices, bookingLinks: { agenda: "#", gift_dive: "#", customer_account: "#", main_booking: "#" } };
  const render = (locale) => new JSDOM(renderToStaticMarkup(React.createElement(pageModule.exports.RatesPage, { ...props, locale }))).window.document;
  const french = render("fr");
  assert.match(french.querySelector("#list .rate-row b").textContent, /12,50\s*€/);
  assert.match(french.querySelector("#list .rate-row:nth-child(2) b").textContent, /12\s*€/);
  assert.match(french.querySelector("#compare .exploration-rate-row b").textContent, /12,50\s*€/);
  assert.match(render("en").querySelector("#list .rate-row b").textContent, /€12\.50/);
});
