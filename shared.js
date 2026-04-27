// ==================================================
// SHARED LIBRARY - dipakai di index.html dan admin.html
// ==================================================

// Format angka ribuan dengan titik
const fmtRp = n => 'Rp ' + Math.round(Number(n) || 0).toLocaleString('id-ID');
const fmtNum = n => (Math.round(Number(n) || 0)).toLocaleString('id-ID');

// Parse input angka yang di-format (50.000 → 50000)
function parseNum(str) {
  if (typeof str === 'number') return str;
  return parseFloat(String(str || '').replace(/[^\d]/g, '')) || 0;
}

// Inisialisasi input angka dengan format ribuan otomatis
function initNumberInput(inputEl) {
  inputEl.addEventListener('input', e => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    e.target.value = raw ? Number(raw).toLocaleString('id-ID') : '';
  });
}

// Tombol cepat tambah angka
function attachQuickButtons(container, inputEl) {
  container.querySelectorAll('[data-quick]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = parseNum(inputEl.value);
      const add = parseNum(btn.dataset.quick);
      inputEl.value = (current + add).toLocaleString('id-ID');
      inputEl.focus();
      // haptic feedback
      if (navigator.vibrate) navigator.vibrate(10);
    });
  });
}

// Local-date key (YYYY-MM-DD) — TIDAK pakai toISOString supaya gak geser timezone
function localDateKey(d) {
  const dt = (d instanceof Date) ? d : new Date(d);
  return dt.getFullYear() + '-' +
    String(dt.getMonth() + 1).padStart(2, '0') + '-' +
    String(dt.getDate()).padStart(2, '0');
}

// SVG Icons (semua 20x20)
const ICONS = {
  cart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
  baby: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>',
  food: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18v2a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-2zM7 11V7a2 2 0 0 1 4 0v4M14 11V7a2 2 0 0 1 4 0v4"/></svg>',
  coffee: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM6 2v3M10 2v3M14 2v3"/></svg>',
  bike: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M12 17l-3-9h-3M14 7h3l2 7M9 17h6"/></svg>',
  phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  bulb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6V17c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/></svg>',
  health: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.5 3-5.5a5.5 5.5 0 0 0-10-3.2A5.5 5.5 0 0 0 2 8.5c0 2 1.5 4 3 5.5l7 7 7-7z"/></svg>',
  card: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  send: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  box: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  message: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>',
  download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  chat: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>',
  heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  sparkle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/></svg>'
};

function iconHtml(name, size) {
  const s = size || 18;
  const svg = ICONS[name] || ICONS.box;
  if (s === 18) return svg;
  return svg.replace(/width="\d+"/, 'width="' + s + '"').replace(/height="\d+"/, 'height="' + s + '"');
}

// API helpers
async function apiGet(params) {
  // Tambahkan parameter unik agar data tidak ketahan cache browser/PWA.
  const q = Object.assign({}, params || {}, { _t: Date.now() });
  const url = API_URL + '?' + new URLSearchParams(q).toString();
  const res = await fetch(url, { cache: 'no-store' });
  return res.json();
}

async function apiPost(body) {
  // text/plain dipakai supaya request jadi "simple request" (gak trigger preflight CORS)
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
    cache: 'no-store'
  });
  return res.json();
}

