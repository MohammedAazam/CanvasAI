import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        Canvas: false, // Exclude canvas for client-side
      };
    }
    return config;
  },
};

export default nextConfig;


