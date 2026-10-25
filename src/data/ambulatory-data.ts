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
    id: "hewan-kecil",
    name: "Poliklinik Kucing & Anjing (Umum)",
    category: "Penyakit Dalam & Umum",
    description: "Pemeriksaan kesehatan rutin, penanganan demam, flu kucing, diare, gangguan pencernaan, dan infeksi pernapasan.",
    operatingHours: "Senin - Sabtu (08:00 - 20:00 WIB)",
    location: "Ruang Periksa 1 & 2 (Zona Bebas Stres)",
    iconName: "Stethoscope",
  },
  {
    id: "house-call",
    name: "Layanan Ambulatori & Kunjungan Rumah (House Call)",
    category: "Ambulatory Mobile Service",
    description: "Dokter hewan datang langsung ke rumah Anda dengan perlengkapan medis portabel lengkap untuk anabul yang stres jika bepergian.",
    operatingHours: "Setiap Hari (08:30 - 18:00 WIB)",
    location: "Kunjungan Area Jakarta & Sekitarnya",
    iconName: "Truck",
  },
  {
    id: "vaksinasi",
    name: "Vaksinasi & Perlindungan Preventif",
    category: "Preventif & Imunisasi",
    description: "Vaksinasi lengkap F3/F4 (Tricat/Tetracat), Rabies, Parvovirus, serta pemberian obat cacing dan anti-kutu tetes berkala.",
    operatingHours: "Senin - Minggu (08:00 - 19:00 WIB)",
    location: "Ruang Imunisasi & Edukasi",
    iconName: "ShieldCheck",
  },
  {
    id: "bedah-minor",
    name: "Bedah Minor Rawat Jalan (Day Surgery)",
    category: "Bedah Rawat Jalan",
    description: "Steril jantan & betina (kucing/anjing), penjahitan luka robek, penanganan abses, dan pembedahan tumor jinak superfisial langsung pulang hari yang sama.",
    operatingHours: "Senin - Jumat (09:00 - 15:00 WIB)",
    location: "Ruang Operasi Minor Steril",
    iconName: "Scissors",
  },
  {
    id: "gigi-mulut",
    name: "Perawatan Gigi & Mulut Hewan (Dental Care)",
    category: "Kedokteran Gigi Hewan",
    description: "Pembersihan karang gigi ultrasonik (scaling), poles gigi, terapi radang gusi (gingivitis), dan pencabutan gigi sulung persisten.",
    operatingHours: "Selasa, Kamis, Sabtu (10:00 - 16:00 WIB)",
    location: "Unit Dental Hewan",
    iconName: "Smile",
  },
  {
    id: "kulit-alergi",
    name: "Dermatologi & Pengobatan Kulit",
    category: "Kulit & Telinga",
    description: "Pemeriksaan mikroskopik kerokan kulit untuk jamur (ringworm), tungau (scabies/demodex), serta alergi pakan dan dermatitis kutu.",
    operatingHours: "Senin - Sabtu (09:00 - 17:00 WIB)",
    location: "Ruang Dermatologi",
    iconName: "Sparkles",
  },
  {
    id: "laboratorium-rapid",
    name: "Laboratorium Cepat & Rapid Diagnostic",
    category: "Diagnostik Penunjang",
    description: "Rapid test instan Panleukopenia, Canine Parvovirus, Distemper, tes darah hematologi rutin, dan sitologi telinga dalam 15 menit.",
    operatingHours: "Buka Setiap Hari (08:00 - 20:00 WIB)",
    location: "Lab Diagnostik Mandiri",
    iconName: "FlaskConical",
  },
  {
    id: "usg-radiologi",
    name: "USG & Rontgen Digital Hewan",
    category: "Pencitraan Medis",
    description: "USG kebuntingan, evaluasi kandung kemih (FLUTD), serta rontgen digital tulang dan dada dengan radiasi aman untuk anabul.",
    operatingHours: "Senin - Sabtu (09:00 - 18:00 WIB)",
    location: "Ruang Pencitraan Terpadu",
    iconName: "Scan",
  },
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: "drh-anisa-sp-bedah",
    name: "drh. Anisa Rahmawati",
    specialty: "Dokter Hewan Praktisi Bedah Minor & Steril",
    clinicId: "bedah-minor",
    qualification: "Fakultas Kedokteran Hewan Institut Pertanian Bogor (IPB)",
    experienceYears: 10,
    availableDays: ["Senin", "Rabu", "Jumat", "Sabtu"],
    scheduleTime: "08:30 - 14:00 WIB",
    dailyQuota: 12,
  },
  {
    id: "drh-bima-ambulatory",
    name: "drh. Bima Satria Nugraha",
    specialty: "Dokter Hewan Ambulatori & House-Call",
    clinicId: "house-call",
    qualification: "Fakultas Kedokteran Hewan Universitas Gadjah Mada (UGM)",
    experienceYears: 8,
    availableDays: ["Senin", "Selasa", "Kamis", "Sabtu", "Minggu"],
    scheduleTime: "09:00 - 17:00 WIB",
    dailyQuota: 8,
  },
  {
    id: "drh-ratna-dermatologi",
    name: "drh. Ratna Kusuma Dewi",
    specialty: "Dokter Hewan Praktisi Penyakit Dalam & Kulit",
    clinicId: "kulit-alergi",
    qualification: "Fakultas Kedokteran Hewan Universitas Airlangga (UNAIR)",
    experienceYears: 12,
    availableDays: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    scheduleTime: "10:00 - 18:00 WIB",
    dailyQuota: 15,
  },
  {
    id: "drh-farhan-preventif",
    name: "drh. Farhan Maulana",
    specialty: "Dokter Hewan Gigi & Vaksinasi Terpadu",
    clinicId: "vaksinasi",
    qualification: "Fakultas Kedokteran Hewan Universitas Brawijaya (UB)",
    experienceYears: 7,
    availableDays: ["Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    scheduleTime: "11:00 - 19:30 WIB",
    dailyQuota: 16,
  },
];