function setSyncStatus(id) {
  const el = document.getElementById(id || 'sync-status');
  if (!el) return;
  const d = new Date();
  el.textContent = 'Terakhir sinkron ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

// Util format tanggal
function fmtDate(iso) {
  const d = new Date(iso);
  const today = new Date();
  const yest = new Date(today.getTime() - 86400000);
  if (d.toDateString() === today.toDateString()) return 'Hari ini';
  if (d.toDateString() === yest.toDateString()) return 'Kemarin';
  return d.getDate() + '/' + (d.getMonth() + 1);
}

function fmtTime(iso) {
  const d = new Date(iso);
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Generate CSV string from expenses
function toCSV(expenses) {
  const headers = ['Tanggal', 'Waktu', 'Nominal', 'Kategori', 'Lokasi', 'Catatan', 'Pesan', 'Oleh'];
  const rows = expenses.map(e => {
    const d = new Date(e.timestamp);
    return [
      d.toLocaleDateString('id-ID'),
      fmtTime(e.timestamp),
      e.amount,
      e.category,
      e.location,
      (e.note || '').replace(/"/g, '""'),
      (e.message || '').replace(/"/g, '""'),
      e.who || ''
    ].map(v => '"' + v + '"').join(',');
  });
  return [headers.map(h => '"' + h + '"').join(','), ...rows].join('\n');
}

function downloadCSV(filename, content) {
  const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getCategoryMeta(id) {
  return CATEGORIES.find(c => c.id === id) || { id: id, label: id, icon: 'box' };
}

// Pilih kalimat semangat berdasarkan tanggal (rotasi harian, deterministik)
function getKalimatHariIni() {
  if (typeof KALIMAT_SEMANGAT === 'undefined' || !KALIMAT_SEMANGAT.length) return null;
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const idx = dayOfYear % KALIMAT_SEMANGAT.length;
  return KALIMAT_SEMANGAT[idx];
}

// Sapaan berdasar waktu
function getSapaan() {
  const h = new Date().getHours();
  if (h < 11) return 'Selamat pagi';
  if (h < 15) return 'Selamat siang';
  if (h < 18) return 'Selamat sore';
  return 'Selamat malam';
}

// Toast notif (gantikan alert untuk feedback ringan)
function toast(text, type) {
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'err' ? ' toast-err' : '');
  el.textContent = text;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

// Konfirmasi modal custom (gantikan confirm())
function confirmModal(text) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show confirm-overlay';
    overlay.innerHTML =
      '<div class="modal confirm-modal">' +
        '<p style="margin:6px 0 18px; font-size:15px;">' + escapeHtml(text) + '</p>' +
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">' +
          '<button class="btn-secondary" data-act="cancel">Batal</button>' +
          '<button class="save-btn" data-act="ok" style="margin:0;">Ya</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => {
      const act = e.target.dataset.act;
      if (act === 'ok' || act === 'cancel') {
        overlay.remove();
        resolve(act === 'ok');
      } else if (e.target === overlay) {
        overlay.remove();
        resolve(false);
      }
    });
  });
}

// ==================================================
// FAMILY MODE v3.5 HELPERS
// ==================================================

let familySettings = {};

function photoSettingKey(role) {
  return role === 'suami' ? 'photo_suami' : 'photo_istri';
}

async function loadFamilySettings() {
  try {
    const res = await safeGet({ type: 'settings' });
    familySettings = res.data || {};
  } catch (e) {
    familySettings = {};
  }
}

function getFamilyPhoto(role) {
  const key = photoSettingKey(role);
  const saved = familySettings[key] || localStorage.getItem('family_' + key) || '';
  if (saved) return saved;
  if (role === 'suami' && typeof FOTO_SUAMI_URL !== 'undefined') return FOTO_SUAMI_URL || '';
  if (role === 'istri' && typeof FOTO_ISTRI_URL !== 'undefined') return FOTO_ISTRI_URL || '';
  return '';
}

async function saveFamilyPhoto(role, dataUrl) {
  const key = photoSettingKey(role);
  familySettings[key] = dataUrl || '';
  try {
    if (dataUrl) localStorage.setItem('family_' + key, dataUrl);
    else localStorage.removeItem('family_' + key);
  } catch (e) {}
  await safePost({ action: 'setting_set', key: key, value: dataUrl || '' });
}

function refreshFamilyStrip() {
  const el = document.getElementById('header-family-strip');
  if (el) el.innerHTML = familyStripHtml();
}

