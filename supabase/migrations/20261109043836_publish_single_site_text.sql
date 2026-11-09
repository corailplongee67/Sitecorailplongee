create function site_text_private.publish_single_text(text_key_value text, content_value text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if (select auth.uid()) is null or ((select auth.jwt()) -> 'app_metadata' ->> 'role') is distinct from 'admin' then
    raise exception 'Publication non autorisée';
  end if;
  if text_key_value is null or content_value is null then
    raise exception 'Texte invalide';
  end if;
  insert into public.site_text_published (text_key, content, updated_at)
  values (text_key_value, content_value, now())
  on conflict (text_key) do update set content = excluded.content, updated_at = excluded.updated_at;
  delete from public.site_text_drafts where text_key = text_key_value;
end;
$$;
revoke all on function site_text_private.publish_single_text(text, text) from public, anon;
grant execute on function site_text_private.publish_single_text(text, text) to authenticated;

create function public.publish_single_site_text(text_key_value text, content_value text) returns void
language sql security invoker set search_path = '' as $$
  select site_text_private.publish_single_text(text_key_value, content_value);
$$;
revoke all on function public.publish_single_site_text(text, text) from public, anon;
grant execute on function public.publish_single_site_text(text, text) to authenticated;