export const PATIENT_FLOW_STEPS: PatientFlowStep[] = [
  {
    step: 1,
    title: "Reservasi Janji Temu Online",
    description: "Pilih perawatan di klinik atau minta dokter hewan berkunjung ke rumah (House Call), tentukan jadwal dan jenis anabul Anda.",
    icon: "CalendarCheck",
  },
  {
    step: 2,
    title: "Triase & Timbang Berat Badan",
    description: "Pemeriksaan berat badan anabul, suhu tubuh, dan riwayat keluhan tanpa stres di ruang tunggu terpisah (kucing vs anjing).",
    icon: "FileCheck2",
  },
  {
    step: 3,
    title: "Pemeriksaan SOAP & Tindakan Medis",
    description: "Evaluasi menyeluruh oleh dokter hewan, diagnosa akurat, dan tindakan medis langsung dengan peralatan higienis.",
    icon: "Stethoscope",
  },
  {
    step: 4,
    title: "Resep Digital & Jadwal Booster WA",
    description: "Pemberian obat dengan panduan dosis akurat serta pengingat vaksinasi atau kontrol otomatis yang dikirim ke nomor WhatsApp Anda.",
    icon: "Pill",
  },
];

export const HOSPITAL_FACILITIES: Facility[] = [
  {
    id: "fear-free-zones",
    name: "Ruang Tunggu Fear-Free (Kucing & Anjing Terpisah)",
    description: "Desain ramah hewan yang memisahkan anjing dan kucing untuk meminimalkan stres dan kecemasan anabul sebelum diperiksa.",
    features: ["Diffuser feromon penenang alami", "Area tunggu kucing tinggi (elevated cat bays)", "Tata suara tenang & higienis"],
  },
  {
    id: "mobile-ambulatory-kit",
    name: "Unit Tas Medis Ambulatori Siaga",
    description: "Kit diagnostik portabel lengkap untuk dokter hewan yang melakukan kunjungan ke rumah (house call) dengan standar klinik.",
    features: ["Mikroskop lapangan portabel", "Alat suntik & obat darurat steril", "Termometer digital cepat & lampu Wood"],
  },
  {
    id: "digital-pet-records",
    name: "Rekam Medis Elektronik Anabul (Pet EMR)",
    description: "Sistem rekam medis digital menyimpan riwayat berat badan, log vaksinasi, alergi, dan riwayat resep yang dapat diakses kapan saja.",
    features: ["Buku vaksin digital", "Riwayat resep & dosis obat", "Pengingat jadwal vaksin otomatis ke WhatsApp"],
  },
];
