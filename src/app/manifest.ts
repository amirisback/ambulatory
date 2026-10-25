import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amir Vet Ambulatory',
    short_name: 'AmirVet',
    description: 'Klinik Hewan Rawat Jalan & Layanan Dokter Hewan ke Rumah (House Call)',
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
