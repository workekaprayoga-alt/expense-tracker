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
const BUDGET_TOTAL = 0;

// Budget khusus rumah (untuk halaman istri)
const BUDGET_RUMAH = 0;

// =====================================================
// KALIMAT SEMANGAT untuk istri (rotasi otomatis tiap aplikasi dibuka)
// Tambah/edit sesuka hati. v3.6 sudah berisi lebih banyak kata-kata.
// =====================================================
const KALIMAT_SEMANGAT = [
  { quote: 'Setiap rupiah yang kamu catat, adalah doa kecil yang menjaga rumah kita.', sub: 'Aku sayang kamu, terima kasih sudah jadi penjaga rezeki keluarga.' },
  { quote: 'Rezeki itu mengalir, bukan datang sekaligus. Yang penting kita berdua jalan bareng.', sub: 'Pelan-pelan, aku ada di belakangmu. Selalu.' },
  { quote: 'Istri yang menghemat itu bukan pelit — dia sedang menanam masa depan.', sub: 'Kamu hebat, Sayang. Beneran.' },
  { quote: 'Surga di telapak kaki ibu, dan ridho suami menemani langkahnya.', sub: 'Aku ridho. Aku bangga. Aku cinta.' },
  { quote: 'Jauh hanya soal jarak. Hati kita sudah lama tinggal serumah.', sub: 'Sebentar lagi kita kumpul, ya. Sabar bareng-bareng.' },
  { quote: 'Rezeki keluarga ini Allah yang atur. Tugas kita: ikhlas, hemat, dan saling percaya.', sub: 'Tiga-tiganya kamu sudah lakukan. Aku bersyukur.' },
  { quote: 'Belanja sayur, beli popok, masak buat anak — itu semua ibadah, Sayang.', sub: 'Pahala kamu sedang dihitung sama yang Maha Kaya.' },
  { quote: 'Tidak ada rezeki yang tertukar. Yang kita punya hari ini cukup, insyaAllah.', sub: 'Cukup karena ada kamu di sisi anak kita.' },
  { quote: 'Pernikahan kita seperti tabungan: tiap hari nambah, walau sedikit.', sub: 'Dan aku gak akan pernah menarik isinya. Selamanya.' },
  { quote: 'Capek itu wajar. Tapi kamu kuat, karena kamu istri pilihan Allah untukku.', sub: 'Istirahat kalau lelah, ya. Aku selalu menunggu kabarmu.' },
  { quote: 'Uang habis bisa dicari lagi. Istri seperti kamu — gak akan ketemu dua kali.', sub: 'Aku bersyukur tiap hari, lho.' },
  { quote: 'Setiap pengeluaran kecil hari ini, adalah bata untuk rumah masa depan kita.', sub: 'Bareng-bareng kita bangun, ya.' },
  { quote: 'Sebaik-baik perhiasan dunia adalah istri yang sholihah. Itu kamu, Sayang.', sub: 'HR. Muslim — dan dibuktikan tiap hari sama kamu.' },
  { quote: 'Kerja kerasku jauh dari rumah, jadi ringan karena tahu kamu menjaga semuanya.', sub: 'Terima kasih sudah jadi rumah tempat aku pulang.' },
  { quote: 'Rezeki tidak akan tertukar. Yang kita perjuangkan, akan sampai pada waktunya.', sub: 'Tetap semangat, ya. Anak kita lihat tegarnya ibunya.' },
  { quote: 'Catatan kecil hari ini bisa jadi keputusan besar yang menyelamatkan bulan ini.', sub: 'Makasih sudah teliti, Sayang.' },
  { quote: 'Kita tidak harus kaya hari ini. Kita hanya perlu rapi, sabar, dan kompak.', sub: 'Aku percaya sama kita.' },
  { quote: 'Yang kamu catat bukan cuma belanja, tapi bentuk sayangmu ke keluarga.', sub: 'Aku lihat usahamu, dan aku bangga.' },
  { quote: 'Hemat bukan berarti menahan bahagia, tapi memilih bahagia yang lebih panjang.', sub: 'Nanti kita nikmati hasilnya bareng-bareng.' },
  { quote: 'Setiap hari kamu menjaga rumah, aku belajar lebih keras menjaga masa depan kita.', sub: 'Kita sedang saling menguatkan.' },
  { quote: 'Uang bisa dihitung, tapi perjuanganmu tidak ternilai.', sub: 'Terima kasih sudah kuat dan lembut sekaligus.' },
  { quote: 'Kalau hari ini terasa berat, ingat: kamu tidak sendirian.', sub: 'Aku tetap di sini, satu tim denganmu.' },
  { quote: 'Belanja yang dicatat membuat pikiran lebih tenang.', sub: 'Pelan-pelan, rumah kita makin tertata.' },
  { quote: 'Bukan besar kecilnya uang, tapi besar kecilnya ikhtiar kita menjaganya.', sub: 'Dan ikhtiar kamu luar biasa.' },
  { quote: 'Setiap angka di aplikasi ini adalah cerita tentang kita yang sedang berjuang.', sub: 'Semoga Allah mudahkan jalan keluarga kecil kita.' },
  { quote: 'Kamu adalah rumah yang aku rindukan, bukan sekadar orang yang aku tinggalkan untuk bekerja.', sub: 'Tunggu aku pulang, ya.' },
  { quote: 'Sabar kita hari ini akan jadi cerita manis untuk anak kita nanti.', sub: 'Kita sedang membangun kenangan baik.' },
  { quote: 'Mencatat pengeluaran itu sederhana, tapi dampaknya besar untuk ketenangan keluarga.', sub: 'Makasih sudah mau repot sebentar.' },
  { quote: 'Kita boleh jauh di jarak, tapi jangan jauh dalam kabar dan rencana.', sub: 'Aplikasi ini jadi jembatan kecil kita.' },
  { quote: 'Kalau ada pengeluaran mendadak, jangan takut cerita.', sub: 'Kita hadapi sebagai suami-istri, bukan sendiri-sendiri.' },
  { quote: 'Rumah tangga bukan soal siapa paling banyak berkorban, tapi siapa yang paling mau saling menjaga.', sub: 'Aku mau terus menjagamu.' },
  { quote: 'Hari ini mungkin cuma belanja kecil, tapi dicatat berarti kita sedang belajar bijak.', sub: 'Aku suka caramu menjaga amanah.' },
  { quote: 'Allah tahu lelahmu, bahkan saat tidak ada yang melihat.', sub: 'Semoga setiap langkahmu jadi pahala.' },
  { quote: 'Kita sedang latihan hidup tertata, bukan hidup sempurna.', sub: 'Tidak apa-apa pelan, asal bersama.' },
  { quote: 'Aku tidak menuntut kamu sempurna. Aku cuma ingin kita saling terbuka.', sub: 'Soal uang pun begitu, ya Sayang.' },
  { quote: 'Kalau budget mulai menipis, bukan berarti gagal. Itu tanda kita perlu bicara dan menata ulang.', sub: 'Bicaranya baik-baik, hatinya tetap dekat.' },
  { quote: 'Terima kasih sudah jadi ibu yang kuat, istri yang sabar, dan teman hidup yang aku pilih lagi setiap hari.', sub: 'Aku sayang kamu lebih dari kemarin.' },
  { quote: 'Satu catatan kecil, satu langkah lebih dekat ke tenang.', sub: 'Kita kumpulkan ketenangan itu pelan-pelan.' },
  { quote: 'Nafkah itu bukan cuma uang yang dikirim, tapi juga rasa aman yang kita jaga bersama.', sub: 'Aku akan terus belajar memberi yang terbaik.' },
  { quote: 'Tidak semua hari harus mudah. Yang penting kita tidak saling melepas.', sub: 'Pegang tanganku dari jauh, Sayang.' },
  { quote: 'Kalau hari ini kamu sudah mencatat, berarti kamu sudah membantu aku melihat keadaan rumah dengan jelas.', sub: 'Itu sangat berarti buatku.' },
  { quote: 'Kecil-kecil lama-lama jadi cukup. Cukup-cukup lama-lama jadi berkah.', sub: 'Semoga rezeki kita selalu berkah.' },
  { quote: 'Anak kita tidak hanya butuh uang, tapi juga orang tua yang saling percaya.', sub: 'Mari terus rawat kepercayaan ini.' },
  { quote: 'Aku kerja di luar, kamu menjaga di rumah. Dua-duanya perjuangan.', sub: 'Tidak ada yang lebih kecil di mata Allah.' },
  { quote: 'Setiap kali kamu membuka aplikasi ini, ingat: ini bukan aplikasi uang saja.', sub: 'Ini catatan cinta dan ikhtiar keluarga kita.' },
  { quote: 'Semoga yang keluar hari ini diganti dengan rezeki yang lebih baik dan hati yang lebih lapang.', sub: 'Aamiin untuk keluarga kecil kita.' },
  { quote: 'Kita tidak sedang mengejar gengsi. Kita sedang mengejar tenang.', sub: 'Dan tenang itu mahal, Sayang.' },
  { quote: 'Kalau ada sisa sedikit, kita syukuri. Kalau kurang, kita cari solusi.', sub: 'Yang penting jangan saling menyalahkan.' },
  { quote: 'Uang yang dikelola dengan cinta akan terasa lebih cukup.', sub: 'Karena di dalamnya ada sabar, syukur, dan percaya.' },
  { quote: 'Aku bangga punya istri yang mau diajak menata masa depan, bukan cuma menikmati hari ini.', sub: 'Kamu partner terbaikku.' },
];

// =====================================================
// MODE KELUARGA v3.5
// Isi URL foto kalau punya foto online. Kalau kosong, aplikasi pakai avatar inisial yang cantik.
// Contoh: const FOTO_SUAMI_URL = 'https://.../foto-suami.jpg';
// =====================================================
const FOTO_SUAMI_URL = '';
const FOTO_ISTRI_URL = '';
const NAMA_KELUARGA = 'Keluarga Eka & Erfina';
const TARGET_DEFAULT_LABEL = 'Tabungan masa depan keluarga';
const TARGET_DEFAULT_AMOUNT = 1000000;
const TARGET_DEFAULT_NOTE = 'Untuk rumah, anak, dan hari tenang kita.';

// Reminder di dalam aplikasi. Catatan: notifikasi otomatis penuh butuh layanan push.
const REMINDER_DEFAULT_TIME = '21:00';
const REMINDER_TEXT_ISTRI = 'Jangan lupa catat belanja hari ini, Sayang.';
const REMINDER_TEXT_SUAMI = 'Cek pengeluaran rumah dan rantau hari ini.';
