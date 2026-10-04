"use client";

import * as React from "react";
import { Button } from "@/app/_components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive text-2xl font-bold mb-4">
        !
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        Terjadi Kendala Teknis
      </h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        Sistem mengalami gangguan saat memuat data layanan. Silakan coba kembali atau hubungi layanan gawat darurat jika dalam kondisi akut.
      </p>
      <div className="mt-6 flex gap-3">
        <Button variant="primary" size="md" onClick={() => reset()}>
          Coba Muat Ulang
        </Button>
        <a href="tel:119">
          <Button variant="emergency" size="md">
            Hubungi IGD 119
          </Button>
        </a>
      </div>
    </div>
  );
}
