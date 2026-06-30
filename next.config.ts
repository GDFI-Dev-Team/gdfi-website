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
        destination: '/about-us/overview-history',
        permanent: false,
      },
      {
        source: '/get-involved',
        destination: '/get-involved/careers-and-internships',
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
      // Back-compat for the old /research URLs (publications moved into Resources)
      {
        source: '/research',
        destination: '/resources/research-and-publications',
        permanent: false,
      },
      {
        source: '/research/publications',
        destination: '/resources/research-and-publications',
        permanent: false,
      },
      {
        source: '/research/publications/page',
        destination: '/resources/research-and-publications',
        permanent: false,
      },
      {
        source: '/research/publications/page/:page',
        destination: '/resources/research-and-publications/page/:page',
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
      // Back-compat for the old /programs URLs (order matters: page routes
      // must precede the catch-all :slug rule)
      {
        source: '/programs',
        destination: '/our-works/programs-and-projects',
        permanent: false,
      },
      {
        source: '/programs/page',
        destination: '/our-works/programs-and-projects',
        permanent: false,
      },
      {
        source: '/programs/page/:page',
        destination: '/our-works/programs-and-projects/page/:page',
        permanent: false,
      },
      {
        source: '/programs/:slug',
        destination: '/our-works/programs-and-projects/:slug',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
