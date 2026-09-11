import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["three"],
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
