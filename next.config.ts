import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ideogram.ai",
        port: "",
        pathname: "/assets/image/lossless/response/**",
      },
    ],
    },
};

export default nextConfig;
