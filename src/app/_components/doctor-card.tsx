"use client";

import * as React from "react";
import { Doctor } from "@/data/ambulatory-data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BookingModal } from "./booking-modal";

export interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Generate doctor initials for accessible avatar
  const initials = doctor.name
    .replace(/^drh\.\s*|dr\.\s*|drg\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <>
      <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
        <div>
          {/* Header Card: Avatar & Specialist Badge */}
          <div className="flex items-start gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-bold text-base border border-border">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="default" className="mb-1 text-[11px]">
                {doctor.specialty}
              </Badge>
              <h3 className="text-base font-bold text-foreground leading-snug truncate">
                {doctor.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {doctor.qualification}
              </p>
            </div>
          </div>

          {/* Details & Schedule */}
          <div className="mt-4 space-y-2 border-t border-border pt-3.5 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Pengalaman Praktik:</span>
              <span>{doctor.experienceYears} Tahun</span>
            </div>
            <div>
              <span className="font-medium text-foreground block mb-1">Hari Praktik:</span>
              <div className="flex flex-wrap gap-1">
                {doctor.availableDays.map((day) => (
                  <span
                    key={day}
                    className="inline-block rounded-xs bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-medium text-foreground">Jam Praktik:</span>
              <span className="font-semibold text-primary">{doctor.scheduleTime}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">
            Kuota: <strong className="text-foreground">{doctor.dailyQuota} anabul/hari</strong>
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            aria-label={`Buat janji temu dengan ${doctor.name}`}
          >
            Pilih Jadwal
          </Button>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDoctorId={doctor.id}
        initialClinicId={doctor.clinicId}
      />
    </>
  );
}
