-- Nov 13 2026: the Shortlist series is on (applied to Supabase as migrations shortlist_series_on and fc_sends_series_steps).
-- Day 1 town, day 10 honest and day 14 next send. Day 5 story and day 7 note still wait on note_enabled (Dad's OK).
alter table public.fc_email_settings add column if not exists series_enabled boolean not null default false;
update public.fc_email_settings set series_enabled = true where id = 1;

alter table public.fc_sends drop constraint fc_sends_step_check;
alter table public.fc_sends add constraint fc_sends_step_check check (step = any (array['top5','guide','note','welcome','town','story','honest','next','letter']));

-- private.fc_queue_emails: as in 2026-11-04-shortlist-series.sql, except 'town' ("of your five") is only queued
-- when the lead has 5 or more matches, so single saved towns don't get it.
-- Leads from before Nov 13 were caught up by hand: day 1 on Nov 13, then story, honest and next spaced out after it.
