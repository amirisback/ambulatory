"use client";

import * as React from "react";
import { Doctor, ClinicService } from "@/data/ambulatory-data";
import { DoctorCard } from "@/app/_components/doctor-card";
import { Button } from "@/app/_components/ui/button";

export interface DoctorListClientProps {
  initialDoctors: Doctor[];
  clinics: ClinicService[];
  initialClinicFilter?: string;
}

export function DoctorListClient({
  initialDoctors,
  clinics,
  initialClinicFilter = "",
}: DoctorListClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedClinic, setSelectedClinic] = React.useState(initialClinicFilter);
  const [selectedDay, setSelectedDay] = React.useState("");

  const daysList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const filteredDoctors = React.useMemo(() => {
    return initialDoctors.filter((doc) => {
      const matchSearch =
        searchTerm === "" ||
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());

      const matchClinic =
        selectedClinic === "" || doc.clinicId === selectedClinic;

      const matchDay =
        selectedDay === "" || doc.availableDays.includes(selectedDay);

      return matchSearch && matchClinic && matchDay;
    });
  }, [initialDoctors, searchTerm, selectedClinic, selectedDay]);

  function handleResetFilters() {
    setSearchTerm("");
    setSelectedClinic("");
    setSelectedDay("");
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Keyword Search */}
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Cari Nama Dokter atau Spesialisasi
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ketik nama dokter (misal: Hendra, Jantung)..."
              className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
            />
          </div>

          {/* Polyclinic Filter */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Poliklinik
            </label>
            <select
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
            >
              <option value="">Semua Poliklinik</option>
              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </option>
              ))}
            </select>
          </div>

          {/* Day Filter */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Hari Praktik
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
            >
              <option value="">Semua Hari</option>
              {daysList.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Info & Reset Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2 pt-2 border-t border-border">
          <span>
            Menampilkan <strong className="text-foreground">{filteredDoctors.length}</strong> dari{" "}
            {initialDoctors.length} dokter spesialis
          </span>

          {(searchTerm || selectedClinic || selectedDay) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-primary hover:underline font-semibold text-left sm:text-right cursor-pointer"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      </div>

      {/* Doctor Cards Grid or Empty State */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      ) : (
        /* Empty State (R-27 Antislop compliant) */
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-2xl text-muted-foreground">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">
              Dokter Tidak Ditemukan
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Tidak ada jadwal dokter spesialis yang sesuai dengan kriteria pencarian atau filter yang Anda pilih.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Tampilkan Semua Dokter
          </Button>
        </div>
      )}
    </div>
  );
}
