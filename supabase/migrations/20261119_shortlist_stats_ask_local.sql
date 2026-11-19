-- Shortlist stats, reworked Nov 19: two asks kept apart.
-- emails = save (kind matches), hand raises = Ask a local (kind local), counted from every form that asks.
create or replace function public.fc_shortlist_stats(p_days integer default 30)
returns jsonb language sql stable set search_path to 'public' as $function$
with b as (select now() - make_interval(days => greatest(1, least(p_days, 180))) t1),
ev as (select e.* from fc_events_clean e, b where e.created_at >= b.t1),
s as (
  select sid,
    bool_or(event = 'pageview') v,
    bool_or(event in ('quiz_complete','quiz_top5')) quiz,
    bool_or(event = 'shortlist_save') saved,
    bool_or(event = 'shortlist_ask_shown') save_ask,
    bool_or(event = 'lead' and detail = 'matches') email,
    bool_or(event = 'ask_local_shown') local_ask,
    bool_or(event = 'lead' and detail = 'local') hand_raise,
    bool_or(event = 'shortlist_share') shared,
    bool_or(event = 'shortlist_view') viewed,
    bool_or(event = 'shortlist_react') top_pick,
    bool_or(event in ('vibe_remove','vibe_edit_open')) vibe_edit
  from ev group by sid
),
saves as (select split_part(detail, ' · ', 1) town, split_part(detail, ' · ', 2) src from ev where event = 'shortlist_save'),
ld as (select l.* from fc_leads l, b where l.status = 'new' and l.created_at >= b.t1),
lt as (select m->>'id' town from ld, jsonb_array_elements(case when jsonb_typeof(ld.matches) = 'array' then ld.matches else '[]'::jsonb end) m),
hr as (
  select case
      when answers->>'source' = 'ask_local' then coalesce(nullif(split_part(answers->>'from', ' · ', 1), ''), 'shortlist')
      when page like '%/towns/%' then 'town page'
      when page like '%compare%' then 'compare'
      when page = '/' or page like '/index.html%' or page like '/#%' then 'home'
      else coalesce(nullif(page, ''), 'unknown') end src,
    phone is not null and phone <> '' has_phone
  from ld where kind = 'local'
)
select jsonb_build_object(
  'days', p_days,
  'funnel', jsonb_build_object(
    'visits', (select count(*) from s where v),
    'quiz_done', (select count(*) from s where quiz),
    'saved_a_town', (select count(*) from s where saved),
    'save_ask_shown', (select count(*) from s where save_ask),
    'emails', (select count(*) from s where email),
    'ask_local_shown', (select count(*) from s where local_ask),
    'hand_raises', (select count(*) from s where hand_raise),
    'shared', (select count(*) from s where shared),
    'viewed_shortlist', (select count(*) from s where viewed),
    'marked_top_pick', (select count(*) from s where top_pick),
    'edited_vibe', (select count(*) from s where vibe_edit)
  ),
  'emails_per_100_visits', round(100.0 * (select count(*) from s where email) / nullif((select count(*) from s where v), 0), 2),
  'hand_raises_per_100_visits', round(100.0 * (select count(*) from s where hand_raise) / nullif((select count(*) from s where v), 0), 2),
  'leads', jsonb_build_object(
    'emails', (select count(*) from ld where kind = 'matches'),
    'hand_raises', (select count(*) from ld where kind = 'local'),
    'hand_raises_with_phone', (select count(*) from hr where has_phone),
    'newsletter', (select count(*) from ld where kind = 'newsletter')
  ),
  'hand_raises_by_source', coalesce((select jsonb_object_agg(src, n) from (select src, count(*) n from hr group by 1) h), '{}'::jsonb),
  'saves_by_source', coalesce((select jsonb_object_agg(src, n) from (select coalesce(nullif(src,''),'unknown') src, count(*) n from saves group by 1) x), '{}'::jsonb),
  'town_demand', coalesce((select jsonb_agg(jsonb_build_object('town', town, 'saves', saves, 'in_leads', in_leads) order by saves + in_leads desc) from (
      select coalesce(a.town, c.town) town, coalesce(a.n, 0) saves, coalesce(c.n, 0) in_leads
      from (select town, count(*) n from saves group by 1) a
      full join (select town, count(*) n from lt group by 1) c on c.town = a.town
      order by coalesce(a.n,0) + coalesce(c.n,0) desc limit 25) y), '[]'::jsonb),
  'vibes', coalesce((select jsonb_object_agg(k, n) from (select k, count(*) n from ev, regexp_split_to_table(ev.detail, ',') k where ev.event = 'quiz_vibe' and k <> '' group by 1) z), '{}'::jsonb),
  'vibes_removed', coalesce((select jsonb_object_agg(detail, n) from (select detail, count(*) n from ev where event = 'vibe_remove' group by 1) r), '{}'::jsonb)
);
$function$;
revoke all on function public.fc_shortlist_stats(integer) from public, anon;
grant execute on function public.fc_shortlist_stats(integer) to authenticated, service_role;
