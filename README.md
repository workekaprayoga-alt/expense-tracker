# Expense Tracker Keluarga v3.6

Versi ini menambahkan mode keluarga yang lebih personal untuk aplikasi kamu dan istri.

## Fitur baru

- 🎯 Target keluarga bulanan dengan progress otomatis.
- 🏦 Dompet/saldo: uang masuk, uang keluar, sisa uang rumah dan keluarga.
- 💌 Pesan kecil suami-istri di dalam aplikasi.
- 🧾 Rekap transaksi model timeline per hari.
- 🤖 Insight bulanan otomatis di dashboard admin.
- 🔔 Pengingat harian di dalam aplikasi.
- 📅 Pengeluaran rutin dengan tanggal jatuh tempo.
- 🧡 Mode keluarga: avatar suami-istri, sapaan, tampilan lebih personal.
- 🎨 Ikon aplikasi baru yang lebih premium untuk PWA/home screen.

## Cara update dari versi lama

1. Backup dulu file lama atau repo GitHub kamu.
2. Replace semua file frontend di GitHub Pages dengan file dari folder ini:
   - `index.html`
   - `admin.html`
   - `config.js`
   - `shared.js`
   - `styles.css`
   - `manifest.json`
   - `icon.svg`
   - `icon-192.svg`
   - `icon-512.svg`
3. Buka Google Sheet → Extensions → Apps Script.
4. Replace semua isi script dengan `Code.gs` versi ini.
5. Klik Save.
6. Klik Deploy → Manage deployments → icon pensil → New version → Deploy.
7. Tunggu GitHub Pages update 1–2 menit.
8. Buka aplikasi dengan cache-buster:
   - Istri: `https://username.github.io/repo/?v=family35`
   - Admin: `https://username.github.io/repo/admin.html?v=family35`

## Personalisasi foto

Di `config.js`, isi:

```js
const FOTO_SUAMI_URL = 'https://link-foto-suami.jpg';
const FOTO_ISTRI_URL = 'https://link-foto-istri.jpg';
```

Kalau dikosongkan, aplikasi otomatis pakai avatar inisial yang sudah dibuat cantik.

## Catatan penting

Fitur reminder di versi ini adalah pengingat di dalam aplikasi. Notifikasi otomatis yang tetap muncul saat aplikasi tertutup penuh membutuhkan sistem push notification/service tambahan.

## Sheet baru otomatis

Backend akan membuat sheet baru saat fitur dipakai:

- `Incomes`
- `Messages`
- `Targets`
- `Bills`

Sheet lama tetap dipakai:

- `Expenses`
- `Templates`
- `Budgets`


## Update v3.6

Tambahan dari v3.5:

- Upload foto suami dan istri langsung dari halaman admin.
- Foto otomatis dicrop kotak dan dikompres agar aman disimpan di Google Sheet.
- Foto tersinkron ke halaman istri dan admin lewat sheet `Settings`.
- Kalimat semangat sekarang berubah otomatis setiap aplikasi dibuka ulang.
- Jumlah kalimat semangat ditambah menjadi 50.
- Avatar mode keluarga dibuat lebih cantik saat foto belum dipasang.

Cara pakai foto:
1. Buka `admin.html`.
2. Masukkan PIN.
3. Buka bagian **Alat**.
4. Klik **Atur mode keluarga & foto**.
5. Upload foto suami dan foto istri.
6. Tunggu pesan “Foto tersimpan”.
7. Buka ulang aplikasi istri dengan `?v=family36` kalau masih kena cache lama.

Backend:
- Wajib update `Code.gs` ke versi ini dan deploy ulang sebagai **New version**.
- Script akan membuat sheet baru bernama `Settings` otomatis.
