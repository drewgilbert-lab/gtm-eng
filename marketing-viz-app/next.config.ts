import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  trailingSlash: true,        // Required for GCS static hosting
  images: {
    unoptimized: true,        // Required for static export
  },
};

export default nextConfig;
