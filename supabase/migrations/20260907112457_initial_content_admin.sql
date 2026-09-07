create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.booking_links (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z0-9_]+$'),
  label_fr text not null,
  label_en text not null,
  url text not null check (url ~ '^https://'),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug_fr text not null unique,
  slug_en text unique,
  title_fr text not null,
  title_en text not null,
  description_fr text not null default '',
  description_en text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz,
  image_paths text[] not null default '{}',
  booking_link_key text not null default 'agenda' references public.booking_links(key) on update cascade,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_dates_ordered check (ends_at is null or ends_at >= starts_at)
);

create table public.prices (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  label_fr text not null,
  label_en text not null,
  description_fr text,
  description_en text,
  amount_cents integer not null check (amount_cents >= 0),
  suffix_fr text,
  suffix_en text,
  booking_link_key text not null default 'main_booking' references public.booking_links(key) on update cascade,
  display_order integer not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create index events_published_starts_at_idx on public.events (starts_at) where published = true;
create index prices_active_order_idx on public.prices (display_order) where active = true;

create trigger booking_links_set_updated_at before update on public.booking_links
for each row execute function public.set_updated_at();
create trigger events_set_updated_at before update on public.events
for each row execute function public.set_updated_at();
create trigger prices_set_updated_at before update on public.prices
for each row execute function public.set_updated_at();

alter table public.booking_links enable row level security;
alter table public.events enable row level security;
alter table public.prices enable row level security;

create policy "booking links are publicly readable"
on public.booking_links for select
to anon, authenticated
using (true);

create policy "published events are publicly readable"
on public.events for select
to anon, authenticated
using (published = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "active prices are publicly readable"
on public.prices for select
to anon, authenticated
using (active = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins manage booking links"
on public.booking_links for all
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins manage events"
on public.events for all
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins manage prices"
on public.prices for all
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into public.booking_links (key, label_fr, label_en, url) values
  ('customer_account', 'Mon compte', 'My account', 'https://public.zuurit.com/corailplongee/login?redirect=billing'),
  ('agenda', 'Agenda', 'Calendar', 'https://public.zuurit.com/corailplongee/agenda'),
  ('main_booking', 'Réserver', 'Book', 'https://public.zuurit.com/corailplongee/booking'),
  ('shop', 'Boutique', 'Shop', 'https://public.zuurit.com/corailplongee/shop'),
  ('gift_dive', 'Offrir une plongée', 'Gift a dive', 'https://public.zuurit.com/corailplongee/shop'),
  ('discovery_booking', 'Réserver une découverte', 'Book a discovery dive', 'https://public.zuurit.com/corailplongee/booking'),
  ('ssi_booking', 'Réserver une formation SSI', 'Book SSI training', 'https://public.zuurit.com/corailplongee/shop'),
  ('french_training_booking', 'Réserver une formation française', 'Book French training', 'https://public.zuurit.com/corailplongee/booking'),
  ('cetacean_booking', 'Réserver une sortie cétacés', 'Book a cetacean excursion', 'https://public.zuurit.com/corailplongee/booking'),
  ('exploration_booking', 'Réserver une exploration', 'Book an exploration dive', 'https://public.zuurit.com/corailplongee/booking');

insert into public.prices (category, label_fr, label_en, amount_cents, booking_link_key, display_order) values
  ('Découverte', 'Baptême', 'Try dive', 8500, 'discovery_booking', 10),
  ('Découverte', 'Initiation 40 min · 2 personnes minimum', '40 min initiation · 2 people minimum', 12500, 'discovery_booking', 20),
  ('Découverte', 'Initiation et vie marine · 2 plongées', 'Initiation and marine life · 2 dives', 22000, 'discovery_booking', 30),
  ('Cétacés', 'Sortie cétacés · 3 h', 'Cetacean excursion · 3 hrs', 15000, 'cetacean_booking', 40),
  ('SSI', 'Open Water SSI · kit inclus · 7 plongées', 'SSI Open Water · kit included · 7 dives', 59500, 'ssi_booking', 50),
  ('Français', 'Niveau 1 · PE20 · 5 plongées', 'Level 1 · PE20 · 5 dives', 42500, 'french_training_booking', 60),
  ('Exploration', 'Exploration encadrée à l’unité', 'Single guided exploration dive', 6500, 'exploration_booking', 70),
  ('Exploration', 'Exploration autonome à l’unité', 'Single autonomous exploration dive', 4500, 'exploration_booking', 80);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-images', 'event-images', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "event images are publicly readable"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'event-images');

create policy "admins upload event images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'event-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "admins update event images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'event-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  bucket_id = 'event-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "admins delete event images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'event-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
