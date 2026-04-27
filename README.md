# Expense Tracker Keluarga v3.8

Versi ini menambahkan notifikasi keluarga lewat Telegram dan email cadangan, sambil mempertahankan fitur target tabungan manual dari v3.7.

## Perubahan utama v3.8

- 🔔 Notifikasi Telegram saat istri input pengeluaran rumah → suami.
- 💌 Notifikasi Telegram saat istri kirim pesan → suami.
- 💌 Notifikasi Telegram saat suami kirim pesan → istri.
- 🧳 Opsional: notifikasi pengeluaran rantau → istri.
- 📧 Email cadangan kalau Telegram belum lengkap atau gagal.
- ⚙️ Panel **Notifikasi keluarga** di halaman admin.
- 🎯 Target tabungan tidak lagi muncul paling atas.
- 🎯 Target dipindah ke bagian bawah setelah dompet/saldo keluarga.
- 🎯 Target tidak lagi otomatis dihitung dari `uang masuk - pengeluaran`.
- 🎯 Kamu bisa membuat banyak target, misalnya:
  - Mudik
  - Dana darurat
  - Sekolah anak
  - Liburan keluarga
  - Rumah
- 💰 Setoran target diinput manual dari sisa gaji/bonus/uang yang benar-benar disisihkan.
- 📊 Setiap target punya progress sendiri.
- 🧾 Setoran bulan ini tampil di bawah tiap target.
- 🗂️ Backend otomatis membuat sheet baru:
  - `SavingsTargets`
  - `SavingsEntries`

## Fitur sebelumnya tetap ada

- 🏦 Dompet/saldo: uang masuk, uang keluar, sisa uang rumah dan keluarga.
- 💌 Pesan kecil suami-istri di dalam aplikasi.
- 🧾 Rekap transaksi model timeline per hari.
- 🤖 Insight bulanan otomatis di dashboard admin.
- 🔔 Pengingat harian di dalam aplikasi.
- 📅 Pengeluaran rutin dengan tanggal jatuh tempo.
- 🧡 Mode keluarga dan upload foto suami-istri dari halaman admin.
- 🎨 Ikon aplikasi PWA/home screen.

## Cara update dari v3.7 / v3.6

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
   - Istri: `https://username.github.io/repo/?v=family38`
   - Admin: `https://username.github.io/repo/admin.html?v=family38`

## Cara pakai target baru

1. Buka admin.
2. Scroll ke bagian **Tabungan & target keluarga**.
3. Klik **+ Target**.
4. Isi nama target dan nominal target.
5. Kalau sudah benar-benar menyisihkan uang, klik **+ Setor** di target tersebut.
6. Isi nominal setoran, misalnya dari sisa gaji, bonus, atau THR.

Catatan: angka target sekarang tidak otomatis mengambil sisa uang. Ini memang dibuat manual supaya lebih akurat dengan tabungan nyata.


## Cara mengaktifkan notifikasi Telegram

1. Buka Telegram, cari **@BotFather**.
2. Kirim `/newbot`, buat nama bot, lalu salin **Bot Token**.
3. Chat dulu ke bot buatanmu minimal satu kali, misalnya kirim `Halo`.
4. Cari Chat ID kamu dan istri. Cara praktis:
   - Buka browser: `https://api.telegram.org/botTOKEN_BOT_KAMU/getUpdates`
   - Lihat angka pada bagian `chat.id`.
   - Lakukan juga dari akun Telegram istri supaya dapat Chat ID istri.
5. Buka halaman admin aplikasi.
6. Klik **🛠 Alat → 🔔 Atur notifikasi keluarga**.
7. Isi Bot Token, Chat ID suami, Chat ID istri, dan email cadangan jika mau.
8. Klik **Simpan pengaturan notifikasi**.
9. Klik **Tes ke suami** dan **Tes ke istri**.

## Kapan notifikasi terkirim?

- Pengeluaran lokasi **Rumah** → notif ke suami, aktif default.
- Pengeluaran lokasi **Rantau** → notif ke istri, mati default agar tidak terlalu ramai.
- Pesan dari istri → notif ke suami, aktif default.
- Pesan dari suami → notif ke istri, aktif default.

Pengaturan bisa diubah kapan saja dari panel notifikasi admin.

Catatan keamanan: Bot Token disimpan di sheet `Settings`. Jangan bagikan link admin dan PIN ke orang lain.


## Update v3.8.1

Patch ini memperbaiki sinkronisasi data antar perangkat dengan menambahkan cache-busting pada request API, tombol Refresh, status terakhir sinkron, dan filter Rekap di aplikasi istri: Rumah / Semua. Kalau data admin tidak terlihat di aplikasi istri, buka filter **Semua** karena default aplikasi istri tetap menampilkan data lokasi Rumah.
