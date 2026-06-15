/* =========================================================
   賣水果 My Fruit — 互動邏輯
   ========================================================= */
(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- 年份 ---------- */
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- nav scrolled 狀態 ---------- */
  const nav = $("#nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 捲動進場動畫 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Hero 榴槤刺（程式生成，更飽滿） ---------- */
  const spikeBox = $(".durian__spikes");
  if (spikeBox) {
    const N = 60, cx = 50, cy = 51, r = 33;
    let html = '<svg viewBox="0 0 100 100" style="width:100%;height:100%">';
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r;
      const x2 = cx + Math.cos(a) * (r + 6.5), y2 = cy + Math.sin(a) * (r + 6.5);
      const w = cx + Math.cos(a + 0.05) * r, v = cy + Math.sin(a + 0.05) * r;
      html += `<path d="M${x1} ${y1} L${x2} ${y2} L${w} ${v} Z" fill="#11150c" stroke="#c9a24a" stroke-width=".35" opacity=".85"/>`;
    }
    html += "</svg>";
    spikeBox.innerHTML = html;
  }

  /* ---------- 商品圖示（金線榴槤 SVG，共用） ---------- */
  const durianIcon = `<svg viewBox="0 0 120 120"><defs>
      <radialGradient id="pf" cx="50%" cy="42%" r="60%">
        <stop offset="0%" stop-color="#f4d57a"/><stop offset="60%" stop-color="#e3b24c"/><stop offset="100%" stop-color="#9c7320"/>
      </radialGradient></defs>
      <g stroke="#c9a24a" stroke-width=".6" fill="#11150c">`
    + Array.from({ length: 34 }).map((_, i) => {
        const a = (i / 34) * Math.PI * 2, cx = 60, cy = 60, r = 36;
        const x1 = cx + Math.cos(a) * r, y1 = cy + Math.sin(a) * r;
        const x2 = cx + Math.cos(a) * (r + 8), y2 = cy + Math.sin(a) * (r + 8);
        const w = cx + Math.cos(a + 0.09) * r, v = cy + Math.sin(a + 0.09) * r;
        return `<path d="M${x1} ${y1} L${x2} ${y2} L${w} ${v} Z"/>`;
      }).join("")
    + `</g><circle cx="60" cy="60" r="36" fill="#11150c" stroke="#c9a24a" stroke-width="1"/>
       <path d="M60 30 C76 42 84 62 80 80 C76 94 70 104 60 108 C50 104 44 94 40 80 C36 62 44 42 60 30Z" fill="url(#pf)" opacity=".9"/>
       <path d="M60 38 C54 60 54 90 60 102 M48 50 C46 70 48 92 56 100 M72 50 C74 70 72 92 64 100" fill="none" stroke="#7a5618" stroke-width=".8" opacity=".5"/></svg>`;

  /* ---------- 渲染商品卡 + 表單下拉 ---------- */
  const grid = $("#prodGrid");
  const sel = $("#f_product");
  const cur = CFG.currency || "MOP";
  const unit = CFG.priceUnit || "磅";
  const boxNote = CFG.boxNote || "";
  const stockMap = {
    ok:  { cls: "ok",  txt: "● 供應中" },
    low: { cls: "low", txt: "● 極少量・先到先得" },
    out: { cls: "out", txt: "● 已售罄" },
  };
  const priceRow = (k, v) => v == null ? "" : `
    <div class="ppair"><span class="ppair__k">${k}</span>
      <span class="ppair__v"><i>${cur}</i><b>${v}</b><em>/${unit}</em></span></div>`;
  (CFG.products || []).forEach((p) => {
    const st = stockMap[p.stock] || stockMap.ok;
    if (grid) {
      const card = document.createElement("article");
      card.className = "prod reveal";
      card.innerHTML = `
        <div class="prod__media">
          <span class="prod__badge ${p.hot ? "prod__badge--hot" : ""}">${p.tier || "頂級貓山王"}</span>
          ${p.image
            ? `<img class="prod__img" src="${p.image}" alt="${p.name}" loading="lazy" />`
            : durianIcon}
        </div>
        <div class="prod__body">
          <div class="prod__grade">${p.grade || ""}</div>
          <h3 class="prod__name">${p.name}</h3>
          <p class="prod__desc">${p.desc || ""}</p>
          <div class="prod__prices">
            ${priceRow("一箱", p.priceBox)}
            ${priceRow("單果", p.priceSingle)}
          </div>
          ${boxNote ? `<div class="prod__boxnote">${boxNote}・以實際秤重計價</div>` : ""}
          <div class="prod__stock prod__stock--${st.cls}">${st.txt}</div>
          <a href="#order" class="btn ${p.stock === "out" ? "btn--ghost" : "btn--gold"}"
             data-pick="${p.name}">${p.stock === "out" ? "暫時售罄" : "立即預訂"}</a>
        </div>`;
      grid.appendChild(card);
      io.observe(card);
    }
    if (sel) {
      const o = document.createElement("option");
      o.value = p.name; o.textContent = p.name + (p.stock === "out" ? "（售罄）" : "");
      sel.appendChild(o);
    }
  });

  /* 點商品卡的「立即預訂」→ 自動選好下拉 */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-pick]");
    if (a && sel) { sel.value = a.getAttribute("data-pick"); }
  });

  /* ---------- WhatsApp 連結 ---------- */
  const waBase = CFG.whatsappNumber
    ? `https://wa.me/${CFG.whatsappNumber}`
    : null;
  function waUrl(text) {
    const base = waBase || "https://wa.me/";
    return base + "?text=" + encodeURIComponent(text);
  }
  const hello = "你好，我想預訂 D197 貓山王榴槤 🟡";
  ["#waLink", "#waFooter"].forEach((id) => { const el = $(id); if (el) el.href = waUrl(hello); });

  /* ---------- Supabase ---------- */
  let sb = null;
  if (CFG.supabaseUrl && CFG.supabaseAnonKey && window.supabase) {
    try { sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey); }
    catch (err) { console.warn("Supabase init 失敗：", err); }
  }

  /* ---------- 表單送出 ---------- */
  const form = $("#orderForm");
  const statusEl = $("#orderStatus");
  const btn = $("#submitBtn");

  function setStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "order__status" + (kind ? " " + kind : "");
  }

  function buildWaMessage(d) {
    return [
      "【賣水果 · 榴槤預訂】",
      `姓名：${d.customer_name}`,
      `電話：${d.phone}`,
      `商品：${d.product}（${d.purchase_unit}）×${d.quantity}`,
      `取貨：${d.pickup_type}`,
      d.pickup_date ? `日期：${d.pickup_date}` : null,
      d.pickup_time ? `時間：${d.pickup_time}` : null,
      d.delivery_address ? `地址：${d.delivery_address}` : null,
      `付款：${d.payment_method}`,
      d.note ? `備註：${d.note}` : null,
    ].filter(Boolean).join("\n");
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const data = Object.fromEntries(new FormData(form).entries());
      data.quantity = parseInt(data.quantity, 10) || 1;

      btn.disabled = true;
      setStatus("處理中…", "");

      // 1) 有設定 Supabase → 寫入資料庫
      if (sb) {
        try {
          const { error } = await sb.from(CFG.supabaseTable).insert([{
            customer_name: data.customer_name,
            phone: data.phone,
            product: data.product,
            purchase_unit: data.purchase_unit,
            quantity: data.quantity,
            pickup_type: data.pickup_type,
            pickup_date: data.pickup_date || null,
            pickup_time: data.pickup_time || null,
            delivery_address: data.delivery_address || null,
            payment_method: data.payment_method,
            note: data.note || null,
            order_status: "新訂單",
          }]);
          if (error) throw error;
          setStatus("✅ 已收到你的預訂，我們會盡快透過 WhatsApp 與你確認！", "ok");
          form.reset();
          // 同時開 WhatsApp 讓客人可即時聯絡（體驗更好）
          if (waBase) window.open(waUrl(buildWaMessage(data)), "_blank", "noopener");
          btn.disabled = false;
          return;
        } catch (err) {
          console.warn("Supabase 寫入失敗，改用 WhatsApp：", err);
          // 落到下面的 WhatsApp fallback
        }
      }

      // 2) 沒有 Supabase 或寫入失敗 → WhatsApp 送單
      const url = waUrl(buildWaMessage(data));
      setStatus("已為你開啟 WhatsApp，請按傳送完成預訂 👉", "ok");
      window.open(url, "_blank", "noopener");
      btn.disabled = false;
    });
  }
})();
