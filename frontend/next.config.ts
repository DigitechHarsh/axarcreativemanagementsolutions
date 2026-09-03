import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "acms.harshaicreations.com",
      }
    ],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "https://acms.harshaicreations.com/admin",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
