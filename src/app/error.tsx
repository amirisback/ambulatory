"use client";

import * as React from "react";
import { Button } from "@/app/_components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log unexpected errors for monitoring
    console.error("[Amir Vet Error Boundary]:", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive text-2xl font-bold mb-4">
        !
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        Terjadi Kendala Sistem
      </h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        Sistem mengalami kendala saat memuat data layanan anabul. Silakan muat ulang atau hubungi hotline emergency jika anabul membutuhkan bantuan darurat.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="md" onClick={() => reset()}>
          Coba Muat Ulang
        </Button>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="emergency" size="md">
            Emergency Vet: 0812-3456-7890
          </Button>
        </a>
      </div>
    </div>
  );
}
