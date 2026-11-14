-- Shortlist series (Nov 4 2026). APPLIED Nov 13 2026 (Mark: "these need to be sent"), with the changes in
-- 2026-11-13-series-on.sql: series_enabled is on, fc_sends allows the new steps, and day 1 only goes to full top 5 lists.
-- 1) a switch for the new emails (off until Mark and his dad approve the copy)
alter table public.fc_email_settings add column if not exists series_enabled boolean not null default false;

-- 2) the new schedule for quiz leads
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
      (new.id, new.email, 'town',   now() + interval '1 day'),
      (new.id, new.email, 'guide',  now() + interval '3 days'),
      (new.id, new.email, 'story',  now() + interval '5 days'),
      (new.id, new.email, 'note',   now() + interval '7 days'),
      (new.id, new.email, 'honest', now() + interval '10 days'),
      (new.id, new.email, 'next',   now() + interval '14 days')
    on conflict do nothing;
  elsif new.status = 'new' and new.kind = 'newsletter' and new.email is not null then
    if not exists (select 1 from public.fc_sends where lower(email) = lower(new.email) and step = 'welcome') then
      insert into public.fc_sends (lead_id, email, step, send_at) values (new.id, new.email, 'welcome', now())
      on conflict do nothing;
    end if;
  end if;
  return new;
end $function$;

-- 3) optional: save the thank you screen answer onto the lead (see fc_set_timeline in the Nov 4 notes)
