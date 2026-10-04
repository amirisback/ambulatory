export interface ClinicService {
  id: string;
  name: string;
  category: string;
  description: string;
  operatingHours: string;
  location: string;
  iconName: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinicId: string;
  qualification: string;
  experienceYears: number;
  availableDays: string[];
  scheduleTime: string;
  dailyQuota: number;
}

export interface PatientFlowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  features: string[];
}

export const CLINIC_SERVICES: ClinicService[] = [
  {
    id: "penyakit-dalam",
    name: "Poliklinik Penyakit Dalam",
    category: "Spesialis Dewasa",
    description: "Diagnosis dan penanganan komprehensif penyakit metabolik, diabetes, hipertensi, ginjal, dan gangguan pencernaan.",
    operatingHours: "Senin - Sabtu (08:00 - 20:00 WIB)",
    location: "Gedung A, Lantai 1",
    iconName: "Stethoscope",
  },
  {
    id: "jantung",
    name: "Poliklinik Jantung & Pembuluh Darah",
    category: "Kardiovaskular",
    description: "Evaluasi kesehatan jantung, EKG digital, echocardiography, dan konsultasi pencegahan penyakit jantung koroner.",
    operatingHours: "Senin - Jumat (09:00 - 18:00 WIB)",
    location: "Gedung A, Lantai 2",
    iconName: "HeartPulse",
  },
  {
    id: "anak",
    name: "Poliklinik Anak & Tumbuh Kembang",
    category: "Pediatri",
    description: "Pemantauan tumbuh kembang anak, imunisasi rutin terpadu, dan penanganan penyakit infeksi pediatrik.",
    operatingHours: "Senin - Sabtu (08:00 - 19:00 WIB)",
    location: "Gedung B, Lantai 1",
    iconName: "Baby",
  },
  {
    id: "saraf",
    name: "Poliklinik Saraf (Neurologi)",
    category: "Neurologi",
    description: "Penanganan migrain, vertigo, neuropati, pencegahan stroke, dan evaluasi fungsi saraf tepi.",
    operatingHours: "Selasa, Kamis, Sabtu (10:00 - 17:00 WIB)",
    location: "Gedung A, Lantai 2",
    iconName: "BrainCircuit",
  },
  {
    id: "mata",
    name: "Poliklinik Mata",
    category: "Oftalmologi",
    description: "Pemeriksaan refraksi mata, skrining glaukoma, katarak, dan layanan kesehatan mata komprehensif.",
    operatingHours: "Senin - Jumat (08:30 - 16:30 WIB)",
    location: "Gedung B, Lantai 2",
    iconName: "Eye",
  },
  {
    id: "gigi",
    name: "Poliklinik Gigi & Mulut",
    category: "Kedokteran Gigi",
    description: "Perawatan konservasi gigi, scaling ultrasonic, penambalan estetika, dan bedah mulut minor rawat jalan.",
    operatingHours: "Senin - Sabtu (09:00 - 20:00 WIB)",
    location: "Gedung B, Lantai 2",
    iconName: "Smile",
  },
  {
    id: "radiologi",
    name: "Layanan Radiologi & USG",
    category: "Diagnostik Penunjang",
    description: "Rontgen digital dosis rendah, USG abdomen & vaskular dengan interpretasi spesialis radiologi cepat.",
    operatingHours: "Buka Setiap Hari 24 Jam",
    location: "Gedung A, Lantai Dasar",
    iconName: "Scan",
  },
  {
    id: "laboratorium",
    name: "Laboratorium Klinis Terpadu",
    category: "Diagnostik Penunjang",
    description: "Pemeriksaan darah lengkap, profil lipid, fungsi ginjal, hati, dan skrining infeksi dengan hasil cepat online.",
    operatingHours: "Buka Setiap Hari 24 Jam",
    location: "Gedung A, Lantai Dasar",
    iconName: "FlaskConical",
  },
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: "dr-hendra-sp-pd",
    name: "dr. Hendra Pratama, Sp.PD",
    specialty: "Spesialis Penyakit Dalam",
    clinicId: "penyakit-dalam",
    qualification: "Fakultas Kedokteran Universitas Indonesia",
    experienceYears: 14,
    availableDays: ["Senin", "Rabu", "Jumat"],
    scheduleTime: "08:30 - 13:00 WIB",
    dailyQuota: 20,
  },
  {
    id: "dr-siti-sp-a",
    name: "dr. Siti Rahmawati, Sp.A",
    specialty: "Spesialis Anak & Pediatri",
    clinicId: "anak",
    qualification: "Fakultas Kedokteran Universitas Gadjah Mada",
    experienceYears: 11,
    availableDays: ["Senin", "Selasa", "Kamis", "Sabtu"],
    scheduleTime: "09:00 - 14:00 WIB",
    dailyQuota: 25,
  },
  {
    id: "dr-budi-sp-jp",
    name: "dr. Budi Wicaksono, Sp.JP, FIHA",
    specialty: "Spesialis Jantung & Pembuluh Darah",
    clinicId: "jantung",
    qualification: "Fakultas Kedokteran Universitas Airlangga",
    experienceYears: 16,
    availableDays: ["Selasa", "Kamis", "Jumat"],
    scheduleTime: "13:30 - 18:00 WIB",
    dailyQuota: 15,
  },
  {
    id: "dr-claudia-sp-s",
    name: "dr. Claudia Widjaja, Sp.S",
    specialty: "Spesialis Neurologi (Saraf)",
    clinicId: "saraf",
    qualification: "Fakultas Kedokteran Universitas Indonesia",
    experienceYears: 9,
    availableDays: ["Rabu", "Jumat", "Sabtu"],
    scheduleTime: "10:00 - 15:00 WIB",
    dailyQuota: 18,
  },
  {
    id: "dr-anandita-sp-m",
    name: "dr. Anandita Putri, Sp.M",
    specialty: "Spesialis Mata (Oftalmologi)",
    clinicId: "mata",
    qualification: "Fakultas Kedokteran Universitas Padjadjaran",
    experienceYears: 10,
    availableDays: ["Senin", "Rabu", "Kamis"],
    scheduleTime: "09:00 - 13:30 WIB",
    dailyQuota: 20,
  },
  {
    id: "drg-fauzan-sp-bm",
    name: "drg. Fauzan Hakim, Sp.BM",
    specialty: "Spesialis Bedah Mulut & Gigi",
    clinicId: "gigi",
    qualification: "Fakultas Kedokteran Gigi Universitas Indonesia",
    experienceYears: 12,
    availableDays: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    scheduleTime: "14:00 - 19:30 WIB",
    dailyQuota: 16,
  },
];

