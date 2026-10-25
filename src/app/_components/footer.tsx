import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card text-foreground" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Hospital Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base shadow-xs">
                🐾
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                Amir Vet Ambulatory
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Klinik hewan rawat jalan (outpatient) dan layanan dokter hewan kunjungan ke rumah (house call) dengan standar higienis dan pendekatan ramah anabul (fear-free).
            </p>
            <div className="pt-2 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">Izin Praktik Dokter Hewan Berizin (PDHI)</p>
              <p>Wilayah Operasional: Seluruh Jabodetabek</p>
            </div>
          </div>

          {/* Column 2: Poliklinik & Layanan */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Layanan Utama
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Poli Kucing & Anjing (Umum)
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Layanan House Call (Ke Rumah)
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Vaksinasi & Preventif Anabul
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Bedah Minor & Steril Sehat
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Rapid Test & Laboratorium Portabel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Akses Pemilik Anabul
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/dokter" className="hover:text-primary transition-colors">
                  Jadwal Praktik Dokter Hewan
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Katalog Paket Sehat Anabul
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-primary transition-colors">
                  Kontak & Jadwal House Call
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 font-medium text-emerald-600 dark:text-emerald-400 transition-colors"
                >
                  WhatsApp Darurat: 0812-3456-7890
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Alamat & Operasional */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Lokasi & Jam Praktik
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">Klinik Sentral:</strong>
                <br />
                Jl. Margasatwa Sentral No. 42, Jakarta Selatan
              </p>
              <p>
                <strong className="text-foreground">Jam Praktik Klinik:</strong>
                <br />
                Senin - Sabtu: 08:00 - 20:00 WIB
                <br />
                Minggu: 09:00 - 15:00 WIB
              </p>
              <p>
                <strong className="text-foreground">Layanan House Call:</strong>
                <br />
                Siaga Setiap Hari dengan Janji Temu
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© 2026 Amir Vet Ambulatory. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-6">
            <Link href="/kontak" className="hover:text-foreground transition-colors">
              Pusat Bantuan Anabul
            </Link>
            <Link href="/layanan" className="hover:text-foreground transition-colors">
              Alur Perawatan
            </Link>
            <Link href="/dokter" className="hover:text-foreground transition-colors">
              Profil Dokter Hewan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
