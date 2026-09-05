import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships modern ESM; this keeps it happy in the Next build.
  transpilePackages: ["three"],
};

export default nextConfig;
