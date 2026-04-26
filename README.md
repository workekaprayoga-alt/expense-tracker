# Expense Tracker Keluarga v2

Aplikasi pencatat pengeluaran untuk keluarga LDM (long-distance marriage) atau yang merantau. Istri dan suami pakai aplikasi terpisah dengan tampilan berbeda, tapi datanya sinkron di satu Google Sheet.

---

## ✨ Fitur lengkap (v2)

**🔴 Fitur inti:**
- ✅ Pisahkan pengeluaran rantau (kamu) vs rumah (istri & anak)
- ✅ Edit transaksi yang salah input
- ✅ Hapus transaksi
- ✅ Format angka otomatis saat ngetik (50000 → 50.000)
- ✅ Tombol cepat nominal (+1rb, +5rb, +10rb, +50rb)
- ✅ Backup ke CSV (download semua data)

**🟡 Fitur kebiasaan:**
- ✅ Template pengeluaran rutin (bayar listrik, kirim uang ke rumah, dll — sekali tap)
- ✅ Bar chart 7 hari terakhir
- ✅ Budget per kategori dengan warning visual
- ✅ Pesan dari istri ke suami (catatan inline tiap transaksi)
- ✅ Logo aplikasi sendiri (bisa di-pin ke home screen kayak app native)
- ✅ Dark mode otomatis (ikut sistem HP)
- ✅ Tombol "Tanya Claude untuk analisis" — copy summary ke clipboard

---

## Arsitektur

```
[index.html]                      [admin.html]
 (untuk istri)                    (untuk suami, ada PIN)
       \                              /
        \                            /
         \--->  Google Apps Script  <---/
                  (Web App API)
                       |
                       v
                Google Sheet (3 sheet otomatis):
                - Expenses (data utama)
                - Templates (pengeluaran rutin)
                - Budgets (limit per kategori)
```

---

## SETUP — Lakukan SEKALI saja

### 1. Bikin Google Sheet baru

1. Buka https://sheets.google.com → klik "+ Blank"
2. Kasih nama: `Expense Tracker`
3. Biarkan kosong, sheet akan dibikin otomatis sama script

### 2. Pasang Apps Script (backend)

1. Di Google Sheet tadi, klik **Extensions → Apps Script**
2. Tab baru terbuka. Hapus semua kode default
3. Buka file `Code.gs` dari folder ini, copy semua isinya, paste ke Apps Script
4. Klik **Save** (Ctrl+S). Kasih nama project: `Expense API`
5. Klik **Deploy → New deployment**
6. Klik icon gear ⚙️, pilih **Web app**
7. Isi:
   - Description: `Expense API v2`
   - Execute as: **Me (your email)**
   - Who has access: **Anyone** ← PENTING harus Anyone
8. Klik **Deploy**
9. Authorize akses → klik **Advanced** → klik **Go to Expense API (unsafe)** → **Allow**
   (Ini "unsafe" karena kode bikinanmu sendiri, bukan masalah)
10. Copy **Web App URL** yang muncul (format: `https://script.google.com/macros/s/AKfyc.../exec`)

### 3. Edit config.js

Buka file `config.js`, edit:

```js
const API_URL = 'https://script.google.com/macros/s/AKfycb.../exec';  // ← URL kamu
const NAMA_ISTRI = 'Sari';      // ← nama istri
const NAMA_SUAMI = 'Budi';      // ← nama kamu
const ADMIN_PIN = '5678';       // ← PIN untuk halaman admin
```

(Optional) Edit juga `BUDGET_TOTAL`, `BUDGET_RUMAH`, dan `BUDGET_DEFAULTS` sesuai gaji & alokasi keluarga.

### 4. Deploy ke GitHub Pages

1. Buat repo baru di GitHub, **Public**
2. Upload semua file ini:
   - `index.html`
   - `admin.html`
   - `config.js`
   - `shared.js`
   - `styles.css`
   - `manifest.json`
   - `icon.svg`
   - `icon-192.svg`
3. Settings → Pages → Source: branch `main`, folder `/ (root)` → Save
4. Tunggu 1-2 menit. URL akan muncul: `https://username.github.io/expense-tracker/`

### 5. Bagikan ke istri & pin ke home screen

**Istri:** kasih link `https://username.github.io/expense-tracker/`

**Cara pin ke home screen di HP** (suruh istri lakukan ini):
- **Android (Chrome):** buka link → menu (⋮) → "Add to Home screen" → ikuti instruksi
- **iPhone (Safari):** buka link → tombol Share (kotak panah ke atas) → "Add to Home Screen"

Setelah dipin, akan muncul kayak aplikasi di HP, dengan logo yang sudah dibuat.

