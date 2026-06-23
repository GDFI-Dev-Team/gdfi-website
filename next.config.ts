import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://pub-a32043e692ef4f1f91a01e5573fd355d.r2.dev/**'),
      new URL('https://img.youtube.com/**'),
    ],
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about-us/mission-vision',
        permanent: false,
      },
      {
        source: '/updates',
        destination: '/updates/announcements',
        permanent: false,
      },
      {
        source: '/resources',
        destination: '/resources/annual-reports',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
