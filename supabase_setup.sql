-- =========================================================
-- 寶水果 MY FRUITS — 訂單表 + RLS
-- 在 Supabase 專案的 SQL Editor 貼上整段執行即可。
-- 安全模型：匿名訪客「只能新增訂單(insert)」，不能讀取/修改別人訂單。
-- 後台用 service_role key 或登入帳號才看得到訂單。
-- =========================================================

create table if not exists public.myfruits_orders (
  id               bigint generated always as identity primary key,
  created_at       timestamptz not null default now(),
  customer_name    text not null,
  phone            text not null,
  product          text not null,                 -- 等級（AA / A / B / 普通）
  purchase_unit    text,                          -- 一箱 / 單果
  quantity         integer not null default 1 check (quantity > 0 and quantity < 1000),
  pickup_type      text not null,                 -- 到店自取 / 澳門送貨 / 氹仔送貨 / 路環送貨
  pickup_date      date,
  pickup_time      text,
  delivery_address text,
  payment_method   text,
  note             text,
  order_status     text not null default '新訂單'  -- 新訂單/已聯絡/已確認/已付款/已備貨/已完成/已取消
);

-- 開啟 Row Level Security
alter table public.myfruits_orders enable row level security;

-- 只允許匿名/已登入訪客「新增」訂單（不能 select/update/delete）
drop policy if exists "anon can insert orders" on public.myfruits_orders;
create policy "anon can insert orders"
  on public.myfruits_orders
  for insert
  to anon, authenticated
  with check (true);

-- （可選）防灌水：限制單筆備註/地址長度，避免被塞垃圾
alter table public.myfruits_orders
  add constraint note_len check (char_length(coalesce(note,'')) <= 1000),
  add constraint addr_len check (char_length(coalesce(delivery_address,'')) <= 500);

-- 後台讀取：用 Supabase Dashboard 的 Table Editor，或建一個已登入的 admin 帳號後再加 select policy。
-- 例（日後做後台再開）：
-- create policy "admin can read" on public.myfruits_orders
--   for select to authenticated using ( auth.jwt() ->> 'email' = 'YOUR_ADMIN_EMAIL' );
