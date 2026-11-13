import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire, Module } from "node:module";
import { JSDOM } from "jsdom";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

async function compile(file, mocks) {
  const filename = path.resolve(file);
  const source = await readFile(filename, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  const compiledModule = new Module(filename);
  compiledModule.filename = filename;
  compiledModule.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = compiledModule.require.bind(compiledModule);
  compiledModule.require = (id) => Object.hasOwn(mocks, id) ? mocks[id] : originalRequire(id);
  compiledModule._compile(output, filename);
  return compiledModule.exports;
}

test("shared contact keeps display, call, email and map links aligned", async () => {
  const original = { address: "Ancienne adresse", phoneDisplay: "+262 262 24 37 25", email: "info@example.com" };
  const util = await compile("src/lib/site-contact.ts", { "./site-data": { contact: original } });
  const changed = util.validateSiteContact({ address: "12 rue du Port, La Réunion", phone: "+262 692 12 34 56", email: "accueil+test@example.com" });
  assert.throws(() => util.validateSiteContact({ ...changed, email: "a@example.com?subject=bad" }));
  assert.throws(() => util.validateSiteContact({ ...changed, phone: "12" }));
  assert.deepEqual(util.resolveSiteContact(JSON.stringify(changed)), changed);
  assert.deepEqual(util.resolveSiteContact("invalid"), util.defaultSiteContact);
  const components = await compile("src/components/SiteContact.tsx", { "@/lib/site-contact": util, "./PreviewText": { useSiteContact: () => changed, PreviewText: ({ children }) => children } });
  const markup = renderToStaticMarkup(React.createElement("div", null,
    React.createElement(components.FooterContact),
    React.createElement(components.FooterLocation, { english: false }),
    React.createElement(components.ContactDetails, { english: false }),
    React.createElement(components.ContactMap, { english: false }),
    React.createElement(components.ContactEmailLink, null, "Écrire"),
  ));
  const document = new JSDOM(markup).window.document;
  assert.equal(document.querySelectorAll('a[href="tel:+262692123456"]').length, 2);
  assert.equal(document.querySelectorAll('a[href="mailto:accueil%2Btest@example.com"]').length, 3);
  assert.equal(document.querySelectorAll('a[href*="12%20rue%20du%20Port"]').length, 2);
  assert.match(document.querySelector("iframe").src, /12%20rue%20du%20Port/);
  assert.match(document.body.textContent, /12 rue du Port, La Réunion/);
  assert.equal(document.querySelector("div > span").textContent, changed.address);
  const defaults = await compile("src/components/SiteContact.tsx", { "@/lib/site-contact": util, "./PreviewText": { useSiteContact: () => util.defaultSiteContact, PreviewText: ({ children }) => children } });
  assert.equal(renderToStaticMarkup(React.createElement(defaults.FooterLocation, { english: false })), "<span>Port de Saint-Gilles · Île de La Réunion</span>");
  const labels = { "contact.details.address-label": "Nous trouver", "contact.details.phone-label": "Nous appeler", "contact.details.email-label": "Nous écrire" };
  const edited = await compile("src/components/SiteContact.tsx", { "@/lib/site-contact": util, "./PreviewText": { useSiteContact: () => changed, PreviewText: ({ id, children }) => labels[id] ?? children } });
  const editedDocument = new JSDOM(renderToStaticMarkup(React.createElement(edited.ContactDetails, { english: false }))).window.document;
  assert.equal(editedDocument.querySelector('a[href="tel:+262692123456"] strong').textContent, "Nous appeler");
  assert.equal(editedDocument.querySelector('a[href="mailto:accueil%2Btest@example.com"] strong').textContent, "Nous écrire");
  assert.match(editedDocument.body.textContent, /Nous trouver/);
});
