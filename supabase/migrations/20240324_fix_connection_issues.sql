-- Drop existing tables if they exist
drop table if exists public.health_check cascade;
drop table if exists public.verified_business_names cascade;

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- Create health check table
create table public.health_check (
  id uuid primary key default uuid_generate_v4(),
  status text not null check (status in ('ok', 'error', 'maintenance')),
  last_checked timestamp with time zone default now(),
  details jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

-- Create verified business names table
create table public.verified_business_names (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  source_url text,
  industry text,
  entity_type text,
  verified_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.health_check enable row level security;
alter table public.verified_business_names enable row level security;

-- Create policies
create policy "Allow anonymous read access to health check"
  on health_check for select
  using (true);
  
create policy "Allow system insert to health check"
  on health_check for insert
  with check (true);
  
create policy "Allow system update to health check"
  on health_check for update
  using (true);

create policy "Anyone can read verified business names"
  on verified_business_names for select
  using (true);

-- Create indexes
create index verified_business_names_name_idx on verified_business_names using gin (name gin_trgm_ops);
create index verified_business_names_industry_idx on verified_business_names(industry);
create index verified_business_names_entity_type_idx on verified_business_names(entity_type);
create index verified_business_names_verified_at_idx on verified_business_names(verified_at);

-- Insert initial health check record
insert into health_check (status, details)
values ('ok', '{"message": "System operational", "version": "1.0.0"}'::jsonb);

-- Insert sample verified business names
insert into verified_business_names (name, source_url, industry, entity_type) values
('PS Advisory LLC', 'https://www.psadvisory.com', 'Professional Services', 'LLC'),
('Acme Technology Solutions LLC', 'https://www.acmetech.com', 'Technology', 'LLC'),
('Global Manufacturing Inc.', 'https://www.globalmfg.com', 'Manufacturing', 'Inc.'),
('Healthcare Partners Group LLC', 'https://www.healthcarepartners.com', 'Healthcare', 'LLC'),
('Construction Services Corp.', 'https://www.constructionservices.com', 'Construction', 'Corporation');

-- Create function to normalize business names
create or replace function normalize_business_name(name text)
returns text as $$
begin
  -- Remove legal suffixes
  name := regexp_replace(name, '\s+(LLC|Inc\.|Corp\.|Corporation|Ltd\.|LP|LLP)$', '', 'i');
  
  -- Convert to lowercase and remove special characters
  return regexp_replace(
    lower(trim(name)),
    '[^a-z0-9\s]',
    '',
    'g'
  );
end;
$$ language plpgsql immutable;

-- Create function to calculate similarity
create or replace function business_name_similarity(name1 text, name2 text)
returns float as $$
declare
  normalized1 text;
  normalized2 text;
  similarity_score float;
begin
  normalized1 := normalize_business_name(name1);
  normalized2 := normalize_business_name(name2);
  
  -- Calculate similarity using trigram similarity
  similarity_score := similarity(normalized1, normalized2);
  
  -- Boost score for exact matches after normalization
  if normalized1 = normalized2 then
    similarity_score := 1.0;
  end if;
  
  return similarity_score;
end;
$$ language plpgsql immutable;

-- Create function to search business names
create or replace function search_business_names(
  search_query text,
  min_similarity float default 0.3
)
returns table (
  id uuid,
  name text,
  similarity float,
  source_url text,
  industry text,
  entity_type text
) as $$
begin
  -- Validate inputs
  if search_query is null or length(trim(search_query)) < 2 then
    return;
  end if;
  
  -- Ensure min_similarity is within valid range
  min_similarity := greatest(0.0, least(1.0, min_similarity));

  return query
  select 
    vbn.id,
    vbn.name,
    business_name_similarity(vbn.name, search_query) as similarity,
    vbn.source_url,
    vbn.industry,
    vbn.entity_type
  from verified_business_names vbn
  where business_name_similarity(vbn.name, search_query) >= min_similarity
  order by 
    business_name_similarity(vbn.name, search_query) desc,
    vbn.verified_at desc
  limit 10;
end;
$$ language plpgsql stable;