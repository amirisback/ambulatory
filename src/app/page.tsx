import Link from "next/link";
import { getCurrentDictionary } from "@/lib/i18n-server";
import {
  CLINIC_SERVICES,
  DOCTORS_DATA,
  PATIENT_FLOW_STEPS,
  HOSPITAL_FACILITIES,
} from "@/data/ambulatory-data";
import { DoctorCard } from "./_components/doctor-card";
import { HeroAction } from "./_components/hero-action";
import { Badge } from "./_components/ui/badge";

export default async function Home() {
  const { dict } = await getCurrentDictionary();

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/50 via-background to-background py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="default" className="text-xs font-semibold px-3 py-1">
                {dict.home.heroBadge}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {dict.home.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {dict.home.heroDescription}
              </p>
              <HeroAction />
            </div>

            {/* Hero Quick Stat / Notice Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Status Poliklinik Hari Ini
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      Layanan Rawat Jalan Buka
                    </h3>
                  </div>
                  <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-primary font-bold text-xs">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Pendaftaran Online Mandiri</p>
                      <p className="text-xs text-muted-foreground">
                        Pilih dokter dan sesi jam sebelum berangkat untuk verifikasi instan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-primary font-bold text-xs">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Laboratorium & Radiologi Siaga</p>
                      <p className="text-xs text-muted-foreground">
                        Hasil pemeriksaan penunjang terhubung langsung ke meja dokter.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-primary font-bold text-xs">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Gawat Darurat & Triage 24 Jam</p>
                      <p className="text-xs text-muted-foreground">
                        Tim medis siaga untuk kondisi akut dengan jalur akses darurat langsung.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Lokasi: Gedung Sentral Terpadu</span>
                  <a
                    href="tel:119"
                    className="font-bold text-emergency hover:underline"
                  >
                    Hotline: 119
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fast-Track Ambulatory Info Bar */}
      <section className="border-b border-border bg-card py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-2">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xl">
                ⏱
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Waktu Tunggu Efisien</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sistem antrean berbasis slot jam meminimalkan antrean di ruang tunggu.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xl">
                📋
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Rekam Medis Terpusat</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Riwayat laboratorium dan resep terintegrasi antar seluruh poliklinik spesialis.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emergency/10 text-emergency font-bold text-xl">
                🚑
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">IGD & Ambulans 24 Jam</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Respon cepat ambulans dan penanganan medis akut tanpa birokrasi rumit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Polyclinics Grid */}
      <section className="py-16 sm:py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="default" className="mb-2">
                Poliklinik Rawat Jalan
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {dict.home.servicesHeading}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                {dict.home.servicesSubheading}
              </p>
            </div>
            <Link
              href="/layanan"
              className="text-sm font-semibold text-primary hover:underline self-start md:self-auto"
            >
              Lihat Semua Poliklinik & Layanan →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINIC_SERVICES.slice(0, 6).map((clinic) => (
              <div
                key={clinic.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {clinic.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {clinic.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {clinic.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {clinic.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>{clinic.operatingHours}</span>
                  <Link
                    href={`/dokter?clinic=${clinic.id}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    Dokter Praktik
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Specialist Doctors */}
      <section className="py-16 sm:py-20 bg-muted/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="default" className="mb-2">
                Praktik Spesialis
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {dict.home.doctorsHeading}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                {dict.home.doctorsSubheading}
              </p>
            </div>
            <Link
              href="/dokter"
              className="text-sm font-semibold text-primary hover:underline self-start md:self-auto"
            >
              Lihat Seluruh Jadwal Dokter →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS_DATA.slice(0, 4).map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Patient Flow Journey (4 Steps) */}
      <section className="py-16 sm:py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="default" className="mb-2">
              Alur Pelayanan Pasien
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {dict.home.flowHeading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {dict.home.flowSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PATIENT_FLOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Medical Support Facilities */}
      <section className="py-16 sm:py-20 bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <Badge variant="default" className="mb-2">
              Penunjang Medis
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {dict.home.facilitiesHeading}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {dict.home.facilitiesSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSPITAL_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="rounded-xl border border-border bg-background p-6 shadow-xs space-y-4"
              >
                <h3 className="text-lg font-bold text-foreground">
                  {facility.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {facility.description}
                </p>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Fasilitas Unggulan:
                  </p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {facility.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Emergency & Fast Booking Banner */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Kebutuhan Konsultasi Spesialis atau Bantuan Medis Segera?
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/80">
                Pusat panggilan kami beroperasi 24 jam untuk melayani panduan registrasi, rujukan poliklinik, dan penjemputan ambulans gawat darurat.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
              <Link
                href="/dokter"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-card text-foreground px-6 text-sm font-bold shadow-xs hover:bg-card/90 transition-colors"
              >
                Cari Dokter Sekarang
              </Link>
              <a
                href="tel:119"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-emergency text-emergency-foreground px-6 text-sm font-bold shadow-xs hover:opacity-90 transition-opacity"
              >
                Telepon IGD 119
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
