import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
