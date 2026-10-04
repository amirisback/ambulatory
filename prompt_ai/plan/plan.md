# 🚀 Atomic Phase Plan — Pengerjaan Website Ambulatory Care

Dokumen perencanaan bertahap (Atomic Phases) untuk membangun website **RS Ambulatory Care** (Rumah Sakit Rawat Jalan & Terpadu) mengikuti standar arsitektur Next.js 16, React 19, TypeScript Strict, Tailwind CSS v4, Serwist PWA, antislop filter (Mode: DURING), dan ponytail (YAGNI).

---

## 📌 Ringkasan Proyek

- **Nama Entitas:** RS Ambulatory Care (Rumah Sakit Rawat Jalan Terpadu)
- **Framework:** Next.js 16.3.6 (App Router) + React 19.3.0 + TypeScript 6.0.3 Strict
- **Styling:** Tailwind CSS v4.3.3 (`@theme inline`, custom tokens, dark mode class-based)
- **PWA:** Serwist v9.5.12
- **i18n:** Cookie-based (`NEXT_LOCALE`), kamus `id.json` & `en.json`, helper `getCurrentDictionary()`
- **Antislop Settings:** Mode DURING, Dial: ENERGY 1 (Calm & Trustworthy) / RHYTHM 2 (Balanced Medical Hierarchy) / MOTION 1 (Smooth, Purposeful). Bebas em dash (`—`), zero dead buttons, real honest data.

---

## 🏗️ Pembagian Fase Atomik (Atomic Phases)

### Phase 0: Project Sanitization & Housekeeping
- [x] **0.1 Baseline Audit:** Verifikasi `bun run build` awal berhasil 100%.
- [ ] **0.2 Pembersihan Rute Demo:** Hapus folder demo `src/app/demo-encryption/` sesuai instruksi aturan wajib `GUIDELINE.md` poin 13 agar tidak masuk ke produksi.
- [ ] **0.3 Persiapan Direktori Workflow:** Buat struktur pelacakan `workflow/TASK-001-ambulatory-website/` dan `workflow/INDEX.md`.

---

### Phase 1: Design System & Theming Tokens (Tailwind CSS v4)
- [ ] **1.1 Kalibrasi Token Medis di `src/app/globals.css`:**
  - Definisi palet warna medis kredibel:
    - Primary: Deep Teal Medis (`#0d5c63` / `#14b8a6` di dark mode)
    - Primary Foreground: White / Crisp Slate
    - Secondary: Soft Aqua Tint (`#e6f4f5` / `#132e35` di dark mode)
    - Accent: Energetic Mint / Alert Amber untuk status triage
    - Background & Foreground: Bersih, rasio kontras WCAG AA (≥ 4.5:1 untuk teks biasa, ≥ 3:1 untuk headline/teks besar)
  - Pengaturan `@theme inline` dan token radius terstandar (tidak over-rounded/non-pill default).
- [ ] **1.2 Penyesuaian Global Styles:**
  - Focus-visible ring untuk aksesibilitas keyboard (WCAG 2.1 AA).
  - Smooth scroll dan safe area padding mobile.

---

### Phase 2: Kamus i18n & Data Dummy Terstruktur
- [ ] **2.1 Kamus Bahasa (`id.json` & `en.json`):**
  - Update teks metadata RS Ambulatory Care.
  - Tambahkan string navigasi (Beranda, Layanan, Dokter, Kontak, Buat Janji).
  - Tambahkan label dan deskripsi layanan rawat jalan, tim dokter spesialis, langkah booking, formulir, dan kontak darurat.
  - Memastikan seluruh teks bebas karakter em dash (`—`) sesuai Hard Gate R-02 Antislop.
- [ ] **2.2 Master Data JSON (`src/data/ambulatory-data.ts`):**
  - Data poliklinik rawat jalan (Poli Jantung, Anak, Penyakit Dalam, Saraf, Mata, Gigi, Radiologi, Laboratorium).
  - Data profil dokter spesialis (nama dengan gelar medis riil, spesialisasi, hari & jam praktik, foto avatar placeholder inisial/medis, pengalaman).
  - Data jadwal poliklinik dan ketersediaan kuota booking.
  - Data fasilitas dan alur rawat jalan (Fast-Track Ambulatory Flow).

---

### Phase 3: Shared Core UI Components
- [ ] **3.1 Header & Navbar Terpadu (`src/app/_components/header.tsx`):**
  - Logo RS Ambulatory Care dengan semantic branding.
  - Navigasi link aktif (Beranda, Layanan, Dokter, Kontak).
  - Emergency hotline cepat (Ambulans 24 Jam) dan tombol CTA "Buat Janji Konsultasi".
  - Mobile responsive drawer menu dengan interaksi keyboard & aria-expanded.
  - ThemeSwitcher & LanguageSwitcher tetap ada di kode namun default hidden sesuai aturan GUIDELINE.
