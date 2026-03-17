import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/products/**",
      },
      {
        pathname: "/retailnext-logo.png",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.lululemon.com",
        pathname: "/is/image/lululemon/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
