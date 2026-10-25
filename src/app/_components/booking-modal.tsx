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

  const [serviceMode, setServiceMode] = React.useState<"in-clinic" | "house-call">(
    initialClinicId === "house-call" || initialDoc?.clinicId === "house-call"
      ? "house-call"
      : "in-clinic"
  );
  const [selectedClinic, setSelectedClinic] = React.useState(
    initialClinicId || (initialDoc ? initialDoc.clinicId : "")
  );
  const [selectedDoctor, setSelectedDoctor] = React.useState(
    initialDoctorId || ""
  );
  const [ownerName, setOwnerName] = React.useState("");
  const [ownerPhone, setOwnerPhone] = React.useState("");
  const [petName, setPetName] = React.useState("");
  const [petSpecies, setPetSpecies] = React.useState("Kucing");
  const [houseCallAddress, setHouseCallAddress] = React.useState("");
  const [visitDate, setVisitDate] = React.useState("");
  const [timeSession, setTimeSession] = React.useState("Pagi (08:30 - 12:00 WIB)");
  const [notes, setNotes] = React.useState("");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [confirmedTicket, setConfirmedTicket] = React.useState<{
    ticketNumber: string;
    doctorName: string;
    clinicName: string;
    date: string;
    session: string;
    ownerName: string;
    petName: string;
    petSpecies: string;
    serviceMode: "in-clinic" | "house-call";
    address?: string;
  } | null>(null);

  const submitTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Body scroll lock while modal is open
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

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
    setFormError(null);

    if (!ownerName.trim() || !ownerPhone.trim() || !petName.trim() || !visitDate) {
      setFormError("Mohon lengkapi nama pemilik, nomor WhatsApp, nama anabul, dan tanggal kunjungan.");
      return;
    }

    // Phone format sanity check (at least 9 digits)
    const cleanPhone = ownerPhone.replace(/\D/g, "");
    if (cleanPhone.length < 9) {
      setFormError("Nomor WhatsApp tidak valid. Masukkan nomor yang aktif (minimal 9 digit).");
      return;
    }

    if (serviceMode === "house-call" && !houseCallAddress.trim()) {
      setFormError("Mohon cantumkan alamat lengkap lokasi kunjungan (House Call).");
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    if (visitDate < todayStr) {
      setFormError("Tanggal kunjungan tidak boleh di masa lampau.");
      return;
    }

    setIsSubmitting(true);
    submitTimerRef.current = setTimeout(() => {
      const doc =
        DOCTORS_DATA.find((d) => d.id === selectedDoctor) ||
        filteredDoctors[0] ||
        DOCTORS_DATA[0];

      const clinic =
        CLINIC_SERVICES.find((c) => c.id === (selectedClinic || doc.clinicId)) ||
        CLINIC_SERVICES[0];

      const ticketRandom = Math.floor(1000 + Math.random() * 9000);
      setConfirmedTicket({
        ticketNumber: `VET-${new Date().getFullYear()}-${ticketRandom}`,
        doctorName: doc.name,
        clinicName: clinic.name,
        date: visitDate,
        session: timeSession,
        ownerName: ownerName.trim(),
        petName: petName.trim(),
        petSpecies,
        serviceMode,
        address: serviceMode === "house-call" ? houseCallAddress.trim() : undefined,
      });
      setIsSubmitting(false);
    }, 400);
  }

  function handleReset() {
    setConfirmedTicket(null);
    setOwnerName("");
    setOwnerPhone("");
    setPetName("");
    setHouseCallAddress("");
    setVisitDate("");
    setNotes("");
    setFormError(null);
    onClose();
  }

  const generateWhatsAppLink = () => {
    if (!confirmedTicket) return "#";
    const modeLabel =
      confirmedTicket.serviceMode === "house-call"
        ? "Kunjungan ke Rumah (House Call)"
        : "Datang ke Klinik Sentral";
    const message = `Halo Admin Amir Vet Ambulatory, saya ingin konfirmasi pendaftaran anabul:
• No Registrasi: ${confirmedTicket.ticketNumber}
• Pemilik: ${confirmedTicket.ownerName}
• Anabul: ${confirmedTicket.petName} (${confirmedTicket.petSpecies})
• Layanan: ${confirmedTicket.clinicName} (${modeLabel})
• Dokter Hewan: ${confirmedTicket.doctorName}
• Jadwal: ${confirmedTicket.date} [${confirmedTicket.session}]
${confirmedTicket.address ? `• Alamat Kunjungan: ${confirmedTicket.address}` : ""}`;

    return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  };

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
          <div className="flex flex-col items-center text-center py-2">
            <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-2xl font-bold">
              ✓
            </div>
            <h2 id="booking-modal-title" className="text-xl font-bold text-foreground">
              Janji Temu Anabul Dikonfirmasi!
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Data pemeriksaan anabul Anda telah tercatat dalam sistem antrean ambulatori.
            </p>

            <div className="mt-5 w-full rounded-lg border border-border bg-muted/50 p-5 text-left space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
                    No. Registrasi
                  </span>
                  <span className="font-mono text-base font-bold text-primary">
                    {confirmedTicket.ticketNumber}
                  </span>
                </div>
                <Badge variant={confirmedTicket.serviceMode === "house-call" ? "default" : "secondary"}>
                  {confirmedTicket.serviceMode === "house-call" ? "House Call" : "In-Clinic"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Pasien Anabul</p>
                  <p className="text-sm font-semibold text-foreground">
                    {confirmedTicket.petName} ({confirmedTicket.petSpecies})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nama Pemilik</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.ownerName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Layanan / Poli</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.clinicName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Dokter Hewan</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.doctorName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Tanggal</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sesi Waktu</p>
                  <p className="text-sm font-medium text-foreground">
                    {confirmedTicket.session}
                  </p>
                </div>
              </div>

              {confirmedTicket.address && (
                <div className="pt-1 border-t border-border">
                  <p className="text-xs text-muted-foreground">Alamat Kunjungan House Call</p>
                  <p className="text-xs font-medium text-foreground">
                    {confirmedTicket.address}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-md bg-secondary/80 p-3 text-xs text-secondary-foreground text-left w-full">
              💡 {confirmedTicket.serviceMode === "house-call"
                ? "Dokter hewan kami akan menghubungi nomor WhatsApp Anda sebelum keberangkatan ke alamat tujuan."
                : "Harap bawa anabul dalam pet cargo atau leash demi keamanan dan kenyamanan bersama."}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row w-full gap-2.5">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
              >
                Kirim Bukti ke WhatsApp
              </a>
              <Button variant="outline" className="flex-1" onClick={handleReset}>
                Selesai
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <Badge variant="default" className="mb-2">
                Reservasi Ambulatori Anabul
              </Badge>
              <h2 id="booking-modal-title" className="text-xl font-bold text-foreground">
                Pendaftaran Janji Temu Anabul
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pilih kunjungan ke klinik atau dokter hewan datang ke rumah Anda (House Call).
              </p>
            </div>

            {/* Form Error Banner */}
            {formError && (
              <div
                role="alert"
                className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs font-medium text-destructive"
              >
                ⚠️ {formError}
              </div>
            )}

            {/* Service Mode Selector */}
            <div className="mb-4 grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg border border-border">
              <button
                type="button"
                onClick={() => {
                  setServiceMode("in-clinic");
                  setFormError(null);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  serviceMode === "in-clinic"
                    ? "bg-card text-primary shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🏥 Datang ke Klinik
              </button>
              <button
                type="button"
                onClick={() => {
                  setServiceMode("house-call");
                  setFormError(null);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  serviceMode === "house-call"
                    ? "bg-card text-primary shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🚗 House Call (Ke Rumah)
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Nama Pemilik (Owner) *
                  </label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => {
                      setOwnerName(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Contoh: Rian Anggoro"
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Nomor WhatsApp Pemilik *
                  </label>
                  <input
                    type="tel"
                    required
                    value={ownerPhone}
                    onChange={(e) => {
                      setOwnerPhone(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Contoh: 081234567890"
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Nama Hewan (Anabul) *
                  </label>
                  <input
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => {
                      setPetName(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Contoh: Mochi / Milo"
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Jenis Spesies Anabul *
                  </label>
                  <select
                    value={petSpecies}
                    onChange={(e) => setPetSpecies(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="Kucing">Kucing</option>
                    <option value="Anjing">Anjing</option>
                    <option value="Kelinci">Kelinci</option>
                    <option value="Burung / Unggas">Burung / Unggas</option>
                    <option value="Reptil / Eksotik">Reptil / Eksotik</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {serviceMode === "house-call" && (
                <div className="p-3 bg-secondary/50 rounded-lg border border-border space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">
                    Alamat Lengkap Kunjungan (House Call) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={houseCallAddress}
                    onChange={(e) => {
                      setHouseCallAddress(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Jl. Melati No. 12, Kompleks Indah, RT 02/05, Jakarta Selatan (Patokan dekat minimarket)"
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden resize-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Layanan Medis
                  </label>
                  <select
                    value={selectedClinic}
                    onChange={(e) => {
                      setSelectedClinic(e.target.value);
                      setSelectedDoctor("");
                    }}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="">Semua Layanan</option>
                    {CLINIC_SERVICES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Dokter Hewan
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="">Pilih Dokter Hewan</option>
                    {filteredDoctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.specialty})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Tanggal Kunjungan *
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => {
                      setVisitDate(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Sesi Waktu Konsultasi
                  </label>
                  <select
                    value={timeSession}
                    onChange={(e) => setTimeSession(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="Pagi (08:30 - 12:00 WIB)">Pagi (08:30 - 12:00 WIB)</option>
                    <option value="Siang (13:00 - 16:00 WIB)">Siang (13:00 - 16:00 WIB)</option>
                    <option value="Sore (17:00 - 20:00 WIB)">Sore (17:00 - 20:00 WIB)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Gejala / Keluhan Anabul (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Kucing lemas, tidak nafsu makan 2 hari, muntah busa..."
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden resize-none"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2.5 pt-2 border-t border-border">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Batal
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Mendaftarkan..." : "Konfirmasi Janji Temu"}
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
