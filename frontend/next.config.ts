import type { NextConfig } from 'next'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: '/CtcdmsDg/:path*', destination: `${apiUrl}/CtcdmsDg/:path*` }]
  },
}

export default nextConfig
