-- Nov 5 2026: after someone gives us their email, the thank you screen asks
-- timeline, buy or rent, budget, then name and phone (all optional, one tap each).
-- MUST be applied before the site change goes live: the site starts sending `ref`
-- with every lead, and inserts fail if the column doesn't exist.
alter table public.fc_leads
  add column if not exists ref uuid,
  add column if not exists plan text,
  add column if not exists budget text,
  add column if not exists profiled_at timestamptz;
create unique index if not exists fc_leads_ref_key on public.fc_leads(ref);
grant insert (ref) on public.fc_leads to anon;

-- Only the browser that made the lead knows its random ref, and only for 2 days.
create or replace function public.fc_lead_profile(
  p_ref uuid, p_timeline text default null, p_plan text default null,
  p_budget text default null, p_name text default null, p_phone text default null)
returns boolean language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if p_ref is null then return false; end if;
  if p_timeline is not null and p_timeline not in ('This year','In 1 to 2 years','Just dreaming') then p_timeline := null; end if;
  if p_plan is not null and p_plan not in ('Buy','Rent first','Not sure yet') then p_plan := null; end if;
  if p_budget is not null and p_budget not in ('Under $400K','$400K to $750K','$750K to $1.5M','$1.5M and up','Not sure yet') then p_budget := null; end if;
  update public.fc_leads set
    timeline = coalesce(p_timeline, timeline),
    plan = coalesce(p_plan, plan),
    budget = coalesce(p_budget, budget),
    name = coalesce(nullif(left(btrim(p_name),80),''), name),
    phone = coalesce(nullif(left(btrim(p_phone),40),''), phone),
    profiled_at = now()
  where ref = p_ref and created_at > now() - interval '2 days';
  get diagnostics n = row_count;
  return n > 0;
end $$;
revoke all on function public.fc_lead_profile(uuid,text,text,text,text,text) from public;
grant execute on function public.fc_lead_profile(uuid,text,text,text,text,text) to anon;