- [ ] **3.2 Footer Informatif (`src/app/_components/footer.tsx`):**
  - Alamat lengkap, kontak gawat darurat, jam layanan poliklinik rawat jalan.
  - Link penting ke tiap halaman layanan dan regulasi pasien.
  - Copyright resmi tanpa em dash.
- [ ] **3.3 UI Primitives:**
  - Button (`src/app/_components/ui/button.tsx`): Varian primary, outline, ghost, emergency dengan tap target ≥ 44px.
  - Badge (`src/app/_components/ui/badge.tsx`): Status kuota, spesialisasi dokter, label hari operasional.
  - Modal / Dialog Booking (`src/app/_components/booking-modal.tsx`): Dialog interaktif pembuatan janji temu dengan validasi form dan konfirmasi tiket instan.

---

### Phase 4: Pembuatan Halaman Inti (Pages Implementation)
- [ ] **4.1 Halaman Beranda (`src/app/page.tsx`):**
  - **Hero Section:** Value proposition rawat jalan cepat, nyaman, didukung dokter spesialis berpengalaman. CTA cari dokter & booking jadwal.
  - **Emergency & Fast Track Triage Banner:** Call center 24 jam & nomor ambulans terpadu.
  - **Highlight Poliklinik & Layanan Rawat Jalan:** Preview 6 poliklinik unggulan dengan jam buka dan tombol telusuri.
  - **Tim Dokter Spesialis:** Kartu dokter unggulan dengan jadwal praktik dan tombol buat janji interaktif.
  - **Alur Pelayanan Pasien (4 Langkah):** Pendaftaran Online -> Datang & Konfirmasi -> Konsultasi & Tindakan -> Resep & Pulang.
  - **Fasilitas Penunjang Rawat Jalan:** Laboratorium terintegrasi, farmasi digital, ruang observasi tenang.
- [ ] **4.2 Halaman Jadwal & Tim Dokter (`src/app/dokter/page.tsx`):**
  - Filter pencarian dokter berdasarkan nama atau spesialisasi (Client Component interaktif).
  - Grid kartu dokter lengkap dengan informasi jadwal praktik harian.
  - Tombol aksi langsung membuka modal pendaftaran rawat jalan.
  - Empty state ramah jika pencarian dokter tidak ditemukan.
- [ ] **4.3 Halaman Layanan & Poliklinik (`src/app/layanan/page.tsx`):**
  - Katalog poliklinik spesialis dan fasilitas diagnostik.
  - Informasi paket Medical Check Up (MCU) rawat jalan.
  - Panduan persiapan pasien sebelum pemeriksaan (misal puasa sebelum lab).
- [ ] **4.4 Halaman Kontak, Lokasi & Bantuan (`src/app/kontak/page.tsx`):**
  - Informasi kontak resmi, alamat fisik, jam operasional poliklinik.
  - Formulir pesan/bantuan pasien dengan validasi input dan umpan balik sukses instan.
  - Petunjuk akses transportasi dan parkir ambulans/pasien.

---

### Phase 5: Polish, Accessibility & Antislop Verification
- [ ] **5.1 Antislop Delivery Gate Audit:**
  - R-02 Hard Gate: Audit seluruh teks terbebas dari em dash (`—`).
  - R-03 Hard Gate: Uji responsivitas mobile (tidak ada horizontal scroll, ukuran tap target ≥ 44px).
  - R-24 & R-26 Hard Gate: Verifikasi setiap link navigasi dan tombol memiliki target/tindakan nyata (zero dead controls).
  - R-25 Hard Gate: Uji kontras rasio warna pada mode terang dan mode gelap (WCAG AA compliant).
  - R-27 Hard Gate: Verifikasi tersedianya UI state (empty state, loading state, form feedback).
  - R-32 Hard Gate: Aksesibilitas keyboard (fokus indikator, navigasi tab, modal escape key).
  - R-34 Hard Gate: Uji fungsi penuh pada Light Theme dan Dark Theme.
- [ ] **5.2 SEO & Structured Data:**
  - Metadata unik (title, description, open graph) di setiap rute (`/`, `/dokter`, `/layanan`, `/kontak`).
  - Update JSON-LD `MedicalOrganization` / `Hospital` dan `WebSite`.
  - Update `src/app/manifest.ts` PWA untuk identitas RS Ambulatory Care.

---

### Phase 6: Production Build & Final Signoff
- [ ] **6.1 Linting & Type Checking:**
  - `bun run lint` (ESLint v9 tanpa warning/error).
  - TypeScript strict check tanpa error.
- [ ] **6.2 Production Compilation:**
  - `bun run build` sukses 100% dengan Serwist Service Worker ter-bundle.
- [ ] **6.3 Dokumentasi SDLC & Signoff:**
  - Lengkapi seluruh file di `workflow/TASK-001-ambulatory-website/`.
  - Update `workflow/INDEX.md` ke status Signed-Off.
