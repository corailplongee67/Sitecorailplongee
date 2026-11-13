import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire, Module } from "node:module";
import { JSDOM } from "jsdom";
import { discoveryPackAmount } from "../src/lib/discovery-price.ts";

const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");

test("discovery pack shows the current catalog amount and hides it when unavailable", async () => {
  assert.equal(discoveryPackAmount([{ content_key: "discovery-marine-life", amount_cents: 23750 }]), 23750);
  assert.equal(discoveryPackAmount([{ content_key: "discovery-bapteme", amount_cents: 8500 }]), null);
  const filename = path.resolve("src/components/DiscoveryPage.tsx");
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
    if (id === "lucide-react") return { ArrowUpRight: Empty, Check: Empty };
    return originalRequire(id);
  };
  pageModule._compile(output, filename);
  const render = (amount, locale = "fr") => new JSDOM(renderToStaticMarkup(React.createElement(pageModule.exports.DiscoveryPage, {
    bookingLinks: { agenda: "/agenda", gift_dive: "/gift", customer_account: "/account", discovery_booking: "/book" },
    packAmountCents: amount,
    locale,
  }))).window.document;
  assert.match(render(23750).querySelector(".discovery-origin-pack-price strong").textContent, /237,50\s*€/);
  assert.equal(render(null).querySelector(".discovery-origin-pack-price"), null);
  assert.match(render(null, "en").querySelector(".discovery-origin-after-copy").textContent, /cannot begin their first level of diving at age 8/);
});
