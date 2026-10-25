"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { BookingModal } from "./booking-modal";

export interface HeaderProps {
  appName?: string;
  tagline?: string;
}

export function Header({
  appName = "Amir Vet Ambulatory",
}: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/layanan", label: "Layanan & Poli Anabul" },
    { href: "/dokter", label: "Dokter Hewan" },
    { href: "/kontak", label: "Kontak & Lokasi" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md transition-colors">
        {/* Top Emergency Strip */}
        <div className="bg-primary text-primary-foreground px-4 py-1.5 text-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-semibold tracking-wide">
                Layanan Rawat Jalan & Dokter Hewan ke Rumah (House Call)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">Emergency Vet & Konsultasi:</span>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline decoration-dotted hover:text-emerald-200 transition-colors"
                aria-label="Panggil emergency vet via WhatsApp"
              >
                0812-3456-7890
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-md"
            aria-label="Beranda Amir Vet Ambulatory"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl shadow-xs transition-transform group-hover:scale-105">
              🐾
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                {appName}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground hidden xs:inline">
                Klinik Hewan Rawat Jalan & House Call
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-secondary text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden sm:inline-flex"
            >
              Daftar Janji Temu Anabul
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-md border border-border text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Buka menu navigasi"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-secondary text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-border">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookingModalOpen(true);
                }}
              >
                Daftar Janji Temu Anabul
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
