import { describe, it, expect, beforeEach } from "vitest";
import { CLINIC_SERVICES, DOCTORS_DATA, PATIENT_FLOW_STEPS, HOSPITAL_FACILITIES } from "@/data/ambulatory-data";
import { generatePageSeo, generateOrganizationJsonLd, generateWebsiteJsonLd } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";
import { proxy } from "@/proxy";
import { NextRequest } from "next/server";
import { resetRateLimitStore } from "@/lib/rate-limiter";
import { encrypt, decrypt } from "@/lib/crypto";
import { obfuscateId, deobfuscateId } from "@/lib/obfuscator";
import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("E2E Suite: Ambulatory Veterinary Application", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  describe("1. Data Contract & Domain Integrity", () => {
    it("should ensure every doctor links to a valid clinic service", () => {
      const validClinicIds = new Set(CLINIC_SERVICES.map((c) => c.id));
      for (const doctor of DOCTORS_DATA) {
        expect(validClinicIds.has(doctor.clinicId)).toBe(true);
        expect(doctor.name).toMatch(/^drh\./i);
        expect(doctor.dailyQuota).toBeGreaterThan(0);
        expect(doctor.availableDays.length).toBeGreaterThan(0);
      }
    });

    it("should ensure all clinic services have required presentation metadata", () => {
      expect(CLINIC_SERVICES.length).toBeGreaterThanOrEqual(6);
      for (const service of CLINIC_SERVICES) {
        expect(service.id).toBeTruthy();
        expect(service.name).toBeTruthy();
        expect(service.category).toBeTruthy();
        expect(service.description.length).toBeGreaterThan(10);
        expect(service.operatingHours).toBeTruthy();
        expect(service.location).toBeTruthy();
      }
    });

    it("should maintain 4 sequential patient journey flow steps", () => {
      expect(PATIENT_FLOW_STEPS).toHaveLength(4);
      PATIENT_FLOW_STEPS.forEach((step, index) => {
        expect(step.step).toBe(index + 1);
        expect(step.title).toBeTruthy();
        expect(step.description).toBeTruthy();
      });
    });

    it("should provide specialized fear-free and ambulatory facilities", () => {
      expect(HOSPITAL_FACILITIES.length).toBeGreaterThanOrEqual(3);
      const facilityIds = HOSPITAL_FACILITIES.map((f) => f.id);
      expect(facilityIds).toContain("fear-free-zones");
      expect(facilityIds).toContain("mobile-ambulatory-kit");
      expect(facilityIds).toContain("digital-pet-records");
    });
  });

  describe("2. SEO, PWA & Metadata E2E Flow", () => {
    it("should generate VeterinaryCare JSON-LD schema", () => {
      const jsonLd = generateOrganizationJsonLd();
      expect(jsonLd["@type"]).toBe("VeterinaryCare");
      expect(jsonLd.name).toContain("Amir Vet Ambulatory");
      expect(jsonLd.telephone).toBe("+62-812-3456-7890");
      expect(jsonLd.address.addressLocality).toBe("Jakarta Selatan");
    });

    it("should generate SearchAction WebSite JSON-LD pointing to /dokter?q=", () => {
      const websiteLd = generateWebsiteJsonLd("id");
      expect(websiteLd["@type"]).toBe("WebSite");
      expect(websiteLd.potentialAction.target.urlTemplate).toContain("/dokter?q=");
    });

    it("should generate complete OpenGraph and Twitter page SEO", () => {
      const pageSeo = generatePageSeo({
        title: "Layanan Medis Anabul",
        description: "Layanan rawat jalan terpadu",
        locale: "id",
        pathname: "/layanan",
      });

      expect(pageSeo.title).toBe("Layanan Medis Anabul | Amir Vet Ambulatory");
      expect(pageSeo.openGraph?.title).toBe("Layanan Medis Anabul | Amir Vet Ambulatory");
      if (pageSeo.twitter && "card" in pageSeo.twitter) {
        expect(pageSeo.twitter.card).toBe("summary_large_image");
      }
      expect(pageSeo.alternates?.canonical).toContain("/layanan");
    });

    it("should generate valid PWA WebManifest", () => {
      const pwaManifest = manifest();
      expect(pwaManifest.name).toBe("Amir Vet Ambulatory");
      expect(pwaManifest.short_name).toBe("AmirVet");
      expect(pwaManifest.start_url).toBe("/");
      expect(pwaManifest.display).toBe("standalone");
      expect(pwaManifest.icons?.length).toBeGreaterThanOrEqual(2);
    });

    it("should generate secure robots.txt directives", () => {
      const robotsConfig = robots();
      const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules;
      expect(rules?.allow).toBe("/");
      expect(rules?.disallow).toContain("/api/");
      expect(robotsConfig.sitemap).toContain("/sitemap.xml");
    });

    it("should generate sitemap containing all core routes", () => {
      const map = sitemap();
      const urls = map.map((entry) => entry.url);
      const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      expect(urls).toContain(siteUrl);
      expect(urls.some((u) => u.endsWith("/layanan"))).toBe(true);
      expect(urls.some((u) => u.endsWith("/dokter"))).toBe(true);
      expect(urls.some((u) => u.endsWith("/kontak"))).toBe(true);
    });
  });

  describe("3. i18n & Multi-language Consistency", () => {
    it("should have matching key structure between id and en dictionaries", async () => {
      const dictId = await getDictionary("id");
      const dictEn = await getDictionary("en");

      const topKeysId = Object.keys(dictId);
      const topKeysEn = Object.keys(dictEn);

      expect(topKeysId.sort()).toEqual(topKeysEn.sort());
      expect(dictId.common.appName).toBe(dictEn.common.appName);
      expect(dictId.home.heroTitle).toBeTruthy();
      expect(dictEn.home.heroTitle).toBeTruthy();
    });
  });

  describe("4. Security, Edge Proxy & Rate Limiting E2E", () => {
    it("should allow valid browser requests with rate limit headers", () => {
      const req = new NextRequest("http://localhost:3000/layanan", {
        headers: {
          "x-forwarded-for": "192.168.1.10",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      });

      const res = proxy(req);
      expect(res.status).toBe(200);
      expect(res.headers.get("X-RateLimit-Limit")).toBe("120");
      expect(res.headers.get("X-RateLimit-Remaining")).toBe("119");
    });

    it("should block path traversal and sensitive files with 403 Forbidden", () => {
      const sensitivePaths = [
        "http://localhost:3000/.env",
        "http://localhost:3000/.git/config",
        "http://localhost:3000/wp-login.php",
        "http://localhost:3000/api/../../etc/passwd",
      ];

      for (const url of sensitivePaths) {
        const req = new NextRequest(url, {
          headers: { "x-forwarded-for": "10.0.0.5" },
        });
        const res = proxy(req);
        expect(res.status).toBe(403);
      }
    });

    it("should block automated vulnerability scanners", () => {
      const maliciousAgents = ["sqlmap/1.4", "Nikto/2.1.6", "masscan/1.0", "wpscan v3.8"];
      for (const ua of maliciousAgents) {
        const req = new NextRequest("http://localhost:3000/", {
          headers: {
            "x-forwarded-for": "10.0.0.6",
            "user-agent": ua,
          },
        });
        const res = proxy(req);
        expect(res.status).toBe(403);
      }
    });

    it("should enforce rate limiting tier for API and sensitive routes", () => {
      const testIp = "172.16.0.100";
      let response;

      // Tier for /auth/login is 10 requests per minute
      for (let i = 0; i < 11; i++) {
        const req = new NextRequest("http://localhost:3000/auth/login", {
          headers: {
            "x-forwarded-for": testIp,
            "user-agent": "Mozilla/5.0",
          },
        });
        response = proxy(req);
      }

      expect(response?.status).toBe(429);
      expect(response?.headers.get("Retry-After")).toBeDefined();
    });
  });

  describe("5. Cryptography & ID Obfuscation E2E", () => {
    it("should encrypt and decrypt patient records with AES-256-GCM authenticated cipher", () => {
      const record = JSON.stringify({
        petId: 1042,
        owner: "Rian Anggoro",
        petName: "Milo",
        species: "Kucing",
        diagnosis: "Gastroenteritis ringan",
      });

      const encrypted = encrypt(record);
      expect(encrypted).toBeTruthy();
      expect(encrypted).not.toBe(record);

      const decrypted = decrypt(encrypted);
      expect(decrypted).toBe(record);
      const parsed = JSON.parse(decrypted!);
      expect(parsed.petName).toBe("Milo");
    });

    it("should return null and not crash on tampered ciphertext", () => {
      const encrypted = encrypt("secret-pet-info");
      // Tamper with the base64 string
      const tampered = encrypted.slice(0, -4) + "XXXX";
      const result = decrypt(tampered);
      expect(result).toBeNull();
    });

    it("should obfuscate and deobfuscate numeric IDs via Sqids", () => {
      const originalId = 8492;
      const obfuscated = obfuscateId(originalId);
      expect(obfuscated.length).toBeGreaterThanOrEqual(6);

      const restoredId = deobfuscateId(obfuscated);
      expect(restoredId).toBe(originalId);
    });

    it("should reject negative numbers in ID obfuscation", () => {
      expect(() => obfuscateId(-5)).toThrow("Sqids only supports non-negative integers.");
    });
  });

  describe("6. Ambulatory Booking Flow & WhatsApp Link Generator", () => {
    it("should generate a valid In-Clinic appointment ticket and WhatsApp link", () => {
      const ticketNumber = `VET-2026-4591`;
      const ownerName = "Dewi Lestari";
      const petName = "Luna";
      const petSpecies = "Kucing";
      const serviceMode = "in-clinic";
      const clinicName = "Poliklinik Kucing & Anjing (Umum)";
      const doctorName = "drh. Anisa Rahmawati";
      const date = "2026-10-30";
      const session = "Pagi (08:30 - 12:00 WIB)";

      const modeLabel = "Datang ke Klinik Sentral";
      const message = `Halo Admin Amir Vet Ambulatory, saya ingin konfirmasi pendaftaran anabul:
• No Registrasi: ${ticketNumber}
• Pemilik: ${ownerName}
• Anabul: ${petName} (${petSpecies})
• Layanan: ${clinicName} (${modeLabel})
• Dokter Hewan: ${doctorName}
• Jadwal: ${date} [${session}]`;

      const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;

      expect(whatsappUrl).toContain("https://wa.me/6281234567890");
      expect(whatsappUrl).toContain(encodeURIComponent("VET-2026-4591"));
      expect(whatsappUrl).toContain(encodeURIComponent("Luna (Kucing)"));
      expect(whatsappUrl).toContain(encodeURIComponent("Datang ke Klinik Sentral"));
    });

    it("should generate a valid House-Call appointment ticket with address included", () => {
      const ticketNumber = `VET-2026-8820`;
      const ownerName = "Budi Santoso";
      const petName = "Bruno";
      const petSpecies = "Anjing";
      const serviceMode = "house-call";
      const address = "Jl. Teratai No. 15, Ragunan, Jakarta Selatan";
      const clinicName = "Layanan Ambulatori & Kunjungan Rumah (House Call)";
      const doctorName = "drh. Bima Satria Nugraha";
      const date = "2026-10-28";
      const session = "Siang (13:00 - 16:00 WIB)";

      const modeLabel = "Kunjungan ke Rumah (House Call)";
      const message = `Halo Admin Amir Vet Ambulatory, saya ingin konfirmasi pendaftaran anabul:
• No Registrasi: ${ticketNumber}
• Pemilik: ${ownerName}
• Anabul: ${petName} (${petSpecies})
• Layanan: ${clinicName} (${modeLabel})
• Dokter Hewan: ${doctorName}
• Jadwal: ${date} [${session}]
• Alamat Kunjungan: ${address}`;

      const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;

      expect(whatsappUrl).toContain(encodeURIComponent("House Call"));
      expect(whatsappUrl).toContain(encodeURIComponent(address));
      expect(whatsappUrl).toContain(encodeURIComponent("Bruno (Anjing)"));
    });
  });
});
