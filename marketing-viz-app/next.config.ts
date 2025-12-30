import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  trailingSlash: true,        // Required for GCS static hosting
  basePath: '/gtm-ai-ops',    // TODO: Update with your GCS bucket name
  images: {
    unoptimized: true,        // Required for static export
  },
};

export default nextConfig;
