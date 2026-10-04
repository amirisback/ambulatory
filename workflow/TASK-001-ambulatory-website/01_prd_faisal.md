# 📄 PRD: Ambulatory Care Hospital Website (TASK-001)

**Product Manager:** Faisal (`faisal_pm`)  
**Status:** In-Progress (Contract Frozen)  
**Target Delivery:** Next.js 16.3, React 19, Tailwind CSS v4, Serwist PWA, TypeScript Strict  

---

## 1. Product Overview & Objectives

Website **RS Ambulatory Care** adalah portal digital rumah sakit modern yang berfokus pada layanan rawat jalan terintegrasi (*ambulatory care*). Website ini dirancang untuk:
1. Memperkenalkan layanan unggulan poliklinik spesialis dan fasilitas diagnostik rumah sakit.
2. Memudahkan pasien dewasa dan keluarga mencari dokter spesialis, mengecek jadwal praktik, serta melakukan reservasi janji temu konsultasi secara instan tanpa antrean manual.
3. Memberikan akses cepat ke layanan gawat darurat dan kontak ambulans 24 jam.
4. Memberikan pengalaman pengguna yang cepat, terpercaya, aksesibel, dan mendukung PWA untuk kemudahan akses di perangkat mobile.

### User Personas & Stories:
- **Pasien Rawat Jalan (Bpk. Hendra, 45 tahun):** Ingin mencari dokter spesialis penyakit dalam, melihat jadwal praktik hari ini atau besok, dan langsung memesan nomor antrean sebelum datang ke rumah sakit.
- **Keluarga Pasien (Ibu Rina, 32 tahun):** Ingin mengetahui informasi poliklinik anak dan fasilitas laboratorium penunjang, serta kontak darurat rumah sakit untuk penanganan cepat.
- **Pengguna Mobile / Pasien Sibuk:** Membutuhkan website yang ringan, dapat diinstal sebagai PWA di ponsel pintar, navigasi mudah dengan satu tangan, dan tampilan yang jelas baik siang maupun malam.

---

## 2. Acceptance Criteria (AC)

- **`AC-01: Arsitektur & Kebersihan Repositori`**
  - Rute demo `/demo-encryption` dihapus dari direktori proyek sesuai aturan wajib GUIDELINE.md poin 13.
  - Menggunakan App Router Next.js 16 (`src/app/`), Server Components sebagai default, path alias `@/*`.
- **`AC-02: Design System & Theming Medis (Tailwind CSS v4)`**
  - Token warna di `globals.css` terkalibrasi untuk citra medis profesional (Deep Teal `#0d5c63`, Soft Aqua `#e6f4f5`, crisp neutral).
  - Mode Gelap (Dark Mode) berfungsi penuh dengan kontras teks memenuhi standar WCAG AA (≥ 4.5:1 untuk teks normal, ≥ 3:1 untuk headline/elemen besar).
- **`AC-03: Kelengkapan Halaman & Navigasi`**
  - Tersedia 4 rute utama:
    - `/` (Beranda: Hero, Layanan Poliklinik, Tim Dokter, Alur Pasien, Fasilitas Penunjang).
    - `/dokter` (Direktori dokter spesialis, jadwal praktik, pencarian interaktif).
    - `/layanan` (Daftar poliklinik, paket MCU rawat jalan, panduan pemeriksaan).
    - `/kontak` (Kontak darurat, peta & alamat, jam operasional, form bantuan pasien).
  - Setiap link navigasi mengarah ke tujuan nyata (zero dead links, R-24 Antislop).
- **`AC-04: Fitur Interaktif Pembuatan Janji Temu (Booking Modal)`**
  - Tersedia modal interaktif booking dokter dengan pemilihan poliklinik, tanggal kunjungan, sesi waktu, dan data pasien.
  - Form validasi lengkap: menampilkan feedback tiket reservasi instan setelah submit.
  - Aksesibel via keyboard (navigasi Tab, tombol Escape untuk menutup dialog).
- **`AC-05: PWA & Multilingual (i18n)`**
  - Kamus bahasa `id.json` dan `en.json` terisi lengkap untuk seluruh modul RS Ambulatory Care.
  - Bebas dari karakter em dash di seluruh antarmuka dan konten.
  - PWA manifest (`manifest.ts`) mencerminkan identitas RS Ambulatory Care.
- **`AC-06: Verifikasi Kualitas & Produksi (Quality Gate)`**
  - `bun run lint` dan `bun run build` sukses 100% tanpa error.
  - Evaluasi Antislop Delivery Gate dinyatakan PASS pada seluruh 4 blok.

