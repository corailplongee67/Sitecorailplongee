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

test("opening hours use the same editable values on the contact and about pages", async () => {
  const values = { "global.hours.weekdays": "8h à 18h", "global.hours.sunday": "8h à 13h" };
  const Empty = () => null;
  const Link = ({ children }) => React.createElement("a", null, children);
  const hoursPath = path.resolve("src/lib/opening-hours.ts");
  const hoursSource = await readFile(hoursPath, "utf8");
  const hoursModule = new Module(hoursPath);
  hoursModule.filename = hoursPath;
  hoursModule.paths = Module._nodeModulePaths(path.dirname(hoursPath));
  hoursModule._compile(ts.transpileModule(hoursSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, hoursPath);
  const formatHours = hoursModule.exports.formatEnglishOpeningHours;
  assert.equal(formatHours("7h30 à 16h30"), "7.30am to 4.30pm");
  assert.equal(formatHours("8h à 12h"), "8am to 12pm");
  assert.equal(formatHours("sur rendez-vous"), "sur rendez-vous");
  assert.equal(formatHours("29h à 99h"), "29h à 99h");
  async function load(name) {
    const filename = path.resolve(`src/components/${name}.tsx`);
    const source = await readFile(filename, "utf8");
    const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    const componentModule = new Module(filename);
    componentModule.filename = filename;
    componentModule.paths = Module._nodeModulePaths(path.dirname(filename));
    const originalRequire = componentModule.require.bind(componentModule);
    componentModule.require = (id) => {
      if (id === "./PreviewText") return { PreviewText: ({ id: key, children }) => React.createElement(React.Fragment, null, values[key] ?? children) };
      if (id === "./OpeningHoursText") return { OpeningHoursText: ({ id: key, fallback }) => formatHours(values[key] ?? fallback) };
      if (id === "./SiteImage") return { SiteImage: Empty };
      if (id === "./AboutTeamImage") return { AboutTeamImage: Empty };
      if (id === "./SiteContact") return { ContactDetails: Empty, ContactMap: Empty };
      if (id === "@/components/Header") return { Header: Empty };
      if (id === "@/components/Footer") return { Footer: Empty, PartnerStrip: Empty };
      if (id === "next/link") return { __esModule: true, default: Link };
      if (id === "lucide-react") return { ArrowUpRight: Empty, Clock3: Empty };
      return originalRequire(id);
    };
    componentModule._compile(output, filename);
    return componentModule.exports[name];
  }
  const props = { bookingLinks: { agenda: "#", gift_dive: "#", customer_account: "#", shop: "#" } };
  for (const name of ["AboutPage", "ContactPage"]) {
    const Page = await load(name);
    const text = new JSDOM(renderToStaticMarkup(React.createElement(Page, props))).window.document.body.textContent;
    assert.match(text, /8h à 18h/);
    assert.match(text, /8h à 13h/);
    const englishText = new JSDOM(renderToStaticMarkup(React.createElement(Page, { ...props, locale: "en" }))).window.document.body.textContent;
    assert.match(englishText, /8am to 6pm/);
    assert.match(englishText, /8am to 1pm/);
  }
});
