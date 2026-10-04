import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-primary font-bold text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        Maaf, tautan atau halaman poliklinik yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button variant="primary" size="md">
            Kembali ke Beranda
          </Button>
        </Link>
        <Link href="/dokter">
          <Button variant="outline" size="md">
            Cari Dokter Spesialis
          </Button>
        </Link>
      </div>
    </div>
  );
}
