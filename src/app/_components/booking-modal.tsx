"use client";

import * as React from "react";
import { CLINIC_SERVICES, DOCTORS_DATA } from "@/data/ambulatory-data";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoctorId?: string;
  initialClinicId?: string;
}

interface BookingModalContentProps {
  onClose: () => void;
  initialDoctorId?: string;
  initialClinicId?: string;
}

function BookingModalContent({
  onClose,
  initialDoctorId,
  initialClinicId,
}: BookingModalContentProps) {
  const initialDoc = initialDoctorId
    ? DOCTORS_DATA.find((d) => d.id === initialDoctorId)
    : undefined;

  const [selectedClinic, setSelectedClinic] = React.useState(
    initialClinicId || (initialDoc ? initialDoc.clinicId : "")
  );
  const [selectedDoctor, setSelectedDoctor] = React.useState(
    initialDoctorId || ""
  );
  const [patientName, setPatientName] = React.useState("");
  const [patientPhone, setPatientPhone] = React.useState("");
  const [visitDate, setVisitDate] = React.useState("");
  const [timeSession, setTimeSession] = React.useState("Pagi (08:30 - 12:00 WIB)");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [confirmedTicket, setConfirmedTicket] = React.useState<{
    ticketNumber: string;
    doctorName: string;
    clinicName: string;
    date: string;
    session: string;
    patientName: string;
  } | null>(null);

  // Handle escape key
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filteredDoctors = selectedClinic
    ? DOCTORS_DATA.filter((d) => d.clinicId === selectedClinic)
    : DOCTORS_DATA;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !visitDate) {
      alert("Mohon lengkapi nama pasien, nomor telepon, dan tanggal kunjungan.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const doc = DOCTORS_DATA.find((d) => d.id === selectedDoctor) || DOCTORS_DATA[0];
      const clinic =
        CLINIC_SERVICES.find((c) => c.id === (selectedClinic || doc.clinicId)) ||
        CLINIC_SERVICES[0];

      const ticketRandom = Math.floor(1000 + Math.random() * 9000);
      setConfirmedTicket({
        ticketNumber: `AMB-${new Date().getFullYear()}-${ticketRandom}`,
        doctorName: doc.name,
        clinicName: clinic.name,
        date: visitDate,
        session: timeSession,
        patientName,
      });
      setIsSubmitting(false);
    }, 600);
  }

  function handleReset() {
    setConfirmedTicket(null);
    setPatientName("");
    setPatientPhone("");
    setVisitDate("");
    setNotes("");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl transition-all sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Tutup formulir pendaftaran"
        >
          ✕
        </button>

        {confirmedTicket ? (
          <div className="flex flex-col items-center text-center py-4">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-2xl font-bold">
              ✓
            </div>
            <h2 id="booking-modal-title" className="text-xl font-bold text-foreground">
              Pendaftaran Rawat Jalan Dikonfirmasi
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tiket kunjungan konsultasi Anda telah berhasil disimpan dalam antrean digital.
            </p>

            <div className="mt-6 w-full rounded-lg border border-border bg-muted/50 p-5 text-left space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Nomor Registrasi
                </span>
                <span className="font-mono text-base font-bold text-primary">
                  {confirmedTicket.ticketNumber}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nama Pasien</p>
                <p className="text-sm font-semibold text-foreground">
                  {confirmedTicket.patientName}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Poliklinik</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.clinicName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Dokter Pemeriksa</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.doctorName}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Tanggal Kunjungan</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sesi Jadwal</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.session}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-md bg-secondary/80 p-3 text-xs text-secondary-foreground text-left w-full">
              Pemberitahuan: Harap tiba 15 menit lebih awal di Loket Registrasi Rawat Jalan Gedung Utama dengan menunjukkan nomor tiket ini.
            </div>

            <div className="mt-6 flex w-full gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  window.print();
                }}
              >
                Cetak Tiket
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleReset}>
                Selesai
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Badge variant="default" className="mb-2">
                Reservasi Rawat Jalan
              </Badge>
              <h2 id="booking-modal-title" className="text-xl font-bold text-foreground">
                Buat Janji Temu Dokter
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Daftar antrean rawat jalan secara online untuk menghemat waktu tunggu di rumah sakit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Nama Pasien *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Contoh: Hendra Pratama"
                  className="w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Nomor Telepon / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Pilih Poliklinik
                  </label>
                  <select
                    value={selectedClinic}
                    onChange={(e) => {
                      setSelectedClinic(e.target.value);
                      setSelectedDoctor("");
                    }}
                    className="w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="">Semua Poliklinik</option>
                    {CLINIC_SERVICES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Pilih Dokter Spesialis
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="">Pilih Dokter</option>
                    {filteredDoctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.specialty})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Tanggal Kunjungan *
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Sesi Waktu Konsultasi
                  </label>
                  <select
                    value={timeSession}
                    onChange={(e) => setTimeSession(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="Pagi (08:30 - 12:00 WIB)">Pagi (08:30 - 12:00 WIB)</option>
                    <option value="Siang (13:00 - 16:00 WIB)">Siang (13:00 - 16:00 WIB)</option>
                    <option value="Sore (17:00 - 20:30 WIB)">Sore (17:00 - 20:30 WIB)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Catatan / Keluhan Medis (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Jelaskan secara singkat gejala atau kebutuhan konsultasi..."
                  className="w-full rounded-md border border-input bg-card px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden resize-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2 border-t border-border">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Konfirmasi Janji Temu"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export function BookingModal({
  isOpen,
  onClose,
  initialDoctorId,
  initialClinicId,
}: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <BookingModalContent
      key={`${initialDoctorId || ""}-${initialClinicId || ""}`}
      onClose={onClose}
      initialDoctorId={initialDoctorId}
      initialClinicId={initialClinicId}
    />
  );
}
