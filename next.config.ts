import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ocultar indicador "N" de Next.js en desarrollo
  devIndicators: false,
};

export default nextConfig;