export const PATIENT_FLOW_STEPS: PatientFlowStep[] = [
  {
    step: 1,
    title: "Reservasi Mandiri Online",
    description: "Pilih poliklinik dan dokter spesialis yang sesuai, tentukan tanggal kunjungan, serta peroleh kode registrasi tiket.",
    icon: "CalendarCheck",
  },
  {
    step: 2,
    title: "Verifikasi Cepat di Loket",
    description: "Tunjukkan kode registrasi di loket mandiri atau resepsionis tanpa perlu mengantre formulir kertas.",
    icon: "FileCheck2",
  },
  {
    step: 3,
    title: "Konsultasi & Pemeriksaan Medis",
    description: "Pemeriksaan langsung bersama dokter spesialis di ruang poliklinik yang privat, higienis, dan nyaman.",
    icon: "Stethoscope",
  },
  {
    step: 4,
    title: "Farmasi Digital & Pasien Pulang",
    description: "Resep obat dikirim langsung secara digital ke instalasi farmasi. Pasien mengambil obat dan dapat langsung pulang.",
    icon: "Pill",
  },
];

export const HOSPITAL_FACILITIES: Facility[] = [
  {
    id: "digital-pharmacy",
    name: "Farmasi Rawat Jalan Terintegrasi",
    description: "Sistem e-resep otomatis dengan pengecekan interaksi obat terkomputerisasi, mempercepat penyiapan obat pasien.",
    features: ["Waktu tunggu obat < 15 menit", "Konseling apoteker profesional", "Kemasan obat terlabel jelas"],
  },
  {
    id: "observation-lounge",
    name: "Ruang Observasi Singkat (Day Care)",
    description: "Fasilitas perawatan beberapa jam untuk tindakan terapi infus, observasi pasca-tindakan minor, atau nebulisasi.",
    features: ["Bed medis elektrik yang nyaman", "Monitoring tanda vital berkala", "Lingkungan tenang dan higienis"],
  },
  {
    id: "digital-records",
    name: "Rekam Medis Elektronik Terpusat",
    description: "Riwayat diagnosis, hasil lab, dan resep tersimpan aman dan terintegrasi antar seluruh poliklinik.",
    features: ["Standar privasi data medis ketat", "Akses cepat antar poliklinik", "Hasil lab langsung dapat diunduh"],
  },
];
