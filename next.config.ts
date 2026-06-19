import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-a32043e692ef4f1f91a01e5573fd355d.r2.dev',
      },
    ],
  },
}

export default nextConfig
