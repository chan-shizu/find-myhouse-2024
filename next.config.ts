import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "game-materials.com",
      },
    ],
  },
};

export default nextConfig;
