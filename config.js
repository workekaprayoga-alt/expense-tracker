// =====================================================
// PENTING: GANTI URL DI BAWAH DENGAN URL APPS SCRIPT KAMU
// =====================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzCFFrwzVJ596D6DqoNUCkJGYaeMTA0xfIFYP8pNr-dPWVE0L2cLCXKmUf3uWRTChQaKQ/execPASTE_URL_APPS_SCRIPT_KAMU_DI_SINI';

// Identitas
const NAMA_ISTRI = 'ERFINA WIDI ANINGSIH';
const NAMA_SUAMI = 'EKA PRAYOGA';

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
