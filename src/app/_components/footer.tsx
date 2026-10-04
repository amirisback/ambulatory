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
                +
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                RS Ambulatory Care
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pusat pelayanan rawat jalan terpadu, poliklinik dokter spesialis, dan laboratorium diagnostik modern untuk kesehatan Anda dan keluarga.
            </p>
            <div className="pt-2 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">Akreditasi Rumah Sakit Paripurna</p>
              <p>Nomor Registrasi Kemenkes: 3171-RS-2026</p>
            </div>
          </div>

          {/* Column 2: Poliklinik & Layanan */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Poliklinik Unggulan
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Poli Penyakit Dalam
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Poli Jantung & Pembuluh Darah
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Poli Anak & Tumbuh Kembang
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Poli Saraf & Neurologi
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Laboratorium & Radiologi 24 Jam
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Akses Pasien
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/dokter" className="hover:text-primary transition-colors">
                  Jadwal Dokter Spesialis
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-primary transition-colors">
                  Katalog Layanan & MCU
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-primary transition-colors">
                  Lokasi & Jam Buka Poliklinik
                </Link>
              </li>
              <li>
                <a href="tel:119" className="hover:text-emergency font-medium text-emergency transition-colors">
                  Hotline IGD & Ambulans: 119
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
                <strong className="text-foreground">Alamat:</strong>
                <br />
                Jl. Kesehatan Terpadu No. 88, Kawasan Medis Sentral, Jakarta
              </p>
              <p>
                <strong className="text-foreground">Jam Poliklinik:</strong>
                <br />
                Senin - Sabtu: 07:30 - 21:00 WIB
              </p>
              <p>
                <strong className="text-foreground">Gawat Darurat & Lab:</strong>
                <br />
                Buka Setiap Hari (24 Jam Penuh)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© 2026 RS Ambulatory Care. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-6">
            <Link href="/kontak" className="hover:text-foreground transition-colors">
              Pusat Bantuan
            </Link>
            <Link href="/layanan" className="hover:text-foreground transition-colors">
              Alur Rawat Jalan
            </Link>
            <Link href="/dokter" className="hover:text-foreground transition-colors">
              Registrasi Dokter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
