import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire, Module } from "node:module";
import { JSDOM } from "jsdom";

const require = createRequire(import.meta.url);
const ts = require("typescript");

test("home static copy is marked for editing except the event section", async () => {
  const source = await readFile("src/components/FrenchHomePage.tsx", "utf8");
  const file = ts.createSourceFile("FrenchHomePage.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const uncovered = [];
  function visit(node, inMain = false, excluded = false) {
    if (ts.isJsxElement(node)) {
      const opening = node.openingElement;
      const tag = opening.tagName.getText(file);
      inMain ||= tag === "main";
      excluded ||= ["PreviewText", "PreviewDisabledButton", "Header", "Footer", "PartnerStrip"].includes(tag)
        || (tag === "section" && opening.attributes.properties.some((attribute) => attribute.name?.text === "id" && attribute.initializer?.text === "evenements"));
    }
    if (inMain && !excluded && ts.isJsxText(node) && /[\p{L}]{2}/u.test(node.text)) uncovered.push(node.text.trim());
    ts.forEachChild(node, (child) => visit(child, inMain, excluded));
  }
  visit(file);
  assert.deepEqual(uncovered, []);
});

test("preview saves text and switches between editing links and navigation", async () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: "http://localhost/" });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.HTMLElement = dom.window.HTMLElement;
  const previousFormData = globalThis.FormData;
  globalThis.FormData = dom.window.FormData;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const React = require("react");
  const { createRoot } = require("react-dom/client");
  const saved = [];
  const sourcePath = path.resolve("src/components/PreviewText.tsx");
  const source = await readFile(sourcePath, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
  const componentModule = new Module(sourcePath);
  componentModule.filename = sourcePath;
  componentModule.paths = Module._nodeModulePaths(path.dirname(sourcePath));
  const originalRequire = componentModule.require.bind(componentModule);
  componentModule.require = (id) => {
    if (id === "next/navigation") return { usePathname: () => "/" };
    if (id === "@/app/admin/actions") return { publishTextBlock: async (key, text) => { saved.push([key, text]); } };
    if (id === "@/lib/site-contact") return { SITE_CONTACT_TEXT_KEY: "global.contact", resolveSiteContact: (raw) => raw ? JSON.parse(raw) : { email: "default@example.com" } };
    return originalRequire(id);
  };
  componentModule._compile(output, sourcePath);
  const { PreviewTextProvider, PreviewText, PreviewModeButton, PreviewDisabledButton, useSiteContact, usePreviewTextValue } = componentModule.exports;
  const { renderToStaticMarkup } = require("react-dom/server");
  const publicMarkup = renderToStaticMarkup(React.createElement(PreviewTextProvider, {
    enabled: false, initialDrafts: { "home.hero.title": "Brouillon privé" }, published: { "home.hero.title": "Titre publié" }, shared: true,
  }, React.createElement("h1", null, React.createElement(PreviewText, { id: "home.hero.title" }, "Texte d’origine"))));
  assert.equal(publicMarkup, "<h1>Titre publié</h1>");
  assert.doesNotMatch(publicMarkup, /Brouillon privé/);
  const disabledButton = renderToStaticMarkup(React.createElement(PreviewTextProvider, {
    enabled: false, initialDrafts: {}, published: {}, shared: false,
  }, React.createElement(PreviewDisabledButton, { id: "home.newsletter.submit" }, "Envoyer")));
  assert.equal(disabledButton, '<button type="button" disabled="">Envoyer</button>');
  const ContactValue = () => React.createElement("span", null, useSiteContact().email);
  const contactDraft = JSON.stringify({ email: "draft@example.com" });
  const contactPublished = JSON.stringify({ email: "published@example.com" });
  const renderContact = (enabled) => renderToStaticMarkup(React.createElement(PreviewTextProvider, {
    enabled, initialDrafts: { "global.contact": contactDraft }, published: { "global.contact": contactPublished }, shared: true,
  }, React.createElement(ContactValue)));
  assert.equal(renderContact(false), "<span>published@example.com</span>");
  assert.equal(renderContact(true), "<span>draft@example.com</span>");
  const TeamName = () => React.createElement("span", null, usePreviewTextValue("about.team.0.name", "Ancien nom"));
  const renderTeam = (enabled) => renderToStaticMarkup(React.createElement(PreviewTextProvider, {
    enabled, initialDrafts: { "about.team.0.name": "Nom en brouillon" }, published: { "about.team.0.name": "Nom publié" }, shared: true,
  }, React.createElement(TeamName)));
  assert.equal(renderTeam(false), "<span>Nom publié</span>");
  assert.equal(renderTeam(true), "<span>Nom en brouillon</span>");
  const teamImagePath = path.resolve("src/components/AboutTeamImage.tsx");
  const teamImageSource = await readFile(teamImagePath, "utf8");
  const teamImageModule = new Module(teamImagePath);
  teamImageModule.filename = teamImagePath;
  teamImageModule.paths = Module._nodeModulePaths(path.dirname(teamImagePath));
  const teamRequire = teamImageModule.require.bind(teamImageModule);
  teamImageModule.require = (id) => {
    if (id === "./PreviewText") return componentModule.exports;
    if (id === "./SiteImage") return { SiteImage: ({ alt }) => React.createElement("img", { alt }) };
    return teamRequire(id);
  };
  teamImageModule._compile(ts.transpileModule(teamImageSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText, teamImagePath);
  const teamImage = renderToStaticMarkup(React.createElement(PreviewTextProvider, {
    enabled: true, initialDrafts: { "about.team.0.name": "Nouveau nom", "about.team.0.role": "Monitrice" }, published: {}, shared: false,
  }, React.createElement(teamImageModule.exports.AboutTeamImage, { image: "/photo.jpg", name: "Ancien nom", role: "Moniteur", index: 0, english: false })));
  assert.match(teamImage, /alt="Nouveau nom, Monitrice chez Corail Plongée"/);
  const blogLinksPath = path.resolve("src/components/BlogArticleLinks.tsx");
  const blogLinksSource = await readFile(blogLinksPath, "utf8");
  const blogLinksModule = new Module(blogLinksPath);
  blogLinksModule.filename = blogLinksPath;
  blogLinksModule.paths = Module._nodeModulePaths(path.dirname(blogLinksPath));
  const blogLinksRequire = blogLinksModule.require.bind(blogLinksModule);
  blogLinksModule.require = (id) => {
    if (id === "./PreviewText") return componentModule.exports;
    if (id === "next/link") return { __esModule: true, default: ({ children, ...props }) => React.createElement("a", props, children) };
    return blogLinksRequire(id);
  };
  blogLinksModule._compile(ts.transpileModule(blogLinksSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText, blogLinksPath);
  const blogLinks = renderToStaticMarkup(React.createElement(PreviewTextProvider, {
    enabled: false, initialDrafts: {}, published: { "article./article/.title": "Titre corrigé" }, shared: true,
  }, React.createElement(React.Fragment, null,
    React.createElement(blogLinksModule.exports.BlogArticleImageLink, { href: "/article/", title: "Ancien titre" }, "Image"),
    React.createElement(blogLinksModule.exports.BlogArticleEmailLink, { path: "/article/", title: "Ancien titre", url: "https://example.org/article/" }, "Partager"),
  )));
  assert.match(blogLinks, /aria-label="Titre corrigé"/);
  assert.match(blogLinks, /subject=Titre%20corrig%C3%A9/);
  const root = createRoot(document.getElementById("root"));
  try {
    await React.act(async () => root.render(React.createElement(PreviewTextProvider, { enabled: true, initialDrafts: {}, published: {}, shared: true },
      React.createElement(PreviewModeButton),
      React.createElement("h1", null, React.createElement(PreviewText, { id: "home.hero.title" }, "Corail Plongée")),
      React.createElement("p", { id: "repeated" }, React.createElement(PreviewText, { id: "home.hero.title" }, "Corail Plongée")),
      React.createElement("a", { href: "/test" }, React.createElement(PreviewText, { id: "home.link", embedded: true }, "Découvrir")),
    )));
    await React.act(async () => document.querySelector("h1 span").dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true })));
    const textarea = document.querySelector("textarea");
    assert.ok(textarea);
    assert.equal(textarea.maxLength, 100);
    await React.act(async () => {
      Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set.call(textarea, "Nouveau titre");
      textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    });
    const save = [...document.querySelectorAll("button")].find((button) => button.textContent === "Valider et mettre en ligne");
    await React.act(async () => save.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true })));
    assert.deepEqual(saved, [["home.hero.title", "Nouveau titre"]]);
    assert.equal(document.querySelector("h1").textContent, "Nouveau titre");
    assert.equal(document.querySelector("#repeated").textContent, "Nouveau titre");
    await React.act(async () => document.querySelector("h1 span").click());
    const secondEditor = document.querySelector("textarea");
    await React.act(async () => {
      Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set.call(secondEditor, "Titre corrigé");
      secondEditor.dispatchEvent(new window.Event("input", { bubbles: true }));
    });
    await React.act(async () => [...document.querySelectorAll("button")].find((button) => button.textContent === "Valider et mettre en ligne").click());
    assert.deepEqual(saved.at(-1), ["home.hero.title", "Titre corrigé"]);
    assert.equal(document.querySelector("#repeated").textContent, "Titre corrigé");
    const link = document.querySelector('a[href="/test"]');
    await React.act(async () => link.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true })));
    assert.ok(document.querySelector('[role="dialog"]'));
    assert.equal(document.querySelector("textarea").maxLength, 80);
    await React.act(async () => [...document.querySelectorAll("button")].find((button) => button.textContent === "Annuler").click());
    await React.act(async () => [...document.querySelectorAll("button")].find((button) => button.textContent === "Passer en navigation").click());
    let navigated = false;
    link.addEventListener("click", (event) => { navigated = true; event.preventDefault(); });
    await React.act(async () => link.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true })));
    assert.equal(navigated, true);
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.equal(document.querySelector("h1").textContent, "Titre corrigé");
  } finally {
    await React.act(async () => root.unmount());
    dom.window.close();
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.HTMLElement;
    globalThis.FormData = previousFormData;
    delete globalThis.IS_REACT_ACT_ENVIRONMENT;
  }
});
