import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

test("editing spans do not inherit styles reserved for section numbers or subtitles", async () => {
  const globals = await readFile("src/app/globals.css", "utf8");
  const design = await readFile("src/app/design-v2.css", "utf8");
  const rules = [
    [globals, ".discovery-origin-intro-title h2", '<div class="discovery-origin-intro-title"><h2><span class="preview-editable-text" id="edit">Titre</span><span id="original">Sous-titre</span></h2></div>'],
    [globals, ".ssi-origin-hero-copy", '<div class="ssi-origin-hero-copy"><h1><span class="preview-editable-text" id="edit">Titre</span></h1><span id="original">Sous-titre</span></div>'],
    [design, ".exploration-principle-options", '<div class="exploration-principle-options"><article><span id="original">01</span><h3><span class="preview-editable-text" id="edit">Titre</span></h3></article></div>'],
    [design, ".exploration-flow-steps", '<div class="exploration-flow-steps"><article><span id="original">01</span><p><span class="preview-editable-text" id="edit">Texte</span></p></article></div>'],
    [design, ".exploration-practical-facts", '<div class="exploration-practical-facts"><article><div><strong><span class="preview-editable-text" id="edit">Titre</span></strong><span id="original">Détail</span></div></article></div>'],
    [globals, ".shop-gateway-categories > div > span", '<div class="shop-gateway-categories"><div><span id="original"><b>01</b><span class="preview-editable-text" id="edit">Découverte</span></span></div></div>'],
  ];
  for (const [css, prefix, html] of rules) {
    const line = css.split("\n").find((entry) => entry.startsWith(prefix) && entry.includes("span") && entry.includes("{"));
    assert.ok(line, `Missing style for ${prefix}`);
    const selector = line.slice(0, line.indexOf("{")).trim();
    const doc = new JSDOM(html).window.document;
    assert.equal(doc.getElementById("original").matches(selector), true, `${selector} should style the original element`);
    assert.equal(doc.getElementById("edit").matches(selector), false, `${selector} should not restyle editable text`);
  }
});