function imageFileToDataUrl(file, maxSize, quality) {
  maxSize = maxSize || 360;
  quality = quality || 0.82;
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      reject(new Error('File harus gambar'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = maxSize;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const scale = Math.max(size / img.width, size / img.height);
        const sw = size / scale;
        const sh = size / scale;
        const sx = (img.width - sw) / 2;
        const sy = (img.height - sh) / 2;
        ctx.fillStyle = '#fff8f3';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
        let out = canvas.toDataURL('image/jpeg', quality);
        if (out.length > 42000) out = canvas.toDataURL('image/jpeg', 0.68);
        if (out.length > 48000) out = canvas.toDataURL('image/jpeg', 0.55);
        resolve(out);
      };
      img.onerror = () => reject(new Error('Gambar tidak bisa dibaca'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

function getKalimatPembuka() {
  if (typeof KALIMAT_SEMANGAT === 'undefined' || !KALIMAT_SEMANGAT.length) return null;
  let idx = 0;
  try {
    const last = parseInt(localStorage.getItem('family_quote_index') || '-1', 10);
    idx = Number.isFinite(last) ? (last + 1) % KALIMAT_SEMANGAT.length : 0;
    localStorage.setItem('family_quote_index', String(idx));
  } catch (e) {
    idx = Math.floor(Math.random() * KALIMAT_SEMANGAT.length);
  }
  return KALIMAT_SEMANGAT[idx];
}

function buildCatButtons(container, onSelect) {
  if (!container) return;
  container.innerHTML = '';
  CATEGORIES.forEach(c => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt-btn';
    b.dataset.cat = c.id;
    b.innerHTML = iconHtml(c.icon, 16) + '<span>' + escapeHtml(c.label) + '</span>';
    b.onclick = () => {
      onSelect(c.id);
      container.querySelectorAll('.opt-btn').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      if (navigator.vibrate) navigator.vibrate(10);
    };
    container.appendChild(b);
  });
}

function sumAmount(rows) { return (rows || []).reduce((s, r) => s + (Number(r.amount) || 0), 0); }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function pct(used, limit) { return limit > 0 ? clamp((used / limit) * 100, 0, 999) : 0; }
function shortName(name) { return String(name || '').trim().split(/\s+/)[0] || ''; }
function initials(name) {
  const p = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!p.length) return '❤';
  return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
}

function avatarHtml(name, photoUrl, role) {
  const safeName = escapeHtml(name || 'Keluarga');
  if (photoUrl) {
    return '<div class="family-avatar has-photo ' + (role || '') + '"><img src="' + escapeHtml(photoUrl) + '" alt="' + safeName + '" loading="lazy"></div>';
  }
  return '<div class="family-avatar ' + (role || '') + '"><span>' + escapeHtml(initials(name)) + '</span></div>';
}

function familyStripHtml() {
  const suami = getFamilyPhoto('suami');
  const istri = getFamilyPhoto('istri');
  return '<div class="family-strip">' +
    avatarHtml(typeof NAMA_SUAMI !== 'undefined' ? NAMA_SUAMI : 'Suami', suami, 'suami') +
    '<div class="family-heart">❤</div>' +
    avatarHtml(typeof NAMA_ISTRI !== 'undefined' ? NAMA_ISTRI : 'Istri', istri, 'istri') +
    '</div>';
}

function locationLabel(loc) {
  if (loc === 'rantau') return '🧳 Rantau';
  if (loc === 'rumah') return '🏠 Rumah';
  return 'Keluarga';
}


// ===== Cashflow v3.8.2 =====
function normText(v) {
  return String(v || '').toLowerCase().trim();
}

function isKirimKeRumah(row) {
  const cat = normText(row && row.category);
  const note = normText(row && row.note);
  return cat === 'kirim' || cat === 'kirim ke rumah' || note.includes('kirim ke rumah');
}

function incomeByLocation(incomeRows, loc) {
  return sumAmount((incomeRows || []).filter(i => normText(i.location) === loc));
}

function expenseByLocation(expenseRows, loc, options) {
  options = options || {};
  return sumAmount((expenseRows || []).filter(e => {
    if (normText(e.location) !== loc) return false;
    if (options.excludeKirim && isKirimKeRumah(e)) return false;
    return true;
  }));
}

function transferToHome(expenseRows) {
  return sumAmount((expenseRows || []).filter(isKirimKeRumah));
}

function calcHomeCashflow(expenseRows, incomeRows) {
  const transferIn = transferToHome(expenseRows || []);
  const directIn = incomeByLocation(incomeRows || [], 'rumah');
  const masuk = transferIn + directIn;
  const keluar = expenseByLocation(expenseRows || [], 'rumah', { excludeKirim: true });
  return { masuk, transferIn, directIn, keluar, sisa: masuk - keluar, percent: masuk > 0 ? (keluar / masuk) * 100 : 0 };
}

function calcRantauCashflow(expenseRows, incomeRows) {
  const masuk = incomeByLocation(incomeRows || [], 'rantau');
  const keluar = expenseByLocation(expenseRows || [], 'rantau');
  return { masuk, keluar, sisa: masuk - keluar, percent: masuk > 0 ? (keluar / masuk) * 100 : 0 };
}

function calcFamilyCashflow(expenseRows, incomeRows) {
  const masuk = sumAmount(incomeRows || []);
  const keluar = sumAmount(expenseRows || []);
  return { masuk, keluar, sisa: masuk - keluar, percent: masuk > 0 ? (keluar / masuk) * 100 : 0 };
}

function cashflowNote(flow, label) {
  if (!flow || !flow.masuk) return 'Uang masuk ' + (label || 'bulan ini') + ' belum dicatat.';
  return 'Sudah terpakai ' + (flow.percent || 0).toFixed(1).replace('.', ',') + '% dari uang masuk.';
}

function expenseBudgetLimit(scope) {
  return 0;
}

function progressClass(percent) {
  if (percent >= 100) return 'danger';
  if (percent >= 85) return 'warn';
  return 'ok';
}

function progressHtml(value, max, label) {
  const p = pct(value, max);
  return '<div class="mini-progress ' + progressClass(p) + '">' +
    '<div class="mini-progress-fill" style="width:' + clamp(p, 0, 100) + '%"></div>' +
    '</div>' +
    '<div class="tiny-muted">' + escapeHtml(label || (Math.round(p) + '%')) + '</div>';
}

function apiErrorMessage(err) {
  return (err && err.message) ? err.message : 'Tidak ada koneksi';
}

async function safeGet(params, fallback) {
  try {
    const res = await apiGet(params);
    if (!res || res.ok === false) throw new Error((res && res.error) || 'API gagal');
    return res;
  } catch (e) {
    console.error('apiGet failed', params, e);
    return fallback || { ok: false, data: [], error: apiErrorMessage(e) };
  }
}

async function safePost(body) {
  const res = await apiPost(body);
  if (!res || res.ok === false) throw new Error((res && res.error) || 'API gagal');
  return res;
}

function groupByDate(rows) {
  const map = {};
  (rows || []).forEach(r => {
    const key = localDateKey(new Date(r.timestamp));
    if (!map[key]) map[key] = [];
    map[key].push(r);
  });
  return Object.keys(map).sort((a, b) => b.localeCompare(a)).map(key => ({ date: key, rows: map[key] }));
}

function prettyDateKey(key) {
  const parts = String(key).split('-').map(Number);
  if (parts.length !== 3) return key;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return fmtDate(d.toISOString());
}

function renderTimeline(rows, opts) {
  opts = opts || {};
  if (!rows || rows.length === 0) return '<div class="empty">Belum ada data</div>';
  return groupByDate(rows).map(g => {
    const daily = sumAmount(g.rows);
    const items = g.rows.map(e => {
      const cat = getCategoryMeta(e.category);
      const msg = e.message ? '<div class="item-message">💌 ' + escapeHtml(e.message) + '</div>' : '';
      const actions = opts.editable ? '<div class="item-actions"><button onclick="openEdit(\'' + e.id + '\')">Edit</button><button onclick="deleteExpenseById(\'' + e.id + '\')">Hapus</button></div>' : '';
      return '<div class="timeline-item">' +
        '<div class="timeline-icon">' + iconHtml(cat.icon, 16) + '</div>' +
        '<div class="timeline-main"><div class="timeline-top"><strong>' + escapeHtml(e.note || cat.label) + '</strong><span>' + fmtRp(e.amount) + '</span></div>' +
        '<div class="timeline-meta">' + fmtTime(e.timestamp) + ' · ' + escapeHtml(cat.label) + ' · ' + locationLabel(e.location) + (e.who ? ' · ' + escapeHtml(shortName(e.who)) : '') + '</div>' + msg + actions + '</div>' +
      '</div>';
    }).join('');
    return '<div class="timeline-day"><div class="timeline-day-head"><span>' + prettyDateKey(g.date) + '</span><b>' + fmtRp(daily) + '</b></div>' + items + '</div>';
  }).join('');
}

function renderCategorySummary(rows) {
  if (!rows || rows.length === 0) return '<div class="empty">Belum ada data</div>';
  const total = sumAmount(rows);
  const map = {};
  rows.forEach(e => { map[e.category] = (map[e.category] || 0) + (Number(e.amount) || 0); });
  return Object.keys(map).sort((a, b) => map[b] - map[a]).map(catId => {
    const cat = getCategoryMeta(catId);
    const p = total ? Math.round(map[catId] / total * 100) : 0;
    return '<div class="cat-row">' +
      '<div class="cat-info">' + iconHtml(cat.icon, 16) + '<span>' + escapeHtml(cat.label) + '</span></div>' +
      '<div class="cat-num"><b>' + fmtRp(map[catId]) + '</b><small>' + p + '%</small></div>' +
      '</div>' + progressHtml(map[catId], total, '') ;
  }).join('');
}

function renderMiniChart(container, daily, key) {
  if (!container) return;
  key = key || 'total';
  const values = (daily || []).map(d => Number(d[key]) || 0);
  const max = Math.max(1, ...values);
  container.innerHTML = (daily || []).map(d => {
    const h = Math.max(7, Math.round((Number(d[key]) || 0) / max * 100));
    const label = String(d.date || '').slice(5).replace('-', '/');
    return '<div class="bar-wrap"><div class="bar-value">' + (d[key] ? fmtNum(d[key]) : '') + '</div><div class="bar" style="height:' + h + '%"></div><div class="bar-label">' + label + '</div></div>';
  }).join('');
}

function nextDueInfo(day) {
  const now = new Date();
  const dueDay = clamp(Number(day) || 1, 1, 31);
  let due = new Date(now.getFullYear(), now.getMonth(), dueDay);
  if (due < new Date(now.getFullYear(), now.getMonth(), now.getDate())) due = new Date(now.getFullYear(), now.getMonth() + 1, dueDay);
  const diff = Math.ceil((due - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
  return { date: due, days: diff, label: diff === 0 ? 'Hari ini' : diff === 1 ? 'Besok' : diff + ' hari lagi' };
}

function renderBillsList(bills, compact) {
  const active = (bills || []).filter(b => b.active !== false).sort((a, b) => nextDueInfo(a.due_day).days - nextDueInfo(b.due_day).days);
  if (!active.length) return '<div class="empty">Belum ada jatuh tempo rutin</div>';
  return active.map(b => {
    const cat = getCategoryMeta(b.category);
    const due = nextDueInfo(b.due_day);
    return '<div class="bill-row ' + (due.days <= 3 ? 'urgent' : '') + '">' +
      '<div class="bill-main"><strong>' + escapeHtml(b.label) + '</strong><span>' + escapeHtml(cat.label) + ' · ' + locationLabel(b.location) + '</span></div>' +
      '<div class="bill-side"><b>' + fmtRp(b.amount) + '</b><small>' + due.label + '</small></div>' +
      (compact ? '' : '<button class="link-danger" onclick="deleteBillById(\'' + b.id + '\')">Hapus</button>') +
      '</div>';
  }).join('');
}

function insightFrom(expenses, incomes) {
  expenses = expenses || [];
  incomes = incomes || [];
  const total = sumAmount(expenses);
  const masuk = sumAmount(incomes);
  const sisa = masuk - total;
  const byCat = {};
  expenses.forEach(e => byCat[e.category] = (byCat[e.category] || 0) + (Number(e.amount) || 0));
  const top = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a]).slice(0, 3);
  let lines = [];
  lines.push('Pengeluaran bulan ini ' + fmtRp(total) + '.');
  if (masuk > 0) lines.push('Uang masuk tercatat ' + fmtRp(masuk) + ', sisa ' + fmtRp(sisa) + '.');
  if (top.length) lines.push('Kategori paling besar: ' + top.map(id => getCategoryMeta(id).label + ' ' + fmtRp(byCat[id])).join(', ') + '.');
  const todayKey = localDateKey(new Date());
  const today = expenses.filter(e => localDateKey(new Date(e.timestamp)) === todayKey);
  if (today.length) lines.push('Hari ini sudah tercatat ' + today.length + ' transaksi senilai ' + fmtRp(sumAmount(today)) + '.');
  if (!expenses.length) lines.push('Belum ada pengeluaran bulan ini.');
  return lines;
}

function installReminderUI(kind) {
  const box = document.getElementById('reminder-box');
  if (!box) return;
  const key = 'family_reminder_' + kind;
  const on = localStorage.getItem(key + '_on') !== '0';
  const time = localStorage.getItem(key + '_time') || (typeof REMINDER_DEFAULT_TIME !== 'undefined' ? REMINDER_DEFAULT_TIME : '21:00');
  const text = kind === 'istri' ? (typeof REMINDER_TEXT_ISTRI !== 'undefined' ? REMINDER_TEXT_ISTRI : 'Jangan lupa catat belanja hari ini.') : (typeof REMINDER_TEXT_SUAMI !== 'undefined' ? REMINDER_TEXT_SUAMI : 'Cek pengeluaran hari ini.');
  box.innerHTML = '<div class="reminder-card"><div><strong>🔔 Pengingat harian</strong><p>' + escapeHtml(text) + '</p></div>' +
    '<div class="reminder-controls"><input type="time" id="reminder-time" value="' + escapeHtml(time) + '"><button class="btn-secondary" id="reminder-toggle">' + (on ? 'Aktif' : 'Mati') + '</button></div></div>';
  document.getElementById('reminder-time').onchange = e => { localStorage.setItem(key + '_time', e.target.value); toast('Jam pengingat disimpan'); };
  document.getElementById('reminder-toggle').onclick = e => {
    const nowOn = localStorage.getItem(key + '_on') !== '0';
    localStorage.setItem(key + '_on', nowOn ? '0' : '1');
    e.target.textContent = nowOn ? 'Mati' : 'Aktif';
    toast(nowOn ? 'Pengingat dimatikan' : 'Pengingat diaktifkan');
  };
}

function renderFamilyTarget(target, allMonthExpenses, allMonthIncomes) {
  target = target || {};
  const targetAmount = Number(target.monthly_target) || (typeof TARGET_DEFAULT_AMOUNT !== 'undefined' ? TARGET_DEFAULT_AMOUNT : 1000000);
  const label = target.label || (typeof TARGET_DEFAULT_LABEL !== 'undefined' ? TARGET_DEFAULT_LABEL : 'Target keluarga');
  const totalOut = sumAmount(allMonthExpenses || []);
  const totalIn = sumAmount(allMonthIncomes || []);
  const budget = typeof BUDGET_TOTAL !== 'undefined' ? BUDGET_TOTAL : 0;
  const savedByBudget = Math.max(0, budget - totalOut);
  const savedByIncome = totalIn > 0 ? Math.max(0, totalIn - totalOut) : savedByBudget;
  const progress = pct(savedByIncome, targetAmount);
  const left = Math.max(0, targetAmount - savedByIncome);
  return '<div class="family-target-card">' +
    '<div class="target-head"><div><span class="eyebrow">🎯 Target Kita</span><h2>' + escapeHtml(label) + '</h2></div>' + familyStripHtml() + '</div>' +
    '<div class="target-amount"><b>' + fmtRp(savedByIncome) + '</b><span>/ ' + fmtRp(targetAmount) + '</span></div>' +
    '<div class="target-bar"><div style="width:' + clamp(progress, 0, 100) + '%"></div></div>' +
    '<p>' + (left > 0 ? 'Tinggal ' + fmtRp(left) + ' lagi. Pelan-pelan, yang penting kompak ❤' : 'Target bulan ini tercapai. Kalian hebat ❤') + '</p>' +
    (target.note ? '<small>' + escapeHtml(target.note) + '</small>' : '') +
    '</div>';
}

// ===== Savings targets v3.7: target tabungan manual, tidak dihitung otomatis dari sisa gaji =====
function renderSavingsTargets(targets, options) {
  options = options || {};
  targets = targets || [];
  const admin = !!options.admin;
  const compact = !!options.compact;
  if (!targets.length) {
    return '<div class="empty">Belum ada target tabungan. Tambahkan target seperti mudik, dana darurat, sekolah anak, atau liburan keluarga.</div>';
  }
  const totalTarget = targets.reduce((a, t) => a + (Number(t.target_amount) || 0), 0);
  const totalSaved = targets.reduce((a, t) => a + (Number(t.saved_total) || 0), 0);
  const intro = compact ? '' : '<div class="savings-overview"><div><span>Total terkumpul</span><b>' + fmtRp(totalSaved) + '</b></div><div><span>Total target</span><b>' + fmtRp(totalTarget) + '</b></div></div>';
  return intro + '<div class="savings-target-list">' + targets.map(t => {
    const target = Number(t.target_amount) || 0;
    const saved = Number(t.saved_total) || 0;
    const savedMonth = Number(t.saved_month) || 0;
    const progress = pct(saved, target);
    const left = Math.max(0, target - saved);
    const entries = (t.entries_month || []).slice(0, 3).map(e => '<div class="saving-entry"><span>' + escapeHtml(e.source || 'Setoran') + (e.note ? ' · ' + escapeHtml(e.note) : '') + '</span><b>' + fmtRp(e.amount) + '</b>' + (admin ? '<button onclick="deleteSavingEntryById(\'' + e.id + '\')">×</button>' : '') + '</div>').join('');
    return '<div class="savings-target-card">' +
      '<div class="savings-target-top"><div class="savings-icon">' + escapeHtml(t.icon || '🎯') + '</div><div><strong>' + escapeHtml(t.label || 'Target keluarga') + '</strong>' + (t.note ? '<small>' + escapeHtml(t.note) + '</small>' : '') + '</div></div>' +
      '<div class="savings-amount"><b>' + fmtRp(saved) + '</b><span>/ ' + fmtRp(target) + '</span></div>' +
      '<div class="savings-bar"><div style="width:' + clamp(progress, 0, 100) + '%"></div></div>' +
      '<div class="savings-meta"><span>Bulan ini: ' + fmtRp(savedMonth) + '</span><span>' + (left > 0 ? 'Kurang ' + fmtRp(left) : 'Tercapai ❤') + '</span></div>' +
      (entries ? '<div class="saving-entry-list">' + entries + '</div>' : '<div class="tiny-muted">Belum ada setoran bulan ini.</div>') +
      (admin ? '<div class="savings-actions"><button class="btn-secondary micro" onclick="openSavingModal(\'' + t.id + '\')">+ Setor</button><button class="btn-secondary micro danger-text" onclick="deleteTargetById(\'' + t.id + '\')">Hapus target</button></div>' : '') +
      '</div>';
  }).join('') + '</div>';
}

function savingsSummaryLine(targets) {
  targets = targets || [];
  const totalSaved = targets.reduce((a, t) => a + (Number(t.saved_total) || 0), 0);
  const totalMonth = targets.reduce((a, t) => a + (Number(t.saved_month) || 0), 0);
  return 'Tabungan target terkumpul ' + fmtRp(totalSaved) + ', setoran bulan ini ' + fmtRp(totalMonth) + '.';
}
