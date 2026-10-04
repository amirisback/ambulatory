import type { Metadata } from "next";
import { getCurrentLocale } from "@/lib/i18n-server";
import { generatePageSeo } from "@/lib/seo";
import { Badge } from "@/app/_components/ui/badge";
import { ContactFormClient } from "./contact-form-client";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();

  return generatePageSeo({
    title: "Kontak, Lokasi & Layanan Darurat 24 Jam",
    description:
      "Informasi alamat, nomor telepon darurat 119, WhatsApp pendaftaran rawat jalan, dan peta lokasi RS Ambulatory Care.",
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
            Pusat Informasi & Bantuan
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Kontak, Lokasi & Akses Rawat Jalan
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Hubungi pusat informasi RS Ambulatory Care untuk panduan registrasi dokter, ambulans darurat, atau akses transportasi menuju gedung poliklinik.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Emergency Card */}
          <div className="rounded-xl border border-emergency/30 bg-emergency/5 p-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emergency">
              Gawat Darurat 24 Jam
            </span>
            <h2 className="text-xl font-extrabold text-foreground">
              Hotline IGD & Ambulans
            </h2>
            <p className="text-xs text-muted-foreground">
              Siaga setiap saat untuk penjemputan darurat pasien dan respon medis akut.
            </p>
            <div className="pt-2">
              <a
                href="tel:119"
                className="text-2xl font-black text-emergency hover:underline block"
              >
                119
              </a>
              <a
                href="tel:0215550911"
                className="text-sm font-semibold text-foreground hover:underline block mt-0.5"
              >
                (021) 555-0911
              </a>
            </div>
          </div>

          {/* Customer Service & WhatsApp */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Pendaftaran & Informasi
            </span>
            <h2 className="text-xl font-bold text-foreground">
              Layanan Pelanggan Pasien
            </h2>
            <p className="text-xs text-muted-foreground">
              Konsultasi alur rujukan, informasi dokter spesialis, dan konfirmasi reservasi.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/6281198765432"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-primary hover:underline block"
              >
                +62 811-9876-5432 (WhatsApp)
              </a>
              <span className="text-xs text-muted-foreground block mt-0.5">
                Senin - Sabtu: 07:30 - 21:00 WIB
              </span>
            </div>
          </div>

          {/* Email & Surat Resmi */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Korespondensi Resmi
            </span>
            <h2 className="text-xl font-bold text-foreground">
              Email & Rekam Medis
            </h2>
            <p className="text-xs text-muted-foreground">
              Permohonan rekam medis digital, kemitraan asuransi, dan kerjasama korporasi.
            </p>
            <div className="pt-2">
              <a
                href="mailto:info@ambulatoryhospital.id"
                className="text-base font-bold text-foreground hover:text-primary transition-colors block"
              >
                info@ambulatoryhospital.id
              </a>
              <span className="text-xs text-muted-foreground block mt-0.5">
                Balasan dalam waktu maksimal 1x24 jam kerja
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
                Alamat Fisik & Akses Gedung
              </h2>
              <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                <p>
                  <strong className="text-foreground">Kompleks Medis RS Ambulatory Care</strong>
                  <br />
                  Jl. Kesehatan Terpadu No. 88, Kawasan Medis Sentral, Jakarta 10110
                </p>
                <p>
                  <strong className="text-foreground">Titik Temu & Parkir:</strong>
                  <br />
                  Drop-off rawat jalan tersedia di Lobi Gedung Sentral Utama. Area parkir luas dengan akses khusus kursi roda dan ambulans.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Jadwal Operasional Instalasi:
                </h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Poliklinik Spesialis:</span>
                    <strong className="text-foreground">Senin - Sabtu (07:30 - 21:00 WIB)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Laboratorium Diagnostik:</span>
                    <strong className="text-foreground">Setiap Hari (24 Jam)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Farmasi Rawat Jalan:</span>
                    <strong className="text-foreground">Setiap Hari (07:00 - 22:00 WIB)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Instalasi Gawat Darurat:</span>
                    <strong className="text-emergency">Buka 24 Jam Penuh</strong>
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
