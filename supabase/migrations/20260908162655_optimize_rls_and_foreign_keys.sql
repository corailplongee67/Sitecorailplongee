create index if not exists events_booking_link_key_idx on public.events (booking_link_key);
create index if not exists price_sections_booking_link_key_idx on public.price_sections (booking_link_key);
create index if not exists prices_booking_link_key_idx on public.prices (booking_link_key);

drop policy if exists "published events are publicly readable" on public.events;
create policy "published events are publicly readable"
on public.events for select
to anon, authenticated
using (published = true or (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "active prices are publicly readable" on public.prices;
create policy "active prices are publicly readable"
on public.prices for select
to anon, authenticated
using (active = true or (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "active price sections are publicly readable" on public.price_sections;
create policy "active price sections are publicly readable"
on public.price_sections for select
to anon, authenticated
using (active = true or (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins manage booking links" on public.booking_links;
create policy "admins insert booking links" on public.booking_links for insert to authenticated
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins update booking links" on public.booking_links for update to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'))
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins delete booking links" on public.booking_links for delete to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins manage events" on public.events;
create policy "admins insert events" on public.events for insert to authenticated
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins update events" on public.events for update to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'))
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins delete events" on public.events for delete to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins manage prices" on public.prices;
create policy "admins insert prices" on public.prices for insert to authenticated
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins update prices" on public.prices for update to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'))
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins delete prices" on public.prices for delete to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins manage price sections" on public.price_sections;
create policy "admins insert price sections" on public.price_sections for insert to authenticated
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins update price sections" on public.price_sections for update to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'))
with check ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
create policy "admins delete price sections" on public.price_sections for delete to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins upload event images" on storage.objects;
create policy "admins upload event images" on storage.objects for insert to authenticated
with check (bucket_id = 'event-images' and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins update event images" on storage.objects;
create policy "admins update event images" on storage.objects for update to authenticated
using (bucket_id = 'event-images' and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'))
with check (bucket_id = 'event-images' and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

drop policy if exists "admins delete event images" on storage.objects;
create policy "admins delete event images" on storage.objects for delete to authenticated
using (bucket_id = 'event-images' and (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));
