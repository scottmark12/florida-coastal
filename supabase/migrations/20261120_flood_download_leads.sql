-- Nov 20 2026: the flood rankings landing page (/flood). NOT applied yet: run at go time, before merging to main.
-- 1. New lead kind "download" (answers.offer says which PDF, e.g. "flood-rankings").
-- 2. A download lead queues: flood (now, PDF attached), floodquiz (day 3), welcome (day 7, only if that email never got it).
-- 3. fc_email_settings.download_enabled turns the flood steps off without touching anything else.
-- After applying: redeploy fc-send from mail/fc-send.ts.txt + mail/render.js (new steps flood and floodquiz).

alter table public.fc_leads drop constraint fc_leads_kind_check;
alter table public.fc_leads add constraint fc_leads_kind_check
  check (kind = any (array['newsletter','local','agent','matches','download']));

alter table public.fc_sends drop constraint fc_sends_step_check;
alter table public.fc_sends add constraint fc_sends_step_check
  check (step = any (array['top5','guide','note','welcome','town','story','honest','next','letter','flood','floodquiz']));

alter table public.fc_email_settings add column if not exists download_enabled boolean not null default true;

create or replace function private.fc_queue_emails()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if new.status = 'new' and new.kind = 'matches' and new.email is not null
     and jsonb_typeof(new.matches) = 'array' and jsonb_array_length(new.matches) > 0 then
    -- only the newest lead per email keeps its follow ups
    update public.fc_sends set status = 'skipped', error = 'newer lead from same email'
      where lower(email) = lower(new.email) and step in ('town','guide','story','note','honest','next','floodquiz') and status in ('queued','hold');
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
  elsif new.status = 'new' and new.kind = 'download' and new.email is not null
     and coalesce(new.answers->>'offer', '') = 'flood-rankings' then
    -- the PDF always goes out (they asked for it), even on a repeat signup
    insert into public.fc_sends (lead_id, email, step, send_at) values (new.id, new.email, 'flood', now())
    on conflict do nothing;
    -- the quiz nudge only if they haven't taken the quiz and haven't had this nudge already
    if not exists (select 1 from public.fc_sends where lower(email) = lower(new.email) and step in ('top5','floodquiz')) then
      insert into public.fc_sends (lead_id, email, step, send_at) values (new.id, new.email, 'floodquiz', now() + interval '3 days')
      on conflict do nothing;
    end if;
    if not exists (select 1 from public.fc_sends where lower(email) = lower(new.email) and step = 'welcome') then
      insert into public.fc_sends (lead_id, email, step, send_at) values (new.id, new.email, 'welcome', now() + interval '7 days')
      on conflict do nothing;
    end if;
  end if;
  return new;
end $function$;
