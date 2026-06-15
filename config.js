/* =========================================================
   寶水果 MY FRUITS — 設定檔
   只需改這個檔，不用碰 app.js / index.html
   ========================================================= */
window.SITE_CONFIG = {

  /* ---- 聯絡資訊 ---- */
  // WhatsApp 國際格式，澳門 853 開頭、不要加 + 或空格。
  whatsappNumber: "85362823037",

  /* ---- 幣別 / 計價單位 ---- */
  currency: "MOP",
  priceUnit: "磅",                       // 按磅計價
  boxNote: "整箱約 12kg（約 26 磅）",      // 一箱規格說明

  /* ---- Supabase 訂單入庫 ---- */
  supabaseUrl:     "https://jytzgrstqtemoolrflrm.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dHpncnN0cXRlbW9vbHJmbHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MTcyNDAsImV4cCI6MjA5NzA5MzI0MH0.9NyOtXbc5a9NxjMdG_bEKc-caHWl208PiKvNwsIWtYE",
  supabaseTable:   "myfruits_orders",

  /* ---- 商品（4 等級・按磅計・單果 vs 一箱雙價）----
     priceSingle = 單果價/磅   priceBox = 一箱價/磅
     stock: "ok"=供應中  "low"=少量  "out"=售罄
     hot: true 顯示紅色強調標籤 */
  products: [
    {
      id: "aa",
      grade: "AA Grade",
      tier: "極少量",
      name: "D197 貓山王 AA 級",
      desc: "頂級中的頂級，數量極少。果肉最飽滿、奶香最濃，行家首選、送禮體面。",
      priceSingle: 98, priceBox: 88,
      image: "images/p-aa.jpg",
      stock: "low",
      hot: true,
    },
    {
      id: "a",
      grade: "A Grade",
      tier: "精選",
      name: "D197 貓山王 A 級",
      desc: "精選等級，風味濃郁、賣相佳。最受歡迎，自用宴客皆宜。",
      priceSingle: 88, priceBox: 78,
      image: "images/p-a.jpg",
      stock: "ok",
      hot: false,
    },
    {
      id: "b",
      grade: "B Grade",
      tier: "優質",
      name: "D197 貓山王 B 級",
      desc: "優質之選，貓山王風味同樣到位，性價比高，適合一家人放心食。",
      priceSingle: 75, priceBox: 65,
      image: "images/p-b.jpg",
      stock: "ok",
      hot: false,
    },
    {
      id: "std",
      grade: "Standard",
      tier: "普通",
      name: "D197 貓山王 普通級",
      desc: "入門嚐鮮之選，價格最親民，照樣樹上熟成、產地直送。",
      priceSingle: 60, priceBox: 48,
      image: "images/p-std.jpg",
      stock: "ok",
      hot: false,
    },
  ],
};
