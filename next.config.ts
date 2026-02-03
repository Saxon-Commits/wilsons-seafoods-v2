import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'heeihaozzlgucbxzhfvs.supabase.co',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
