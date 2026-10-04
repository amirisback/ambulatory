"use client";

import * as React from "react";
import { Button } from "@/app/_components/ui/button";

export function ContactFormClient() {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [topic, setTopic] = React.useState("Jadwal Dokter & Poliklinik");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) {
      alert("Mohon lengkapi seluruh kolom formulir.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  }

  function handleReset() {
    setName("");
    setContact("");
    setMessage("");
    setIsSubmitted(false);
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-lg font-bold text-foreground">
          Pesan Anda Telah Diterima
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Terima kasih telah menghubungi RS Ambulatory Care. Tim layanan pelanggan kami akan segera menindaklanjuti pesan Anda melalui nomor kontak yang tertera.
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
          Formulir Informasi & Bantuan Pasien
        </h3>
        <p className="text-xs text-muted-foreground">
          Isi pertanyaan seputar jadwal dokter, rujukan, atau estimasi biaya pemeriksaan.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          Nama Lengkap *
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          Nomor WhatsApp / Email *
        </label>
        <input
          type="text"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="08123456789 atau email@domain.com"
          className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          Topik Pertanyaan
        </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
        >
          <option value="Jadwal Dokter & Poliklinik">Jadwal Dokter & Poliklinik</option>
          <option value="Paket MCU & Biaya">Paket MCU & Biaya Tindakan</option>
          <option value="Hasil Laboratorium / Radiologi">Hasil Laboratorium / Radiologi</option>
          <option value="Pertanyaan Umum Lainnya">Pertanyaan Umum Lainnya</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          Pesan / Pertanyaan *
        </label>
        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
          className="w-full rounded-md border border-input bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Mengirim Pesan..." : "Kirim Pertanyaan"}
      </Button>
    </form>
  );
}