---

## 3. Cross-Role Alignment Meeting Log

### Sesi Moderasi Alignment:
- **Moderator:** Faisal (PM)
- **Peserta:** Sandra (QA & Security), Bryan (Backend/DevOps), Angel (UI/UX), Fiqry (Frontend)

---

#### 1. Sandra (QA & Security):
- **Pertanyaan:** *"Bagaimana mitigasi untuk memastikan form booking dokter tidak menghasilkan dead controls atau data palsu yang melanggar aturan Hard Gate R-26 dan R-38 Antislop? Dan bagaimana dengan kepatuhan kontras warna pada mode gelap?"*
  - **Faisal (PM Decision):** Form booking dokter harus memiliki alur validasi input yang nyata di sisi klien, menyimpan tiket janji temu lokal sementara, dan langsung menampilkan kartu konfirmasi bukti booking (nomor antrean referensi yang jelas ditandai sebagai sistem registrasi rawat jalan). Tidak boleh ada tombol yang ketika diklik tidak bereaksi.
  - **Fiqry (Frontend):** Siap. Komponen `BookingModal` akan dilengkapi validasi status: idle, submitting, dan success dengan bukti ringkasan janji temu yang dapat dicetak atau ditutup rapi.
  - **Angel (UI/UX):** Untuk mode gelap, warna latar menggunakan slate-deep `#0b1317` dengan teks utama `#f1f5f9` (rasio kontras > 12:1) dan teal accent `#2dd4bf` (rasio kontras > 7:1), aman dari standar minimum WCAG AA 4.5:1.

#### 2. Bryan (Backend/DevOps):
- **Pertanyaan:** *"Sesuai dengan `GUIDELINE.md` aturan 13, folder `src/app/demo-encryption/` wajib dihapus sebelum produksi. Apakah ada utilitas dari demo tersebut yang masih digunakan di halaman lain?"*
  - **Bryan's Assessment:** Utilitas enkripsi `crypto.ts` dan `obfuscator.ts` di `src/lib/` adalah shared helpers. Folder `app/demo-encryption/` adalah halaman demo UI lama yang harus dibersihkan secara tuntas agar rute `/demo-encryption` tidak tertinggal di sitemap atau bundle produksi.
  - **Faisal (PM Decision):** Disetujui. Bryan dan Fiqry segera menghapus direktori `src/app/demo-encryption/` pada Phase 0 sebelum membuat rute baru.

#### 3. Angel (UI/UX):
- **Pertanyaan:** *"Bagaimana arah gaya visual (dials) antislop yang disepakati untuk institusi rumah sakit rawat jalan agar tidak terkesan dingin atau generik seperti template AI?"*
  - **Angel's Explanation:** Rumah sakit membutuhkan rasa tenang (*calm*), kredibel, dan kejelasan hierarki informasi. Kita menetapkan dial **ENERGY 1 (Calm & Trustworthy) / RHYTHM 2 (Varied Medical Cards & Flows) / MOTION 1 (Subtle Microinteractions)**.
  - **Fix:** Menghindari warna ungu-biru generik AI, menghindari bento-grid sembarangan, dan menghindari statistik palsu "99.9% sembuh". Digantikan dengan informasi konkret: jam buka poliklinik, nama dokter berlisensi, alur 4 langkah periksa, dan nomor ambulans gawat darurat.
  - **Angel's Specification:** Menggunakan font Geist yang sudah terpasang, ukuran teks tombol minimal 14px dengan padding nyaman untuk tap target ≥ 44px.

#### 4. Fiqry (Frontend Web):
- **Pertanyaan:** *"Terkait aturan GUIDELINE.md poin 14 mengenai ThemeSwitcher dan LanguageSwitcher yang harus disiapkan tetapi default di-hide/gone di UI utama, bagaimana kita menempatkannya?"*
  - **Fiqry's Proposal:** Komponen `theme-switcher.tsx` dan `language-switcher.tsx` tetap dipertahankan di `src/app/_components/`, namun di navbar utama kita tempatkan dalam mode hidden/conditional comment, sehingga jika pengguna meminta menampilkan sewaktu-waktu, tinggal mengaktifkan prop atau unhide class tanpa menulis ulang dari awal.
  - **Faisal (PM Decision):** Disetujui 100%. Ikuti instruksi GUIDELINE poin 14 secara presisi.
