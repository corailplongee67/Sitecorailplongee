import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire, Module } from "node:module";
import { JSDOM } from "jsdom";
import { PGlite } from "@electric-sql/pglite";

const require = createRequire(import.meta.url);
const React = require("react");
const ts = require("typescript");

test("a published edit survives navigation and reload without changing another block", async () => {
  const db = new PGlite();
  const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: "http://localhost/" });
  const previous = { window: globalThis.window, document: globalThis.document, HTMLElement: globalThis.HTMLElement, act: globalThis.IS_REACT_ACT_ENVIRONMENT };
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.HTMLElement = dom.window.HTMLElement;
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  const { createRoot } = require("react-dom/client");
  let root;
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values ('11111111-1111-1111-1111-111111111111');
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb, '{}'::jsonb) $$;
      create function auth.uid() returns uuid language sql stable as $$ select nullif(auth.jwt()->>'sub', '')::uuid $$;
      grant usage on schema auth to anon, authenticated;
      grant execute on all functions in schema auth to anon, authenticated;`);
    await db.exec(await readFile("supabase/migrations/20261104075555_site_text_editor.sql", "utf8"));
    await db.exec(await readFile("supabase/migrations/20261109043836_publish_single_site_text.sql", "utf8"));
    await db.exec("set role authenticated");
    await db.query("select set_config('request.jwt.claims', $1, false)", [JSON.stringify({ sub: "11111111-1111-1111-1111-111111111111", app_metadata: { role: "admin" } })]);

    const filename = path.resolve("src/components/PreviewText.tsx");
    const source = await readFile(filename, "utf8");
    const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
    const compiled = new Module(filename);
    compiled.filename = filename;
    compiled.paths = Module._nodeModulePaths(path.dirname(filename));
    let pathname = "/";
    const originalRequire = compiled.require.bind(compiled);
    compiled.require = (id) => {
      if (id === "next/navigation") return { usePathname: () => pathname };
      if (id === "@/app/admin/actions") return { publishTextBlock: async (key, value) => db.query("select public.publish_single_site_text($1, $2)", [key, value]) };
      if (id === "@/lib/site-contact") return { SITE_CONTACT_TEXT_KEY: "global.contact", resolveSiteContact: () => ({}) };
      return originalRequire(id);
    };
    compiled._compile(output, filename);
    const { PreviewTextProvider, PreviewText } = compiled.exports;
    root = createRoot(document.getElementById("root"));
    const render = async (key, published, enabled) => React.act(async () => root.render(React.createElement(PreviewTextProvider, { key, enabled, initialDrafts: {}, published, shared: true },
      React.createElement("h1", null, React.createElement(PreviewText, { id: "shared.title" }, "Titre initial")),
      React.createElement("p", null, React.createElement(PreviewText, { id: "other.title" }, "Autre bloc")),
    )));
    await render("editor", {}, true);
    await React.act(async () => document.querySelector("h1 span").click());
    await React.act(async () => {
      const field = document.querySelector("textarea");
      Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set.call(field, "Titre enregistré");
      field.dispatchEvent(new window.Event("input", { bubbles: true }));
    });
    await React.act(async () => [...document.querySelectorAll("button")].find((button) => button.textContent === "Valider et mettre en ligne").click());
    assert.equal(document.querySelector("h1").textContent, "Titre enregistré");
    assert.equal(document.querySelector("p").textContent, "Autre bloc");
    const rows = await db.query("select text_key, content from public.site_text_published");
    const published = Object.fromEntries(rows.rows.map((row) => [row.text_key, row.content]));
    pathname = "/contactez-nous/";
    await render("another-page", published, true);
    assert.equal(document.querySelector("h1").textContent, "Titre enregistré");
    assert.equal(document.querySelector("p").textContent, "Autre bloc");
    await render("public-reload", published, false);
    assert.equal(document.querySelector("h1").textContent, "Titre enregistré");
    assert.equal(document.querySelector("p").textContent, "Autre bloc");
  } finally {
    if (root) await React.act(async () => root.unmount());
    dom.window.close();
    globalThis.window = previous.window;
    globalThis.document = previous.document;
    globalThis.HTMLElement = previous.HTMLElement;
    globalThis.IS_REACT_ACT_ENVIRONMENT = previous.act;
    await db.close();
  }
});
