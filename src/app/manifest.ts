import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RS Ambulatory Care',
    short_name: 'AmbulatoryCare',
    description: 'Pusat Layanan Rawat Jalan Terpadu & Jadwal Dokter Spesialis',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0d5c63',
    icons: [
      {
        src: '/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
