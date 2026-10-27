create table if not exists public.site_audio_settings (
  id text primary key default 'background' check (id = 'background'),
  audio_path text not null check (audio_path <> ''),
  volume numeric(4, 3) not null default 0.25 check (volume >= 0 and volume <= 1),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_audio_settings_set_updated_at on public.site_audio_settings;
create trigger site_audio_settings_set_updated_at before update on public.site_audio_settings
for each row execute function public.set_updated_at();

alter table public.site_audio_settings enable row level security;

grant select on table public.site_audio_settings to anon, authenticated;
grant insert, update, delete on table public.site_audio_settings to authenticated;

drop policy if exists "site audio settings are publicly readable" on public.site_audio_settings;
create policy "site audio settings are publicly readable"
on public.site_audio_settings for select
to anon, authenticated
using (true);

drop policy if exists "admins insert site audio settings" on public.site_audio_settings;
create policy "admins insert site audio settings"
on public.site_audio_settings for insert
to authenticated
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins update site audio settings" on public.site_audio_settings;
create policy "admins update site audio settings"
on public.site_audio_settings for update
to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'))
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins delete site audio settings" on public.site_audio_settings;
create policy "admins delete site audio settings"
on public.site_audio_settings for delete
to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-audio',
  'site-audio',
  true,
  31457280,
  array['audio/mpeg', 'audio/mp4', 'audio/ogg', 'audio/wav', 'audio/x-wav', 'audio/webm', 'audio/aac', 'audio/x-m4a']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins upload site audio" on storage.objects;
create policy "admins upload site audio"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'site-audio'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
);

drop policy if exists "admins update site audio" on storage.objects;
create policy "admins update site audio"
on storage.objects for update
to authenticated
using (
  bucket_id = 'site-audio'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
)
with check (
  bucket_id = 'site-audio'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
);

drop policy if exists "admins delete site audio" on storage.objects;
create policy "admins delete site audio"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'site-audio'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
);
