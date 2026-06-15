# 賣水果 My Fruit — D197 貓山王榴槤 Landing Page

黑金奢華風的榴槤預訂單頁。純靜態（HTML/CSS/JS），可直接放 GitHub Pages，
訂單透過 Supabase JS client 直接寫入資料庫（無需後端伺服器），並有 WhatsApp 後備。

## 檔案
| 檔案 | 用途 |
|------|------|
| `index.html` | 頁面結構（Hero / 品牌 / 產地 / 風味 / 商品 / 預訂表單 / 取送貨 / FAQ / Footer） |
| `styles.css` | 全部樣式（黑金主題、響應式、動畫） |
| `config.js`  | **你只需要改這個** — WhatsApp 號碼、Supabase 設定、商品清單 |
| `app.js`     | 互動邏輯（商品渲染、表單送出、進場動畫） |
| `supabase_setup.sql` | 在 Supabase SQL Editor 執行一次，建訂單表 + 安全規則 |

## 上線 3 步

### 1. 改 `config.js`
- `whatsappNumber`：你的 WhatsApp 號碼（澳門 853 開頭，例 `85362345678`）
- `products`：填上每個商品的價格 `price`、約重、到貨日、庫存狀態
- `supabaseUrl` / `supabaseAnonKey`：見第 2 步（暫時留空也能跑，會自動改用 WhatsApp 送單）

### 2. 設定 Supabase 訂單入庫
1. 進 Supabase 專案 → SQL Editor → 貼上 `supabase_setup.sql` 執行
2. Project Settings → API → 複製 `Project URL` 與 `anon public` key
3. 貼進 `config.js` 的 `supabaseUrl` / `supabaseAnonKey`

> anon key 可公開放在前端，安全靠 RLS：訪客只能「新增訂單」，看不到任何訂單。
> 後台看訂單：用 Supabase Dashboard 的 Table Editor。

### 3. 部署到 GitHub Pages
推到 repo 後，Settings → Pages → 選 `main` 分支 `/ (root)`，即可得到網址。

## 之後可升級（第二版）
- 自訂後台管理頁（商品 / 訂單 / 時段 / 客戶）
- 線上付款、自動 WhatsApp 通知、會員、優惠券
- 把手繪 SVG 榴槤換成真實產品照（`index.html` 的 `.hero__art` 與商品卡 `.prod__media`）
