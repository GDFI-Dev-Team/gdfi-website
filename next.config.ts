import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Whitelist device IPs for mobile testing over local network.
  // Set ALLOWED_DEV_ORIGINS=192.168.x.x in .env.local (gitignored).
  allowedDevOrigins:
    process.env.ALLOWED_DEV_ORIGINS?.split(',').filter(Boolean) ?? [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-a32043e692ef4f1f91a01e5573fd355d.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
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
        source: '/updates/announcements/page',
        destination: '/updates/announcements/',
        permanent: false,
      },
      {
        source: '/resources',
        destination: '/resources/annual-reports',
        permanent: false,
      },
      {
        source: '/programs/page',
        destination: '/programs',
        permanent: false,
      },
      {
        source: '/research',
        destination: '/research/publications',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
