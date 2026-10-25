import type { Metadata } from "next";
import { getCurrentLocale } from "@/lib/i18n-server";
import { generatePageSeo } from "@/lib/seo";
import { Badge } from "@/app/_components/ui/badge";
import { ContactFormClient } from "./contact-form-client";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();

  return generatePageSeo({
    title: "Kontak, Lokasi & Layanan House Call Anabul",
    description:
      "Informasi alamat klinik sentral, kontak WhatsApp dokter hewan, pemesanan house call ke rumah, dan darurat vet 24 jam Amir Vet Ambulatory.",
    locale,
    pathname: "/kontak",
  });
}

export default async function KontakPage() {
  return (
    <div className="flex-1 w-full bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="default" className="text-xs">
            Pusat Informasi & Layanan Kunjungan
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Kontak, Lokasi Klinik & Layanan House Call
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Hubungi tim medis Amir Vet Ambulatory untuk konsultasi kesehatan anabul, pendaftaran janji temu di klinik, atau pemesanan dokter hewan datang ke rumah Anda.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Emergency Card */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Emergency Vet Siaga
            </span>
            <h2 className="text-xl font-extrabold text-foreground">
              Hotline Darurat Anabul
            </h2>
            <p className="text-xs text-muted-foreground">
              Konsultasi penanganan pertama dan panduan kondisi akut sebelum membawa anabul.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-black text-emerald-600 dark:text-emerald-400 hover:underline block"
              >
                0812-3456-7890
              </a>
              <span className="text-xs font-semibold text-foreground block mt-0.5">
                WhatsApp Siaga 24 Jam
              </span>
            </div>
          </div>

          {/* Customer Service & House Call Booking */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Reservasi & House Call
            </span>
            <h2 className="text-xl font-bold text-foreground">
              Layanan Pemilik Anabul
            </h2>
            <p className="text-xs text-muted-foreground">
              Jadwal dokter hewan, ketersediaan slot kunjungan ke rumah, dan paket vaksinasi/steril.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-primary hover:underline block"
              >
                +62 812-3456-7890
              </a>
              <span className="text-xs text-muted-foreground block mt-0.5">
                Setiap Hari: 08:00 - 20:00 WIB
              </span>
            </div>
          </div>

          {/* Email & Kemitraan */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Korespondensi Resmi
            </span>
            <h2 className="text-xl font-bold text-foreground">
              Email & Rekam Medis
            </h2>
            <p className="text-xs text-muted-foreground">
              Permintaan riwayat rekam medis digital anabul, kemitraan shelter, dan komunitas rescue.
            </p>
            <div className="pt-2">
              <a
                href="mailto:halo@amirvet.id"
                className="text-base font-bold text-foreground hover:text-primary transition-colors block"
              >
                halo@amirvet.id
              </a>
              <span className="text-xs text-muted-foreground block mt-0.5">
                Balasan maksimal 1x24 jam kerja
              </span>
            </div>
          </div>
        </div>

        {/* Location Info & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Location & Directions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-foreground">
                Alamat Fisik Klinik & Jangkauan House Call
              </h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>
                  <strong className="text-foreground">Klinik Sentral Amir Vet Ambulatory:</strong>
                  <br />
                  Jl. Margasatwa Sentral No. 42, Ragunan, Jakarta Selatan 12550
                </p>
                <p>
                  <strong className="text-foreground">Area Jangkauan Layanan House Call (Ke Rumah):</strong>
                  <br />
                  Dokter hewan kami melayani kunjungan ke seluruh Jakarta Selatan, Timur, Barat, Pusat, Depok, dan Tangerang Selatan dengan biaya transport transparan.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Jadwal Operasional Klinik:
                </h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Poli Rawat Jalan Klinik:</span>
                    <strong className="text-foreground">Senin - Sabtu (08:00 - 20:00 WIB)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Praktik Hari Minggu:</span>
                    <strong className="text-foreground">Minggu (09:00 - 15:00 WIB)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Layanan House Call:</span>
                    <strong className="text-foreground">Setiap Hari (08:30 - 18:00 WIB)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>WhatsApp Emergency Vet:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">Siaga 24 Jam Penuh</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Client Inquiry Form */}
          <div className="lg:col-span-6">
            <ContactFormClient />
          </div>
        </div>
      </div>
    </div>
  );
}
