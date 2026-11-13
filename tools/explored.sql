-- Popular right now, for the Beach Towns page. Read only.
-- Different visitors (sid) who opened each town on the live site in the last 30 days:
-- a town page view or a tap on a town on the live map. Preview traffic is left out.
-- Towns merged on Nov 12 2026 are counted with the town that now covers them.
-- Run it, save the one JSON value it returns, then: python3 tools/explored.py <that file>
with o as (
 select sid, substring(path from '/towns/([a-z0-9-]+?)(?:-v[0-9]+)?\.html') t from fc_events
  where event = 'pageview' and path ~ '/towns/[a-z0-9-]+\.html' and path not like '/preview%' and created_at > now() - interval '30 days'
 union
 select sid, detail t from fc_events where event = 'town_tap' and created_at > now() - interval '30 days'
), m as (
 select sid, case t when 'north-redington-beach' then 'redington-shores' when 'redington-beach' then 'redington-shores'
  when 'valparaiso' then 'niceville' when 'okaloosa-island' then 'fort-walton-beach'
  when 'holly-hill' then 'daytona' when 'south-daytona' then 'daytona' else t end t from o
)
select json_build_object(
 'from', to_char((now() - interval '30 days') at time zone 'America/Los_Angeles', 'YYYY-MM-DD'),
 'to', to_char(now() at time zone 'America/Los_Angeles', 'YYYY-MM-DD'),
 'views', (select json_object_agg(t, v) from (select t, count(distinct sid) v from m where t is not null and t <> 'index' group by t order by v desc) x)
) j;
