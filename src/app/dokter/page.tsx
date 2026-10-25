import type { Metadata } from "next";
import { getCurrentLocale } from "@/lib/i18n-server";
import { generatePageSeo } from "@/lib/seo";
import { CLINIC_SERVICES, DOCTORS_DATA } from "@/data/ambulatory-data";
import { DoctorListClient } from "./doctor-list-client";
import { Badge } from "@/app/_components/ui/badge";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();

  return generatePageSeo({
    title: "Jadwal Praktik Dokter Hewan & House Call",
    description:
      "Temukan jadwal praktik dokter hewan berizin Amir Vet Ambulatory. Pilihan kunjungan klinik atau dokter hewan datang ke rumah Anda (house call).",
    locale,
    pathname: "/dokter",
  });
}

export default async function DokterPage({
  searchParams,
}: {
  searchParams: Promise<{ clinic?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialClinicFilter = resolvedParams.clinic || "";
  const initialSearchQuery = resolvedParams.q || "";

  return (
    <div className="flex-1 w-full bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="default" className="text-xs">
            Direktori Medis Veteriner
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Jadwal Praktik Dokter Hewan & Layanan House Call
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Pilih dokter hewan praktisi berizin sesuai kebutuhan anabul kesayangan Anda. Kuota konsultasi terjadwal rapi demi ketelitian pemeriksaan dan kenyamanan pasien anabul.
          </p>
        </div>

        {/* Client Interactive Filter & List */}
        <DoctorListClient
          initialDoctors={DOCTORS_DATA}
          clinics={CLINIC_SERVICES}
          initialClinicFilter={initialClinicFilter}
          initialSearchQuery={initialSearchQuery}
        />
      </div>
    </div>
  );
}
