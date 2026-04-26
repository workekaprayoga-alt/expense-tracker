// =====================================================
// PENTING: GANTI URL DI BAWAH DENGAN URL APPS SCRIPT KAMU
// =====================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzCFFrwzVJ596D6DqoNUCkJGYaeMTA0xfIFYP8pNr-dPWVE0L2cLCXKmUf3uWRTChQaKQ/exec';

// Identitas
const NAMA_ISTRI = 'ERFINA WIDI ANINGSIH';
const NAMA_SUAMI = 'EKA PRAYOGA';

// Panggilan sayang (yang akan muncul di kalimat semangat)
const PANGGILAN_ISTRI = 'Sayang';

// PIN untuk halaman admin (suami)
const ADMIN_PIN = 'QWERTY';

// Daftar kategori (bisa kamu edit/tambah/kurangi)
const CATEGORIES = [
  { id: 'belanja',   label: 'Belanja dapur', icon: 'cart' },
  { id: 'anak',      label: 'Anak',          icon: 'baby' },
  { id: 'makan',     label: 'Makan',         icon: 'food' },
  { id: 'jajan',     label: 'Jajan & kopi',  icon: 'coffee' },
  { id: 'transport', label: 'Transport',     icon: 'bike' },
  { id: 'pulsa',     label: 'Pulsa & internet', icon: 'phone' },
  { id: 'listrik',   label: 'Listrik & air', icon: 'bulb' },
  { id: 'kesehatan', label: 'Kesehatan',     icon: 'health' },
  { id: 'cicilan',   label: 'Cicilan/paylater', icon: 'card' },
  { id: 'kirim',     label: 'Kirim ke rumah', icon: 'send' },
  { id: 'lain',      label: 'Lain-lain',     icon: 'box' }
];

// Budget bulanan default per kategori (bisa diubah dari halaman admin)
// Yang ada di sheet Budgets akan override yang ini.
const BUDGET_DEFAULTS = {
  belanja: 1500000,
  anak: 800000,
  makan: 800000,
  jajan: 300000,
  transport: 400000,
  pulsa: 200000,
  listrik: 200000,
  kesehatan: 200000,
  cicilan: 750000,
  kirim: 0,
  lain: 300000
};

// Total budget bulanan
const BUDGET_TOTAL = 8000000;

// Budget khusus rumah (untuk halaman istri)
const BUDGET_RUMAH = 3500000;

// =====================================================
// KALIMAT SEMANGAT untuk istri (rotasi otomatis tiap buka aplikasi)
// Tambah/edit sesuka hati
// =====================================================
const KALIMAT_SEMANGAT = [
  {
    quote: 'Setiap rupiah yang kamu catat, adalah doa kecil yang menjaga rumah kita.',
    sub: 'Aku sayang kamu, terima kasih sudah jadi penjaga rezeki keluarga.'
  },
  {
    quote: 'Rezeki itu mengalir, bukan datang sekaligus. Yang penting kita berdua jalan bareng.',
    sub: 'Pelan-pelan, aku ada di belakangmu. Selalu.'
  },
  {
    quote: 'Istri yang menghemat itu bukan pelit — dia sedang menanam masa depan.',
    sub: 'Kamu hebat, Sayang. Beneran.'
  },
  {
    quote: 'Surga di telapak kaki ibu, dan ridho suami menemani langkahnya.',
    sub: 'Aku ridho. Aku bangga. Aku cinta.'
  },
  {
    quote: 'Jauh hanya soal jarak. Hati kita sudah lama tinggal serumah.',
    sub: 'Sebentar lagi kita kumpul, ya. Sabar bareng-bareng.'
  },
  {
    quote: 'Rezeki keluarga ini Allah yang atur. Tugas kita: ikhlas, hemat, dan saling percaya.',
    sub: 'Tiga-tiganya kamu sudah lakukan. Aku bersyukur.'
  },
  {
    quote: 'Belanja sayur, beli popok, masak buat anak — itu semua ibadah, Sayang.',
    sub: 'Pahala kamu sedang dihitung sama yang Maha Kaya.'
  },
  {
    quote: 'Tidak ada rezeki yang tertukar. Yang kita punya hari ini cukup, insyaAllah.',
    sub: 'Cukup karena ada kamu di sisi anak kita.'
  },
  {
    quote: 'Pernikahan kita seperti tabungan: tiap hari nambah, walau sedikit.',
    sub: 'Dan aku gak akan pernah menarik isinya. Selamanya.'
  },
  {
    quote: 'Capek itu wajar. Tapi kamu kuat, karena kamu istri pilihan Allah untukku.',
    sub: 'Istirahat kalau lelah, ya. Aku selalu menunggu kabarmu.'
  },
  {
    quote: 'Uang habis bisa dicari lagi. Istri seperti kamu — gak akan ketemu dua kali.',
    sub: 'Aku bersyukur tiap hari, lho.'
  },
  {
    quote: 'Setiap pengeluaran kecil hari ini, adalah bata untuk rumah masa depan kita.',
    sub: 'Bareng-bareng kita bangun, ya.'
  },
  {
    quote: 'Sebaik-baik perhiasan dunia adalah istri yang sholihah. Itu kamu, Sayang.',
    sub: 'HR. Muslim — dan dibuktikan tiap hari sama kamu.'
  },
  {
    quote: 'Kerja kerasku jauh dari rumah, jadi ringan karena tahu kamu menjaga semuanya.',
    sub: 'Terima kasih sudah jadi rumah tempat aku pulang.'
  },
  {
    quote: 'Rezeki tidak akan tertukar. Yang kita perjuangkan, akan sampai pada waktunya.',
    sub: 'Tetap semangat, ya. Anak kita lihat tegarnya ibunya.'
  }
];
