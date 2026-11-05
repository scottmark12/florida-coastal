-- Nov 5 2026: after someone gives us their email, the thank you screen asks
-- timeline, buy or rent, budget, and name and phone (all optional, one tap each).
-- MUST be applied before the site change goes live: the site starts sending `ref`
-- with every lead, and inserts fail if the column doesn't exist.
alter table public.fc_leads
  add column if not exists ref uuid,
  add column if not exists plan text,
  add column if not exists budget text,
  add column if not exists profiled_at timestamptz,
  add column if not exists hot_pinged_at timestamptz;
create unique index if not exists fc_leads_ref_key on public.fc_leads(ref);
grant insert (ref) on public.fc_leads to anon;

-- Only the browser that made the lead knows its random ref, and only for 2 days.
-- Hot lead alert (once per lead, same Zapier hook as the new lead alert):
--   the moment a phone number comes in, or when a "This year" lead finishes the questions.
create or replace function public.fc_lead_profile(
  p_ref uuid, p_timeline text default null, p_plan text default null,
  p_budget text default null, p_name text default null, p_phone text default null,
  p_done boolean default false)
returns boolean language plpgsql security definer set search_path = public, extensions as $$
declare r public.fc_leads;
begin
  if p_ref is null then return false; end if;
  if p_timeline is not null and p_timeline not in ('This year','In 1 to 2 years','Still exploring') then p_timeline := null; end if;
  if p_plan is not null and p_plan not in ('Buy','Rent first','Not sure yet') then p_plan := null; end if;
  if p_budget is not null and p_budget not in ('Under $400K','$400K to $750K','$750K to $1.5M','$1.5M and up','Not sure yet') then p_budget := null; end if;
  p_name := nullif(left(btrim(p_name),80),'');
  p_phone := nullif(left(btrim(p_phone),40),'');
  update public.fc_leads set
    timeline = coalesce(p_timeline, timeline),
    plan = coalesce(p_plan, plan),
    budget = coalesce(p_budget, budget),
    name = coalesce(p_name, name),
    phone = coalesce(p_phone, phone),
    profiled_at = now()
  where ref = p_ref and created_at > now() - interval '2 days'
  returning * into r;
  if r.id is null then return false; end if;

  if r.hot_pinged_at is null and r.status = 'new'
     and (p_phone is not null or (p_done and r.timeline = 'This year')) then
    perform net.http_post(
      url := 'https://hooks.zapier.com/hooks/catch/28317487/CgnPyP2ZjgkQ7bYL5/',
      body := jsonb_build_object(
        'id', r.id, 'kind', 'hot', 'name', r.name, 'email', r.email,
        'phone', r.phone, 'town', r.town, 'timeline', r.timeline,
        'message', 'HOT LEAD: ' || concat_ws(', ',
            coalesce(r.timeline, 'timeline not given'),
            coalesce(r.plan, 'buy or rent not given'),
            coalesce(r.budget, 'budget not given'),
            case when r.phone is not null then 'call ' || r.phone else 'no phone, email them' end),
        'matches', coalesce(r.matches::text, ''),
        'page', r.page, 'referrer', r.referrer, 'utm', r.utm,
        'created_at', r.created_at),
      headers := '{"Content-Type":"application/json"}'::jsonb);
    update public.fc_leads set hot_pinged_at = now() where id = r.id;
  end if;
  return true;
end $$;
revoke all on function public.fc_lead_profile(uuid,text,text,text,text,text,boolean) from public;
grant execute on function public.fc_lead_profile(uuid,text,text,text,text,text,boolean) to anon;

-- How far people get through the questions, by week (team only, follows fc_leads access).
create or replace view public.fc_intake_steps with (security_invoker = true) as
select date_trunc('week', created_at)::date as week_start,
  count(*) as emails,
  count(timeline) as answered_timeline,
  count(plan) as answered_buy_or_rent,
  count(budget) as answered_budget,
  count(phone) as left_phone,
  count(*) filter (where timeline = 'This year') as this_year,
  count(hot_pinged_at) as hot_alerts
from public.fc_leads
where ref is not null and status <> 'test'
group by 1 order by 1 desc;
grant select on public.fc_intake_steps to authenticated;
