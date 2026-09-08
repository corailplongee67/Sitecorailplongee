alter table public.events
  add column if not exists excerpt_fr text not null default '',
  add column if not exists excerpt_en text not null default '',
  add column if not exists location_fr text not null default 'Saint-Gilles-les-Bains',
  add column if not exists location_en text not null default 'Saint-Gilles-les-Bains',
  add column if not exists cover_image_url text,
  add column if not exists title_color text not null default '#ffb000',
  add column if not exists text_color text not null default '#ffffff',
  add column if not exists card_color_start text not null default '#052b43',
  add column if not exists card_color_end text not null default '#0b6078';

alter table public.events
  add constraint events_cover_image_url_https
    check (cover_image_url is null or cover_image_url ~ '^https://'),
  add constraint events_title_color_hex
    check (title_color ~ '^#[0-9a-fA-F]{6}$'),
  add constraint events_text_color_hex
    check (text_color ~ '^#[0-9a-fA-F]{6}$'),
  add constraint events_card_color_start_hex
    check (card_color_start ~ '^#[0-9a-fA-F]{6}$'),
  add constraint events_card_color_end_hex
    check (card_color_end ~ '^#[0-9a-fA-F]{6}$');

grant select on table public.events to anon, authenticated;
grant insert, update, delete on table public.events to authenticated;
