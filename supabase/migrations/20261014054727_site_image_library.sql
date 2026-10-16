create table if not exists public.site_images (
  slot_key text primary key,
  image_path text not null check (image_path <> ''),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_images_set_updated_at on public.site_images;
create trigger site_images_set_updated_at before update on public.site_images
for each row execute function public.set_updated_at();

alter table public.site_images enable row level security;

grant select on table public.site_images to anon, authenticated;
grant insert, update, delete on table public.site_images to authenticated;

drop policy if exists "site images are publicly readable" on public.site_images;
create policy "site images are publicly readable"
on public.site_images for select
to anon, authenticated
using (true);

drop policy if exists "admins insert site images" on public.site_images;
create policy "admins insert site images"
on public.site_images for insert
to authenticated
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins update site images" on public.site_images;
create policy "admins update site images"
on public.site_images for update
to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'))
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins delete site images" on public.site_images;
create policy "admins delete site images"
on public.site_images for delete
to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins upload site images" on storage.objects;
create policy "admins upload site images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'site-images'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
);

drop policy if exists "admins update site images" on storage.objects;
create policy "admins update site images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'site-images'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
)
with check (
  bucket_id = 'site-images'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
);

drop policy if exists "admins delete site images" on storage.objects;
create policy "admins delete site images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'site-images'
  and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
);
