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
    title: "Layanan Medis & Paket Sehat Anabul",
    description:
      "Daftar lengkap layanan poliklinik hewan rawat jalan, kunjungan ke rumah (house call), dan paket preventif kesehatan anabul di Amir Vet Ambulatory.",
    locale,
    pathname: "/layanan",
  });
}

export default async function LayananPage() {
  const vetPackages = [
    {
      id: "paket-kitten-puppy",
      title: "Paket Sehat Kitten & Puppy",
      target: "Anabul Usia 2 - 6 Bulan",
      price: "Rp 250.000",
      features: [
        "Pemeriksaan Fisik & Berat Badan Lengkap",
        "Vaksinasi Pertama (Tricat / DP Puppy)",
        "Pemberian Obat Cacing Spektrum Luas (Deworming)",
        "Skrining Mikroskopik Kutu & Tungau Telinga",
        "Buku Vaksin Digital & Konsultasi Nutrisi Anabul",
      ],
      duration: "Estimasi: 30 - 45 Menit",
    },
    {
      id: "paket-steril-ambulatory",
      title: "Paket Steril Sehat Rawat Jalan",
      target: "Kucing / Anjing Usia > 6 Bulan",
      price: "Rp 450.000",
      features: [
        "Pemeriksaan Fisik Pra-Operasi & Suhu Tubuh",
        "Anestesi Aman & Bedah Steril Minor (Jantan/Betina)",
        "Obat Anti-Nyeri & Antibiotik Pulang",
        "Observasi Pemulihan Pasca-Operasi (One-Day Care)",
        "Panduan Perawatan Luka & Kontrol Gratis via WhatsApp",
      ],
      duration: "Estimasi: 3 - 4 Jam (Langsung Pulang)",
    },
    {
      id: "paket-senior-wellness",
      title: "Paket Senior Pet Wellness Check",
      target: "Anabul Usia 6+ Tahun",
      price: "Rp 850.000",
      features: [
        "Pemeriksaan Darah Lengkap (Hematologi)",
        "Skrining Fungsi Ginjal (Kreatinin/BUN) & Hati (SGOT/SGPT)",
        "USG Abdomen Organ Dalam & Kandung Kemih (FLUTD)",
        "Pemeriksaan Gigi & Evaluasi Radang Gusi",
        "Konsultasi Nutrisi Geriatri & Suplemen Sendi",
      ],
      duration: "Estimasi: 1 - 2 Jam",
    },
  ];

  return (
    <div className="flex-1 w-full bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="default" className="text-xs">
            Katalog Medis Anabul
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Layanan Rawat Jalan & House Call Dokter Hewan
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Amir Vet Ambulatory menyediakan layanan klinik rawat jalan, penanganan bedah minor hari yang sama (day care), serta kunjungan dokter hewan langsung ke rumah Anda.
          </p>
        </div>

        {/* Poliklinik Grid */}
        <section className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Daftar Layanan Medis & Poliklinik Anabul
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Setiap layanan didukung dokter hewan praktisi berizin dan fasilitas higienis berstandar Fear-Free.
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
                      Pilih Dokter
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Paket Preventif & Sehat Anabul */}
        <section className="space-y-6">
          <div className="border-b border-border pb-4">
            <Badge variant="default" className="mb-1 text-xs">
              Pencegahan & Paket Hemat
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Paket Perawatan Preventif & Sehat Anabul
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Perawatan terpadu one-day care tanpa perlu rawat inap berlama-lama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vetPackages.map((pkg) => (
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
                      Cakupan Tindakan:
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
                      Daftar Paket Ini
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Panduan Pemilik Anabul Sebelum Pemeriksaan */}
        <section className="rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Panduan Pemilik Sebelum Pemeriksaan di Klinik & Kunjungan Rumah
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Petunjuk sederhana agar proses diagnosis dan penanganan anabul berjalan aman dan tanpa stres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">1. Bawa Pet Cargo / Tali Kekang (Leash)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Untuk kunjungan ke klinik, masukkan kucing ke dalam pet cargo tertutup dan gunakan leash untuk anjing agar anabul merasa aman dan tidak panik dengan hewan lain.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">2. Puasa Pra-Tindakan Bedah Steril</h3>
              <p className="text-muted-foreground leading-relaxed">
                Jika anabul dijadwalkan untuk steril atau scaling gigi, wajib puasa makan selama 6 - 8 jam sebelum tindakan untuk mencegah risiko muntah saat anestesi.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">3. Catat Gejala & Riwayat Vaksin</h3>
              <p className="text-muted-foreground leading-relaxed">
                Foto kondisi luka/feses jika ada keluhan pencernaan atau diare, dan siapkan buku vaksin terdahulu agar dokter hewan dapat mengevaluasi secara cepat.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
