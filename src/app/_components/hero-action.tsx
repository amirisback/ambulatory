"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { BookingModal } from "./booking-modal";

export function HeroAction() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Pilih Dokter Hewan & Jadwal
        </Button>
        <Link href="/layanan" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Telusuri Layanan Anabul
          </Button>
        </Link>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
