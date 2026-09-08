create table public.price_sections (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[a-z0-9_]+$'),
  title_fr text not null,
  title_en text not null,
  intro_fr text not null default '',
  intro_en text not null default '',
  note_fr text not null default '',
  note_en text not null default '',
  guided_label_fr text not null default '',
  guided_label_en text not null default '',
  autonomous_label_fr text not null default '',
  autonomous_label_en text not null default '',
  booking_link_key text references public.booking_links(key) on update cascade,
  display_order integer not null default 0,
  layout text not null default 'list' check (layout in ('list', 'comparison')),
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create trigger price_sections_set_updated_at before update on public.price_sections
for each row execute function public.set_updated_at();

alter table public.price_sections enable row level security;

create policy "active price sections are publicly readable"
on public.price_sections for select
to anon, authenticated
using (active = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "admins manage price sections"
on public.price_sections for all
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

grant select on table public.price_sections to anon, authenticated;
grant insert, update, delete on table public.price_sections to authenticated;
grant select on table public.prices to anon, authenticated;
grant insert, update, delete on table public.prices to authenticated;

insert into public.price_sections (
  code, title_fr, title_en, intro_fr, intro_en, note_fr, note_en,
  guided_label_fr, guided_label_en, autonomous_label_fr, autonomous_label_en,
  booking_link_key, display_order, layout
) values
  ('discovery', 'Découverte & sorties', 'Discovery & excursions', 'Premières bulles, immersion plus longue ou rencontre avec les cétacés.', 'First bubbles, a longer immersion or a responsible cetacean excursion.', '', '', '', '', '', '', 'discovery_booking', 10, 'list'),
  ('ssi', 'Formation internationale SSI', 'International SSI training', 'Formations et supports pédagogiques numériques SSI.', 'SSI courses and digital learning materials.', '', '', '', '', '', '', 'ssi_booking', 20, 'list'),
  ('french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', 'Du niveau 1 au niveau 3, autonomie, profondeur, Nitrox et secourisme.', 'From Level 1 to Level 3, autonomy, depth, Nitrox and rescue skills.', '', '', '', '', '', '', 'french_training_booking', 30, 'list'),
  ('bridges', 'Passerelles', 'Crossovers', 'Faites reconnaître votre expérience d’un système de certification à l’autre.', 'Have your experience recognised across certification systems.', '', '', '', '', '', '', 'french_training_booking', 40, 'list'),
  ('exploration', 'Les forfaits d’exploration', 'Exploration dive packages', 'Forfaits valables 1 an.', 'Packages valid for 1 year.', 'Forfaits annuels et 6 mois : nous consulter. Plongée autonome uniquement avec l’ensemble de votre matériel.', 'Contact us for annual and 6-month packages. Autonomous diving requires your complete equipment.', 'Exploration encadrée', 'Guided exploration', 'Exploration autonome', 'Autonomous exploration', 'exploration_booking', 50, 'comparison'),
  ('supplements', 'Suppléments', 'Extras', 'Options applicables selon la plongée choisie.', 'Options that may apply depending on your dive.', 'Pour l’ensemble des formations, un certificat médical est nécessaire.', 'A medical certificate is required for all training courses.', '', '', '', '', 'main_booking', 60, 'list')
on conflict (code) do update set
  title_fr = excluded.title_fr,
  title_en = excluded.title_en,
  intro_fr = excluded.intro_fr,
  intro_en = excluded.intro_en,
  note_fr = excluded.note_fr,
  note_en = excluded.note_en,
  guided_label_fr = excluded.guided_label_fr,
  guided_label_en = excluded.guided_label_en,
  autonomous_label_fr = excluded.autonomous_label_fr,
  autonomous_label_en = excluded.autonomous_label_en,
  booking_link_key = excluded.booking_link_key,
  display_order = excluded.display_order,
  layout = excluded.layout;

alter table public.prices
  add column content_key text,
  add column section_code text,
  add column category_en text not null default '',
  add column subcategory_fr text not null default '',
  add column subcategory_en text not null default '',
  add column group_intro_fr text not null default '',
  add column group_intro_en text not null default '',
  add column prefix_fr text,
  add column prefix_en text,
  add column price_column text not null default 'standard',
  add column comparison_key text;

update public.prices set
  content_key = case label_fr
    when 'Baptême' then 'discovery-bapteme'
    when 'Initiation 40 min · 2 personnes minimum' then 'discovery-initiation'
    when 'Initiation et vie marine · 2 plongées' then 'discovery-marine-life'
    when 'Sortie cétacés · 3 h' then 'discovery-cetaceans'
    when 'Open Water SSI · kit inclus · 7 plongées' then 'ssi-open-water'
    when 'Niveau 1 · PE20 · 5 plongées' then 'french-pe20'
    when 'Exploration encadrée à l’unité' then 'exploration-unit-guided'
    when 'Exploration autonome à l’unité' then 'exploration-unit-autonomous'
    else 'legacy-' || id::text
  end,
  section_code = case category
    when 'Découverte' then 'discovery'
    when 'Cétacés' then 'discovery'
    when 'SSI' then 'ssi'
    when 'Français' then 'french'
    when 'Exploration' then 'exploration'
    else 'discovery'
  end,
  category_en = case category
    when 'Découverte' then 'Discovery & excursions'
    when 'Cétacés' then 'Discovery & excursions'
    when 'SSI' then 'International SSI training'
    when 'Français' then 'French ANMP & FFESSM training'
    when 'Exploration' then 'Exploration dive packages'
    else category
  end,
  price_column = case label_fr
    when 'Exploration encadrée à l’unité' then 'guided'
    when 'Exploration autonome à l’unité' then 'autonomous'
    else 'standard'
  end,
  comparison_key = case when category = 'Exploration' then 'unit' else null end
where id is not null;

alter table public.prices
  alter column content_key set not null,
  alter column section_code set not null,
  add constraint prices_content_key_key unique (content_key),
  add constraint prices_section_code_fkey foreign key (section_code) references public.price_sections(code) on update cascade,
  add constraint prices_price_column_check check (price_column in ('standard', 'guided', 'autonomous'));

create index prices_section_order_idx on public.prices (section_code, display_order) where active = true;

-- The complete price list is inserted below. Stable content keys make future edits safe.
insert into public.prices (content_key, section_code, category, category_en, subcategory_fr, subcategory_en, group_intro_fr, group_intro_en, label_fr, label_en, description_fr, description_en, amount_cents, prefix_fr, prefix_en, suffix_fr, suffix_en, price_column, comparison_key, booking_link_key, display_order, active) values
  ('discovery-bapteme', 'discovery', 'Découverte & sorties', 'Discovery & excursions', '', '', '', '', 'Découverte « Baptême »', 'Try dive', null, null, 8500, null, null, null, null, 'standard', null, 'discovery_booking', 10, true),
  ('discovery-initiation', 'discovery', 'Découverte & sorties', 'Discovery & excursions', '', '', '', '', 'Initiation 40 min · 2 personnes minimum', '40-minute initiation · minimum 2 people', null, null, 12500, null, null, ' / pers.', ' / person', 'standard', null, 'discovery_booking', 20, true),
  ('discovery-marine-life', 'discovery', 'Découverte & sorties', 'Discovery & excursions', '', '', '', '', 'Initiation et vie marine · 2 personnes minimum · 2 plongées', 'Initiation and marine life · minimum 2 people · 2 dives', 'Baptême, initiation, support et module vie marine inclus.', 'Try dive, initiation, learning material and marine-life module included.', 22000, null, null, ' / pers.', ' / person', 'standard', null, 'discovery_booking', 30, true),
  ('discovery-cetaceans', 'discovery', 'Découverte & sorties', 'Discovery & excursions', '', '', '', '', 'Sortie cétacés · de mi-juillet à fin octobre', 'Cetacean excursion · mid-July to late October', null, null, 15000, null, null, null, null, 'standard', null, 'cetacean_booking', 40, true),
  ('ssi-open-water', 'ssi', 'Formation internationale SSI', 'International SSI training', '', '', '', '', 'Open Water SSI · kit inclus · 7 plongées', 'SSI Open Water · kit included · 7 dives', null, null, 59500, null, null, null, null, 'standard', null, 'ssi_booking', 100, true),
  ('ssi-open-water-kit', 'ssi', 'Formation internationale SSI', 'International SSI training', '', '', '', '', 'Kit pédagogique numérique Open Water SSI', 'SSI Open Water digital learning kit', null, null, 9500, null, null, null, null, 'standard', null, 'ssi_booking', 110, true),
  ('ssi-deep-nitrox', 'ssi', 'Formation internationale SSI', 'International SSI training', '', '', '', '', 'Spécialité Deep Diving « profonde » + Nitrox · 3 plongées · kit inclus', 'Deep Diving speciality + Nitrox · 3 dives · kit included', null, null, 37500, null, null, null, null, 'standard', null, 'ssi_booking', 120, true),
  ('ssi-deep-kit', 'ssi', 'Formation internationale SSI', 'International SSI training', '', '', '', '', 'Kit pédagogique numérique Spécialité Deep & Nitrox', 'Deep & Nitrox speciality digital learning kit', null, null, 11500, null, null, null, null, 'standard', null, 'ssi_booking', 130, true),
  ('ssi-rescue-react', 'ssi', 'Formation internationale SSI', 'International SSI training', '', '', '', '', 'Spécialité Stress & Rescue + React Right · 7 plongées + cours · kit inclus', 'Stress & Rescue + React Right speciality · 7 dives + course · kit included', null, null, 68500, null, null, null, null, 'standard', null, 'ssi_booking', 140, true),
  ('ssi-rescue-kit', 'ssi', 'Formation internationale SSI', 'International SSI training', '', '', '', '', 'Kit pédagogique numérique Spécialité Rescue & React', 'Rescue & React speciality digital learning kit', null, null, 12500, null, null, null, null, 'standard', null, 'ssi_booking', 150, true),
  ('french-pe20', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Plongeur encadré à 20 m · PE20 niveau 1 · 5 plongées', 'Guided diver to 20 m · PE20 Level 1 · 5 dives', null, null, 42500, null, null, null, null, 'standard', null, 'french_training_booking', 200, true),
  ('french-pa20', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Plongeur autonome à 20 m · PA20 · 6 plongées', 'Autonomous diver to 20 m · PA20 · 6 dives', null, null, 48000, null, null, null, null, 'standard', null, 'french_training_booking', 210, true),
  ('french-pe40', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Plongeur encadré à 40 m · PE40 · 4 plongées', 'Guided diver to 40 m · PE40 · 4 dives', null, null, 32000, null, null, null, null, 'standard', null, 'french_training_booking', 220, true),
  ('french-level-2', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Niveau 2 · PA20 + PE40 · 10 plongées', 'Level 2 · PA20 + PE40 · 10 dives', null, null, 77000, null, null, null, null, 'standard', null, 'french_training_booking', 230, true),
  ('french-level-2-nitrox', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Niveau 2 + Nitrox · 10 plongées', 'Level 2 + Nitrox · 10 dives', null, null, 85000, null, null, null, null, 'standard', null, 'french_training_booking', 240, true),
  ('french-pa40', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'PA40 · 6 plongées', 'PA40 · 6 dives', null, null, 54000, null, null, null, null, 'standard', null, 'french_training_booking', 250, true),
  ('french-pa40-nitrox', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'PA40 + Nitrox simple · 6 plongées', 'PA40 + basic Nitrox · 6 dives', null, null, 61000, null, null, null, null, 'standard', null, 'french_training_booking', 260, true),
  ('french-pa40-pa60', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'PA40 vers PA60 · 4 plongées · RIFAP compris', 'PA40 to PA60 · 4 dives · RIFAP included', null, null, 40000, null, null, null, null, 'standard', null, 'french_training_booking', 270, true),
  ('french-level-3', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Niveau 3 · PA60 · 10 plongées', 'Level 3 · PA60 · 10 dives', null, null, 79000, null, null, null, null, 'standard', null, 'french_training_booking', 280, true),
  ('french-level-3-rifap', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Niveau 3 · PA60 · 10 plongées · RIFAP compris', 'Level 3 · PA60 · 10 dives · RIFAP included', null, null, 90000, null, null, null, null, 'standard', null, 'french_training_booking', 290, true),
  ('french-level-3-rifap-nitrox', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Niveau 3 · PA60 + RIFAP + Nitrox confirmé · 12 plongées', 'Level 3 · PA60 + RIFAP + Advanced Nitrox · 12 dives', null, null, 106000, null, null, null, null, 'standard', null, 'french_training_booking', 300, true),
  ('french-rifap', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'RIFAP secourisme obligatoire pour le niveau 3', 'Mandatory RIFAP rescue training for Level 3', null, null, 15000, null, null, null, null, 'standard', null, 'french_training_booking', 310, true),
  ('french-nitrox', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Formation Nitrox · 2 plongées', 'Nitrox course · 2 dives', null, null, 18000, null, null, null, null, 'standard', null, 'french_training_booking', 320, true),
  ('french-advanced-nitrox', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Formation Nitrox confirmé · 4 plongées', 'Advanced Nitrox course · 4 dives', null, null, 32000, null, null, null, null, 'standard', null, 'french_training_booking', 330, true),
  ('french-technical-dive', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Plongée technique', 'Technical dive', null, null, 8000, null, null, null, null, 'standard', null, 'french_training_booking', 340, true),
  ('french-ffessm-licence', 'french', 'Formation française ANMP & FFESSM', 'French ANMP & FFESSM training', '', '', '', '', 'Licence FFESSM pour les certifications', 'FFESSM licence for certifications', null, null, 6000, null, null, ' en supplément', ' extra', 'standard', null, 'french_training_booking', 350, true),
  ('bridge-ssi-level-2', 'bridges', 'Passerelles', 'Crossovers', 'SSI vers diplôme français', 'SSI to French certification', 'Advanced SSI avec 24 plongées', 'SSI Advanced with 24 logged dives', 'Passerelle Advanced SSI vers niveau 2 · 1 plongée + certification', 'SSI Advanced to Level 2 crossover · 1 dive + certification', null, null, 14000, null, null, null, null, 'standard', null, 'french_training_booking', 400, true),
  ('bridge-ssi-pa40', 'bridges', 'Passerelles', 'Crossovers', 'SSI vers diplôme français', 'SSI to French certification', '', '', 'Passerelle Advanced SSI vers PA40 · 4 plongées + certification*', 'SSI Advanced to PA40 crossover · 4 dives + certification*', '* Prérequis : 4 plongées au-delà de 30 m en exploration.', '* Prerequisite: 4 exploration dives deeper than 30 m.', 35000, null, null, null, null, 'standard', null, 'french_training_booking', 410, true),
  ('bridge-master-level-3', 'bridges', 'Passerelles', 'Crossovers', 'SSI vers diplôme français', 'SSI to French certification', '', '', 'Passerelle Master Diver SSI vers niveau 3 · 8 plongées + certification**', 'SSI Master Diver to Level 3 crossover · 8 dives + certification**', '** Prérequis : 10 plongées dont 4 au-delà de 30 m en exploration.', '** Prerequisite: 10 dives, including 4 exploration dives deeper than 30 m.', 66000, null, null, null, null, 'standard', null, 'french_training_booking', 420, true),
  ('bridge-french-open-water', 'bridges', 'Passerelles', 'Crossovers', 'Diplôme français vers SSI', 'French certification to SSI', 'Passerelle française vers SSI international', 'French certification to international SSI', 'Niveau 1 vers Open Water Diver SSI', 'Level 1 to SSI Open Water Diver', '3 plongées + kit OWD et certification.', '3 dives + OWD kit and certification.', 28500, null, null, null, null, 'standard', null, 'ssi_booking', 430, true),
  ('bridge-french-advanced', 'bridges', 'Passerelles', 'Crossovers', 'Diplôme français vers SSI', 'French certification to SSI', '', '', 'Niveau 2 vers Advanced Open Water Diver', 'Level 2 to Advanced Open Water Diver', '2 plongées + 4 kits Rescue, React, Deep et Nitrox + certification.', '2 dives + 4 Rescue, React, Deep and Nitrox kits + certification.', 35000, null, null, null, null, 'standard', null, 'ssi_booking', 440, true),
  ('bridge-french-master', 'bridges', 'Passerelles', 'Crossovers', 'Diplôme français vers SSI', 'French certification to SSI', '', '', 'Niveau 3 vers Master Diver', 'Level 3 to Master Diver', '3 plongées + 5 kits Rescue, React, Deep, Nitrox et Decompression + certification.', '3 dives + 5 Rescue, React, Deep, Nitrox and Decompression kits + certification.', 40000, null, null, null, null, 'standard', null, 'ssi_booking', 450, true),
  ('bridge-extra-dive', 'bridges', 'Passerelles', 'Crossovers', 'Diplôme français vers SSI', 'French certification to SSI', '', '', 'Plongée supplémentaire', 'Additional dive', null, null, 8000, null, null, ' / plongée', ' / dive', 'standard', null, 'ssi_booking', 460, true),
  ('exploration-unit-guided', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Plongée exploration à l’unité', 'Single exploration dive', null, null, 6500, null, null, null, null, 'guided', 'unit', 'exploration_booking', 500, true),
  ('exploration-unit-autonomous', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Plongée exploration à l’unité', 'Single exploration dive', null, null, 4500, null, null, null, null, 'autonomous', 'unit', 'exploration_booking', 501, true),
  ('exploration-4-guided', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 4 plongées', '4-dive package', null, null, 24500, null, null, null, null, 'guided', '4', 'exploration_booking', 502, true),
  ('exploration-4-autonomous', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 4 plongées', '4-dive package', null, null, 17200, null, null, null, null, 'autonomous', '4', 'exploration_booking', 503, true),
  ('exploration-6-guided', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 6 plongées', '6-dive package', null, null, 35000, null, null, null, null, 'guided', '6', 'exploration_booking', 504, true),
  ('exploration-6-autonomous', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 6 plongées', '6-dive package', null, null, 24900, null, null, null, null, 'autonomous', '6', 'exploration_booking', 505, true),
  ('exploration-10-guided', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 10 plongées', '10-dive package', null, null, 55000, null, null, null, null, 'guided', '10', 'exploration_booking', 506, true),
  ('exploration-10-autonomous', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 10 plongées', '10-dive package', null, null, 40000, null, null, null, null, 'autonomous', '10', 'exploration_booking', 507, true),
  ('exploration-20-guided', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 20 plongées', '20-dive package', null, null, 100000, null, null, null, null, 'guided', '20', 'exploration_booking', 508, true),
  ('exploration-20-autonomous', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 20 plongées', '20-dive package', null, null, 70000, null, null, null, null, 'autonomous', '20', 'exploration_booking', 509, true),
  ('exploration-32-autonomous', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 32 plongées', '32-dive package', null, null, 95000, null, null, null, null, 'autonomous', '32', 'exploration_booking', 511, true),
  ('exploration-65-autonomous', 'exploration', 'Les forfaits d’exploration', 'Exploration dive packages', '', '', '', '', 'Forfait 65 plongées', '65-dive package', null, null, 156000, null, null, null, null, 'autonomous', '65', 'exploration_booking', 513, true),
  ('supplement-night-dive', 'supplements', 'Suppléments', 'Extras', '', '', '', '', 'Plongée de nuit', 'Night dive', null, null, 1000, '+', '+', null, null, 'standard', null, 'main_booking', 600, true),
  ('supplement-night-lamp', 'supplements', 'Suppléments', 'Extras', '', '', '', '', 'Lampe de nuit', 'Night lamp', null, null, 1000, '+', '+', null, null, 'standard', null, 'main_booking', 610, true),
  ('supplement-guidance', 'supplements', 'Suppléments', 'Extras', '', '', '', '', 'Encadrement', 'Instructor guidance', null, null, 1000, '+', '+', null, null, 'standard', null, 'main_booking', 620, true),
  ('supplement-equipment', 'supplements', 'Suppléments', 'Extras', '', '', '', '', 'Matériel', 'Equipment', null, null, 1000, '+', '+', null, null, 'standard', null, 'main_booking', 630, true),
  ('supplement-nitrox', 'supplements', 'Suppléments', 'Extras', '', '', '', '', 'Nitrox', 'Nitrox', null, null, 500, '+', '+', null, null, 'standard', null, 'main_booking', 640, true)
on conflict (content_key) do update set
  section_code = excluded.section_code,
  category = excluded.category,
  category_en = excluded.category_en,
  subcategory_fr = excluded.subcategory_fr,
  subcategory_en = excluded.subcategory_en,
  group_intro_fr = excluded.group_intro_fr,
  group_intro_en = excluded.group_intro_en,
  label_fr = excluded.label_fr,
  label_en = excluded.label_en,
  description_fr = excluded.description_fr,
  description_en = excluded.description_en,
  amount_cents = excluded.amount_cents,
  prefix_fr = excluded.prefix_fr,
  prefix_en = excluded.prefix_en,
  suffix_fr = excluded.suffix_fr,
  suffix_en = excluded.suffix_en,
  price_column = excluded.price_column,
  comparison_key = excluded.comparison_key,
  booking_link_key = excluded.booking_link_key,
  display_order = excluded.display_order,
  active = excluded.active;
