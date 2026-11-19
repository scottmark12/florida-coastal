-- HOLD FOR LAUNCH (do not apply until the Shortlist preview merges and fc-send has the new render.js).
-- Ask a local leads that carry towns (from the Shortlist, quiz results or the save sheet) also get their
-- Shortlist emailed (the top5 step only; Mark or Betsy reply in person, so no letters series),
-- unless that email already got a Shortlist email in the last 30 days.
create or replace function private.fc_queue_emails()
 returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if new.status = 'new' and new.kind = 'matches' and new.email is not null
     and jsonb_typeof(new.matches) = 'array' and jsonb_array_length(new.matches) > 0 then
    -- only the newest lead per email keeps its follow ups
    update public.fc_sends set status = 'skipped', error = 'newer lead from same email'
      where lower(email) = lower(new.email) and step in ('town','guide','story','note','honest','next') and status in ('queued','hold');
    insert into public.fc_sends (lead_id, email, step, send_at) values
      (new.id, new.email, 'top5',   now()),
      (new.id, new.email, 'guide',  now() + interval '3 days'),
      (new.id, new.email, 'story',  now() + interval '5 days'),
      (new.id, new.email, 'note',   now() + interval '7 days'),
      (new.id, new.email, 'honest', now() + interval '10 days'),
      (new.id, new.email, 'next',   now() + interval '14 days')
    on conflict do nothing;
    -- "A Saturday in your No. 1 town" says "of your five", so only for full top 5 lists (not single saved towns)
    if jsonb_array_length(new.matches) >= 5 then
      insert into public.fc_sends (lead_id, email, step, send_at) values (new.id, new.email, 'town', now() + interval '1 day')
      on conflict do nothing;
    end if;
  elsif new.status = 'new' and new.kind = 'local' and new.email is not null
     and jsonb_typeof(new.matches) = 'array' and jsonb_array_length(new.matches) > 0
     and not exists (select 1 from public.fc_sends where lower(email) = lower(new.email) and step = 'top5' and created_at > now() - interval '30 days') then
    insert into public.fc_sends (lead_id, email, step, send_at) values (new.id, new.email, 'top5', now())
    on conflict do nothing;
  elsif new.status = 'new' and new.kind = 'newsletter' and new.email is not null then
    if not exists (select 1 from public.fc_sends where lower(email) = lower(new.email) and step = 'welcome') then
      insert into public.fc_sends (lead_id, email, step, send_at) values (new.id, new.email, 'welcome', now())
      on conflict do nothing;
    end if;
  end if;
  return new;
end $function$;
