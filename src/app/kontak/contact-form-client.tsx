"use client";

import * as React from "react";
import { Button } from "@/app/_components/ui/button";

export function ContactFormClient() {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [petInfo, setPetInfo] = React.useState("");
  const [topic, setTopic] = React.useState("Layanan Kunjungan ke Rumah (House Call)");
  const [message, setMessage] = React.useState("");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !contact.trim() || !message.trim()) {
      setFormError("Mohon lengkapi nama, kontak WhatsApp/email, dan pesan Anda.");
      return;
    }

    setIsSubmitting(true);
    timerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  }

  function handleReset() {
    setName("");
    setContact("");
    setPetInfo("");
    setMessage("");
    setFormError(null);
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-lg font-bold text-foreground">
          Pesan Konsultasi Anda Telah Diterima
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Terima kasih telah menghubungi Amir Vet Ambulatory. Tim dokter hewan dan admin kami akan segera menindaklanjuti pesan Anda melalui nomor WhatsApp yang dicantumkan.
        </p>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Kirim Pesan Lain
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-xs">
      <div className="space-y-1 mb-2">
        <h3 className="text-lg font-bold text-foreground">
          Formulir Konsultasi & Permintaan House Call
        </h3>
        <p className="text-xs text-muted-foreground">
          Tanyakan jadwal dokter hewan, jangkauan area house call, atau konsultasi paket perawatan.
        </p>
      </div>

      {formError && (
        <div
          role="alert"
          className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs font-medium text-destructive"
        >
          ⚠️ {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Nama Pemilik *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (formError) setFormError(null);
            }}
            placeholder="Nama Anda"
            className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Nomor WhatsApp *
          </label>
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              if (formError) setFormError(null);
            }}
            placeholder="081234567890"
            className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Data Anabul (Spesies & Usia)
          </label>
          <input
            type="text"
            value={petInfo}
            onChange={(e) => setPetInfo(e.target.value)}
            placeholder="Contoh: Kucing Domestik, 1 Tahun"
            className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Topik Kebutuhan
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
          >
            <option value="Layanan Kunjungan ke Rumah (House Call)">
              Layanan Kunjungan ke Rumah (House Call)
            </option>
            <option value="Jadwal Praktik Dokter Hewan di Klinik">
              Jadwal Praktik Dokter Hewan di Klinik
            </option>
            <option value="Paket Steril Rawat Jalan">Paket Steril Rawat Jalan</option>
            <option value="Vaksinasi & Deworming Berkala">
              Vaksinasi & Deworming Berkala
            </option>
            <option value="Konsultasi Biaya & Layanan Lainnya">
              Konsultasi Biaya & Layanan Lainnya
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          Pesan / Gejala / Alamat House Call *
        </label>
        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (formError) setFormError(null);
          }}
          placeholder="Tuliskan detail pertanyaan atau keluhan anabul, beserta perkiraan alamat jika butuh kunjungan ke rumah..."
          className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden resize-none"
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Mengirim..." : "Kirim Pertanyaan"}
        </Button>
      </div>
    </form>
  );
}
