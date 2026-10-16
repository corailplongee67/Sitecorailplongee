create extension if not exists http with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.weather_history (
  observation_date date primary key,
  observed_at timestamptz not null,
  temperature_c numeric(5, 2) not null,
  apparent_temperature_c numeric(5, 2) not null,
  relative_humidity_percent integer not null check (relative_humidity_percent between 0 and 100),
  precipitation_mm numeric(7, 2) not null default 0,
  cloud_cover_percent integer not null check (cloud_cover_percent between 0 and 100),
  wind_speed_kmh numeric(6, 2) not null default 0,
  wind_direction_degrees integer not null check (wind_direction_degrees between 0 and 360),
  weather_code integer not null,
  source text not null default 'open-meteo',
  created_at timestamptz not null default now()
);

alter table public.weather_history enable row level security;
grant select on table public.weather_history to authenticated;
revoke all on table public.weather_history from anon;

drop policy if exists "admins read weather history" on public.weather_history;
create policy "admins read weather history"
on public.weather_history for select
to authenticated
using ((((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'));

create or replace function private.capture_daily_weather()
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  response record;
  payload jsonb;
  local_observation timestamp;
begin
  select * into response
  from extensions.http_get(
    'https://api.open-meteo.com/v1/forecast?latitude=-21.0532&longitude=55.2278&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=Indian%2FReunion'
  );

  if response.status < 200 or response.status >= 300 then
    raise warning 'Daily weather request failed with HTTP status %', response.status;
    return;
  end if;

  payload := response.content::jsonb;
  local_observation := (payload #>> '{current,time}')::timestamp;

  insert into public.weather_history (
    observation_date,
    observed_at,
    temperature_c,
    apparent_temperature_c,
    relative_humidity_percent,
    precipitation_mm,
    cloud_cover_percent,
    wind_speed_kmh,
    wind_direction_degrees,
    weather_code
  ) values (
    local_observation::date,
    local_observation at time zone 'Indian/Reunion',
    (payload #>> '{current,temperature_2m}')::numeric,
    (payload #>> '{current,apparent_temperature}')::numeric,
    (payload #>> '{current,relative_humidity_2m}')::integer,
    coalesce((payload #>> '{current,precipitation}')::numeric, 0),
    (payload #>> '{current,cloud_cover}')::integer,
    coalesce((payload #>> '{current,wind_speed_10m}')::numeric, 0),
    (payload #>> '{current,wind_direction_10m}')::integer,
    (payload #>> '{current,weather_code}')::integer
  )
  on conflict (observation_date) do update set
    observed_at = excluded.observed_at,
    temperature_c = excluded.temperature_c,
    apparent_temperature_c = excluded.apparent_temperature_c,
    relative_humidity_percent = excluded.relative_humidity_percent,
    precipitation_mm = excluded.precipitation_mm,
    cloud_cover_percent = excluded.cloud_cover_percent,
    wind_speed_kmh = excluded.wind_speed_kmh,
    wind_direction_degrees = excluded.wind_direction_degrees,
    weather_code = excluded.weather_code,
    source = excluded.source,
    created_at = now();
exception
  when others then
    raise warning 'Daily weather capture failed: %', sqlerrm;
end;
$$;

revoke all on function private.capture_daily_weather() from public, anon, authenticated;

select cron.schedule(
  'corail-daily-weather',
  '0 5 * * *',
  'select private.capture_daily_weather();'
);
