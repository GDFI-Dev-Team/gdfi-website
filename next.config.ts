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
        hostname: 'cdn.gdfi1988.org',
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
        destination: '/about-us/overview-and-history',
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
        destination: '/resources/research-and-publications',
        permanent: false,
      },
      {
        source: '/resources/research-and-publications/page',
        destination: '/resources/research-and-publications',
        permanent: false,
      },
      {
        source: '/our-works',
        destination: '/our-works/programs-and-projects',
        permanent: false,
      },
      {
        source: '/our-works/programs-and-projects/page',
        destination: '/our-works/programs-and-projects',
        permanent: false,
      },
      {
        source: '/resources/video-and-media-resources/page',
        destination: '/resources/video-and-media-resources',
        permanent: false,
      },
    ]
  },
}

export default nextConfig

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
