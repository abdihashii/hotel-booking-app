create table rooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
