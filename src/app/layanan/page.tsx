import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentLocale } from "@/lib/i18n-server";
import { generatePageSeo } from "@/lib/seo";
import { CLINIC_SERVICES } from "@/data/ambulatory-data";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();

  return generatePageSeo({
    title: "Layanan Poliklinik & Paket Medical Check-Up",
    description:
      "Daftar lengkap layanan poliklinik rawat jalan, fasilitas penunjang diagnostik, dan paket Medical Check-Up RS Ambulatory Care.",
    locale,
    pathname: "/layanan",
  });
}

export default async function LayananPage() {
  const mcuPackages = [
    {
      id: "mcu-dasar",
      title: "Paket Skrining Dasar",
      target: "Pria & Wanita Dewasa",
      price: "Rp 450.000",
      features: [
        "Pemeriksaan Tanda Vital & Indeks Massa Tubuh",
        "Hematologi Lengkap (Darah Rutin)",
        "Pemeriksaan Urin Lengkap",
        "Pemeriksaan Gula Darah Puasa",
        "Konsultasi Dokter Umum Evaluator",
      ],
      duration: "Estimasi: 1,5 Jam",
    },
    {
      id: "mcu-kardio",
      title: "Paket Skrining Jantung & Vaskular",
      target: "Usia 35+ / Riwayat Hipertensi",
      price: "Rp 1.150.000",
      features: [
        "Seluruh Item Paket Skrining Dasar",
        "Perekaman EKG Digital 12-Lead",
        "Profil Lipid Komprehensif (Kolesterol, HDL, LDL, Trigliserida)",
        "Rontgen Thorax Digital Dosis Rendah",
        "Konsultasi Langsung Dokter Spesialis Jantung",
      ],
      duration: "Estimasi: 2 - 3 Jam",
    },
    {
      id: "mcu-eksekutif",
      title: "Paket Eksekutif Rawat Jalan",
      target: "Evaluasi Menyeluruh Tahunan",
      price: "Rp 1.950.000",
      features: [
        "Seluruh Item Paket Kardiovaskular",
        "USG Abdomen Lengkap dengan Dokter Spesialis Radiologi",
        "Tes Fungsi Hati (SGOT/SGPT) & Ginjal (Ureum/Kreatinin)",
        "Pemeriksaan Asam Urat & HbA1c",
        "Konsultasi Dokter Spesialis Penyakit Dalam",
      ],
      duration: "Estimasi: 3 - 4 Jam (One-Day Care)",
    },
  ];

  return (
    <div className="flex-1 w-full bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="default" className="text-xs">
            Katalog Medis Komprehensif
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Layanan Rawat Jalan & Poliklinik Spesialis
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            RS Ambulatory Care menyediakan 8 divisi klinik rawat jalan dan laboratorium diagnostik berstandar medis modern, dirancang untuk efisiensi waktu pasien.
          </p>
        </div>

        {/* Poliklinik Grid */}
        <section className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Daftar Poliklinik & Fasilitas Diagnostik
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Setiap klinik dilengkapi ruang konsultasi dokter dan peralatan medis penunjang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINIC_SERVICES.map((clinic) => (
              <div
                key={clinic.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs hover:border-primary/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {clinic.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
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

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {clinic.operatingHours}
                  </span>
                  <Link href={`/dokter?clinic=${clinic.id}`}>
                    <Button variant="outline" size="sm">
                      Lihat Jadwal
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Paket Medical Check Up (MCU) */}
        <section className="space-y-6">
          <div className="border-b border-border pb-4">
            <Badge variant="default" className="mb-1 text-xs">
              Pencegahan & Skrining Rutin
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Paket Medical Check Up (MCU) Rawat Jalan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Pemeriksaan kesehatan terpadu one-day service tanpa perlu rawat inap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mcuPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Sasaran: {pkg.target}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-1">
                      {pkg.title}
                    </h3>
                    <p className="text-2xl font-extrabold text-primary mt-2">
                      {pkg.price}
                    </p>
                    <span className="text-xs text-muted-foreground font-medium">
                      {pkg.duration}
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-foreground mb-3">
                      Cakupan Pemeriksaan:
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link href="/dokter" className="w-full block">
                    <Button variant="primary" size="sm" className="w-full">
                      Daftar Paket MCU
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Panduan Pasien Sebelum Pemeriksaan */}
        <section className="rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Panduan Persiapan Pasien Sebelum Pemeriksaan Rawat Jalan
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Petunjuk sederhana agar proses diagnosa dan pengambilan sampel medis berjalan optimal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">1. Pemeriksaan Laboratorium Puasa</h3>
              <p className="text-muted-foreground leading-relaxed">
                Untuk pemeriksaan gula darah puasa atau profil lipid, pasien dianjurkan berpuasa selama 8 hingga 10 jam sebelumnya. Boleh minum air putih tanpa gula.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">2. Membawa Rekam Medis / Resep Obat</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bawa hasil laboratorium sebelumnya atau kemasan obat rutin yang sedang dikonsumsi untuk mempermudah evaluasi dokter spesialis.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">3. Datang Tepat Waktu</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mohon hadir 15 menit sebelum slot waktu reservasi janji temu untuk proses verifikasi data tensi dan tanda vital di loket suster.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
