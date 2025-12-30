import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  images: {
    unoptimized: true,        // Required for static export
  },
};

export default nextConfig;