**Kamu:** simpan link `https://username.github.io/expense-tracker/admin.html` (jangan dishare ke siapa-siapa). Pin juga ke home screen.

---

## Cara pakai sehari-hari

### Untuk istri (index.html)
1. Tap aplikasi di home screen
2. Isi nominal → tombol cepat bisa untuk angka bulat
3. Pilih kategori
4. (Opsional) tulis pesan ke suami: "popok lagi diskon, beli 2 dus"
5. Tap Simpan

### Untuk suami (admin.html)
1. Tap aplikasi → masukkan PIN
2. Lihat dashboard: total semua, breakdown rantau vs rumah, chart 7 hari
3. Cek bagian "Budget per kategori" → kalau ada yg merah berarti tembus
4. Baca pesan dari istri di tiap transaksi yang ada label "pesan"
5. Catat pengeluaran rantau kamu sendiri (jajan, kopi, transport)
6. Setiap akhir bulan: klik "Tanya Claude untuk analisis" → paste ke chat Claude → dapat insight

### Pengeluaran rutin (template)
- Suami buat template di halaman admin: "Kirim ke rumah Rp 2 juta", "Bayar listrik Rp 200rb"
- Setiap bulan, tinggal tap chip template-nya, langsung tercatat
- Istri juga bisa pakai template lokasi rumah dari halaman dia

### Budget per kategori
- Suami klik tombol "Atur" di card budget
- Set limit bulanan tiap kategori (misal Belanja dapur Rp 1.5jt)
- Bar progress otomatis muncul dengan warna: hijau < 70% < kuning < 90% < merah

### Backup data
- Klik "Download CSV" di halaman admin → file CSV disimpan di HP
- Bisa dibuka di Excel atau diimpor ke aplikasi keuangan lain
- Backup ini gak menggantikan Google Sheet yang sudah otomatis tersimpan

---

## Update dari v1 ke v2

Kalau kamu sudah deploy v1 sebelumnya:

1. **Backend:** Buka Apps Script lama → hapus semua kode → paste isi `Code.gs` v2 → Save → Deploy → **Manage deployments** → klik icon pensil → **New version** → Deploy. URL TETAP SAMA.
2. **Frontend:** Replace semua file di GitHub repo dengan file v2. Pastikan `config.js` lama disesuaikan dengan format baru (ada `ADMIN_PIN`, `BUDGET_*`, `CATEGORIES`).
3. Data lama di Google Sheet **gak akan hilang**. Sheet `Templates` dan `Budgets` akan dibuat otomatis saat dibutuhkan.

---

## Troubleshooting

**"Tidak ada koneksi" tapi internet ada:**
- Cek URL di `config.js`, pastikan diakhiri `/exec`
- Buka URL itu di browser, kalau muncul JSON `{"ok":true,...}` berarti API jalan
- Kalau muncul "Authorization required", deploy ulang dengan setting "Anyone"

**Edit Apps Script tapi gak ngaruh:**
- Setiap edit di Apps Script harus **Deploy → Manage deployments → New version**
- Bukan cukup Save aja

**Mau tambah/ubah kategori:**
- Edit array `CATEGORIES` di `config.js`. Otomatis berubah di kedua halaman.

**Mau ganti logo:**
- Edit file `icon.svg` dan `icon-192.svg` (format SVG, gampang)

**Push notif gak ada?**
- Memang sengaja gak ditambahkan. Push notif PWA gak konsisten dan butuh server. Pakai **Google Calendar reminder** dengan link aplikasi sebagai alternatif simpel.

---

## Catatan keamanan

⚠️ Web App "Anyone" = siapa pun yang tahu URL bisa akses API. URL-nya panjang & random, jadi praktis aman selama gak disebar. Untuk keluarga, ini cukup.

PIN di admin.html itu cuma penghalang sederhana. Bukan keamanan tingkat bank.

Data tersimpan di Google Sheet milik kamu. Privacy aman.

---

## File yang ada di project ini

| File | Fungsi |
|------|--------|
| `Code.gs` | Backend Apps Script (di-paste ke Google Sheet) |
| `config.js` | Config: API URL, nama, PIN, kategori, budget |
| `shared.js` | Library shared: format angka, icons SVG, API helpers |
| `styles.css` | Semua styling, dark mode, components |
| `index.html` | Halaman istri |
| `admin.html` | Halaman suami (dengan PIN) |
| `manifest.json` | PWA manifest untuk pin ke home screen |
| `icon.svg` | Logo aplikasi |
| `icon-192.svg` | Logo PWA (192x192) |
| `README.md` | File ini |

Selamat mengelola keuangan keluarga 💪
