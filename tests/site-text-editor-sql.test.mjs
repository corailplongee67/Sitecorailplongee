import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

test("text reviews protect private drafts and only publish the validated version", async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth;
      create table auth.users(id uuid primary key);
      insert into auth.users values ('11111111-1111-1111-1111-111111111111');
      create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb, '{}'::jsonb) $$;
      create function auth.uid() returns uuid language sql stable as $$ select nullif(auth.jwt()->>'sub', '')::uuid $$;
      grant usage on schema auth to anon, authenticated;
      grant execute on all functions in schema auth to anon, authenticated;`);
    await db.exec(await readFile("supabase/migrations/20261104075555_site_text_editor.sql", "utf8"));
    const user = "11111111-1111-1111-1111-111111111111";
    const editor = JSON.stringify({ sub: user, app_metadata: { role: "admin" } });
    const publisher = JSON.stringify({ sub: user, app_metadata: { role: "admin", publish_site_texts: true } });
    const claims = async (value) => db.query("select set_config('request.jwt.claims', $1, false)", [value]);

    await db.exec("set role authenticated");
    await claims(editor);
    await db.exec("insert into public.site_text_drafts (text_key, content) values ('home.test', 'Brouillon')");
    await assert.rejects(db.exec("insert into public.site_text_drafts (text_key, content) values ('events.title', 'Interdit')"));
    await assert.rejects(db.exec("insert into public.site_text_drafts (text_key, content) values ('global.contact', '{}')"));
    await assert.rejects(db.query("insert into public.site_text_drafts (text_key, content) values ('global.contact', $1)", [JSON.stringify({ address: "Port", phone: "123", email: "info@example.com" })]));
    const contact = JSON.stringify({ address: "Port, La Réunion", phone: "+262 262 24 37 25", email: "info@example.com" });
    await db.query("insert into public.site_text_drafts (text_key, content) values ('global.contact', $1)", [contact]);
    await assert.rejects(db.exec("insert into public.site_text_published (text_key, content) values ('home.test', 'Interdit')"));
    const review = await db.query("insert into public.site_text_reviews(snapshot) select jsonb_object_agg(text_key, content) from public.site_text_drafts returning id");
    const id = review.rows[0].id;
    await assert.rejects(db.query("select public.publish_site_text_review($1)", [id]));

    await claims(JSON.stringify({ sub: user, app_metadata: { role: "member" } }));
    assert.equal((await db.query("select count(*)::int as count from public.site_text_drafts")).rows[0].count, 0);
    await assert.rejects(db.exec("insert into public.site_text_drafts (text_key, content) values ('home.other', 'Interdit')"));
    await assert.rejects(db.query("select public.publish_site_text_review($1)", [id]));

    await claims(JSON.stringify({ app_metadata: { role: "admin", publish_site_texts: true } }));
    await assert.rejects(db.query("select public.publish_site_text_review($1)", [id]));

    await claims(publisher);
    await assert.rejects(db.exec("insert into public.site_text_published (text_key, content) values ('home.test', 'Interdit')"));
    await db.exec("update public.site_text_drafts set content = 'Modifié' where text_key = 'home.test'");
    await assert.rejects(db.query("select public.publish_site_text_review($1)", [id]));
    await db.exec("update public.site_text_drafts set content = 'Brouillon' where text_key = 'home.test'");
    await db.query("select public.publish_site_text_review($1)", [id]);
    assert.equal((await db.query("select count(*)::int as count from public.site_text_drafts")).rows[0].count, 0);

    await db.exec("set role anon");
    await claims("{}");
    await assert.rejects(db.exec("select * from public.site_text_drafts"));
    await assert.rejects(db.exec("select * from public.site_text_reviews"));
    assert.equal((await db.query("select content from public.site_text_published where text_key = 'home.test'")).rows[0].content, "Brouillon");
    assert.deepEqual(JSON.parse((await db.query("select content from public.site_text_published where text_key = 'global.contact'")).rows[0].content), JSON.parse(contact));
  } finally {
    await db.close();
  }
});
