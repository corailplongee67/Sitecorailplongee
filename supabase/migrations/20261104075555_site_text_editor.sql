-- Shared contact details are stored as one value so all linked fields change together.
create schema site_text_private;
revoke all on schema site_text_private from public, anon;
grant usage on schema site_text_private to authenticated;

create function site_text_private.valid_contact(value text) returns boolean
language plpgsql immutable set search_path = '' as $$
declare
  item jsonb;
  address text;
  phone text;
  email text;
begin
  item := value::jsonb;
  if jsonb_typeof(item) is distinct from 'object' or jsonb_typeof(item->'address') is distinct from 'string'
     or jsonb_typeof(item->'phone') is distinct from 'string' or jsonb_typeof(item->'email') is distinct from 'string' then
    return false;
  end if;
  address := btrim(item->>'address');
  phone := btrim(item->>'phone');
  email := btrim(item->>'email');
  return length(address) between 1 and 300 and address !~ E'[\\r\\n]'
    and phone ~ '^([+]|00)?[0-9 .()/-]+$'
    and length(regexp_replace(phone, '[^0-9]', '', 'g')) between 8 and 15
    and length(email) <= 254 and email ~* '^[a-z0-9.!$%&''*+/=^_`{|}~-]+@[a-z0-9.-]+[.][a-z]{2,}$';
exception when others then
  return false;
end;
$$;
revoke all on function site_text_private.valid_contact(text) from public, anon;
grant execute on function site_text_private.valid_contact(text) to authenticated;

-- Published text and private drafts are separate so anonymous reads cannot expose drafts.
create table public.site_text_published (
  text_key text primary key check (length(text_key) between 1 and 500 and text_key !~ '^(events\.|EventsPage\.|EventDetailPage\.|home\.events\.)' and text_key not in ('FrenchHomePage.rich.a5dff32d247c.1', 'FrenchHomePage.link.7fff04a217a8.1', 'FrenchHomePage.link.f849287da0ac.1', 'navigation./evenements/')),
  content text not null check (length(content) between 1 and 5000 and (text_key <> 'global.contact' or site_text_private.valid_contact(content))),
  updated_at timestamptz not null default now()
);
create table public.site_text_drafts (
  text_key text primary key check (length(text_key) between 1 and 500 and text_key !~ '^(events\.|EventsPage\.|EventDetailPage\.|home\.events\.)' and text_key not in ('FrenchHomePage.rich.a5dff32d247c.1', 'FrenchHomePage.link.7fff04a217a8.1', 'FrenchHomePage.link.f849287da0ac.1', 'navigation./evenements/')),
  content text not null check (length(content) between 1 and 5000 and (text_key <> 'global.contact' or site_text_private.valid_contact(content))),
  updated_at timestamptz not null default now()
);
create table public.site_text_reviews (
  id uuid primary key default gen_random_uuid(),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object'),
  created_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references auth.users(id)
);

alter table public.site_text_published enable row level security;
alter table public.site_text_drafts enable row level security;
alter table public.site_text_reviews enable row level security;
revoke all on public.site_text_published, public.site_text_drafts, public.site_text_reviews from public, anon, authenticated;
grant select on public.site_text_published to anon, authenticated;
grant select, insert, update, delete on public.site_text_drafts to authenticated;
grant select, insert on public.site_text_reviews to authenticated;

create policy "published text is publicly readable" on public.site_text_published
  for select to anon, authenticated using (true);
create policy "admins read drafts" on public.site_text_drafts
  for select to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
create policy "admins insert drafts" on public.site_text_drafts
  for insert to authenticated with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
create policy "admins update drafts" on public.site_text_drafts
  for update to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
create policy "admins delete drafts" on public.site_text_drafts
  for delete to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
create policy "admins read text reviews" on public.site_text_reviews
  for select to authenticated using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
create policy "admins submit text reviews" on public.site_text_reviews
  for insert to authenticated with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin' and created_by = (select auth.uid()));

-- The privileged implementation is outside the exposed API schema. The wrapper
-- remains invoker-security and the implementation checks the caller's verified JWT.
-- Publish exactly the submitted snapshot, only if no draft changed afterwards.
create function site_text_private.publish_review(review_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  reviewed jsonb;
  current_drafts jsonb;
begin
  if (select auth.uid()) is null
     or ((select auth.jwt()) -> 'app_metadata' ->> 'role') is distinct from 'admin'
     or ((select auth.jwt()) -> 'app_metadata' ->> 'publish_site_texts') is distinct from 'true' then
    raise exception 'Publication non autorisée';
  end if;
  lock table public.site_text_drafts in share row exclusive mode;
  select snapshot into reviewed from public.site_text_reviews where id = review_id;
  select coalesce(jsonb_object_agg(text_key, content), '{}'::jsonb) into current_drafts from public.site_text_drafts;
  if reviewed is null or reviewed = '{}'::jsonb or reviewed <> current_drafts then
    raise exception 'Les brouillons ont changé depuis leur validation';
  end if;
  insert into public.site_text_published (text_key, content, updated_at)
    select key, value, now() from jsonb_each_text(reviewed)
    on conflict (text_key) do update set content = excluded.content, updated_at = excluded.updated_at;
  delete from public.site_text_drafts;
end;
$$;
revoke all on function site_text_private.publish_review(uuid) from public, anon;
grant execute on function site_text_private.publish_review(uuid) to authenticated;

create function public.publish_site_text_review(review_id uuid) returns void
language sql security invoker set search_path = '' as $$
  select site_text_private.publish_review(review_id);
$$;
revoke all on function public.publish_site_text_review(uuid) from public, anon;
grant execute on function public.publish_site_text_review(uuid) to authenticated;
