# 🎨 Design Specification: Ambulatory Care Hospital Website (TASK-001)

**UI/UX Designer:** Angel (`angel_uiux`)  
**Status:** Approved  
**Standards:** Tailwind CSS v4, Antislop Filter (Mode: DURING), WCAG 2.1 AA Accessibility  

---

## 1. Design Direction & Antislop Dials

> **Design Read:**  
> Reading this as: Healthcare ambulatory hospital web portal for adult patients and families, in a modern, credible, and reassuring medical language, dial **ENERGY 1 / RHYTHM 2 / MOTION 1**.

### Dials Setting:
- **ENERGY: 1 (Calm & Trustworthy)**  
  Tidak ada elemen berteriak atau efek neon. Mengutamakan ketenangan pasien yang sedang membutuhkan layanan kesehatan.
- **RHYTHM: 2 (Balanced Medical Hierarchy)**  
  Variasi komposisi terstruktur: Banner darurat mencolok di atas, grid poliklinik informatif, direktori dokter dengan kartu praktis, serta alur pendaftaran 4 langkah berurutan.
- **MOTION: 1 (Subtle & Purposeful)**  
  Transisi halus (150-200ms) saat hover tombol atau membuka dialog booking. Tidak ada animasi looping tak berujung (*no endless pulse*).

---

## 2. Color Palette & Theming Tokens

### Light Theme (`:root`):
- `--background`: `#f8fafc` (Slate 50 - Bersih, nyaman di mata)
- `--foreground`: `#0f172a` (Slate 900 - Kontras sangat tinggi 14:1)
- `--card`: `#ffffff` (Putih murni dengan border halus `#e2e8f0`)
- `--primary`: `#0d5c63` (Deep Medical Teal - Kredibilitas klinis & ketenangan)
- `--primary-foreground`: `#ffffff`
- `--secondary`: `#e6f4f5` (Soft Aqua Tint - Latar aksen poliklinik)
- `--secondary-foreground`: `#093c41`
- `--muted`: `#f1f5f9` (Slate 100)
- `--muted-foreground`: `#475569` (Slate 600 - Kontras 5.2:1, lolos WCAG AA)
- `--accent`: `#14b8a6` (Teal 500)
- `--emergency`: `#dc2626` (Red 600 - Tombol Ambulans & Darurat)
- `--border`: `#e2e8f0`

### Dark Theme (`.dark`):
- `--background`: `#0b1317` (Deep Ocean Night)
- `--foreground`: `#f1f5f9` (Slate 100 - Kontras > 12:1)
- `--card`: `#131f24` (Dark Slate Card dengan border `#1e3037`)
- `--primary`: `#2dd4bf` (Teal 400 - Terang dan terbaca di background gelap)
- `--primary-foreground`: `#042f2e`
- `--secondary`: `#172d34`
- `--secondary-foreground`: `#99f6e4`
- `--muted`: `#172227`
- `--muted-foreground`: `#94a3b8` (Slate 400 - Kontras > 6:1)
- `--accent`: `#2dd4bf`
- `--emergency`: `#ef4444` (Red 500)
- `--border`: `#1e3037`

---

## 3. Typography & Spacing Scale

- **Font Family:** `var(--font-geist-sans), system-ui, -apple-system, sans-serif`
- **Hierarki Tipografi:**
  - `H1 (Page Title)`: 2.25rem - 3rem (36px - 48px), font-bold, leading-tight, tracking-tight.
  - `H2 (Section Header)`: 1.75rem - 2.25rem (28px - 36px), font-semibold, tracking-tight.
  - `H3 (Card Header)`: 1.25rem (20px), font-semibold.
  - `Body Text`: 1rem (16px), font-normal, leading-relaxed.
  - `Caption / Meta`: 0.875rem (14px), font-medium.
- **Radius Scale:**
  - `Button & Inputs`: `0.5rem` (8px - proporsional, non-pill).
  - `Cards`: `0.75rem` (12px).
  - `Badges`: `0.375rem` (6px).
- **Tap Targets:** Minimal 44px x 44px pada seluruh kontrol interaktif di tampilan mobile.

---

## 4. Component Layout Specifications

1. **Header / Navbar:**
   - Baris atas darurat: Hotline Ambulans 24 Jam dengan icon telepon.
   - Navigasi utama: Logo rumah sakit, menu (Beranda, Layanan, Dokter, Kontak), dan tombol aksi "Buat Janji".
   - Versi mobile: Drawer slide-in yang responsif dengan tombol close yang jelas.
2. **Hero Section:**
   - Headline lugas: "Layanan Rawat Jalan Terpadu dan Terpercaya".
   - Subheadline tentang kemudahan konsultasi dokter spesialis tanpa waktu tunggu yang lama.
   - Call to action ganda: "Pilih Dokter & Jadwal" (Primary) dan "Layanan Darurat 24 Jam" (Emergency Outline).
3. **Emergency Quick-Bar:**
   - Jalur darurat cepat bagi pasien rawat jalan kritis: Ambulans, Triage IGD Cepat, dan Hotline Konsultasi.
4. **Polyclinic & Services Grid:**
   - Kartu poliklinik dengan deskripsi jelas: Poli Penyakit Dalam, Poli Anak, Poli Jantung & Pembuluh Darah, Poli Saraf, Poli Mata, Poli Gigi & Mulut, Laboratorium, dan Radiologi.
5. **Doctor Specialist Cards:**
   - Foto avatar inisial medis, spesialisasi, hari praktik, dan status kuota konsultasi hari ini.
   - Tombol "Buat Janji" yang langsung membuka modal booking dengan pre-selected dokter.
6. **Booking Modal Component:**
   - Dialog terfokus untuk registrasi rawat jalan.
   - Formulir: Nama Pasien, Nomor WhatsApp/Telepon, Pilihan Dokter/Poli, Tanggal Kunjungan, dan Sesi Waktu (Pagi/Siang/Sore).
   - Layar konfirmasi bukti registrasi tiket rawat jalan yang informatif.
7. **Footer:**
   - Lokasi fisik rumah sakit, jam operasional poliklinik (Senin - Sabtu: 07:00 - 21:00, IGD: 24 Jam), hak cipta resmi, dan tautan halaman.
