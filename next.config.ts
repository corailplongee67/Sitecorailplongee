import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "9mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.corail-plongee.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/commander/", destination: "/panier/", permanent: true },
      { source: "/sample-page/", destination: "/boutique/", permanent: true },
      {
        source: "/en/boutique/appointment/",
        destination: "/en/shop/",
        permanent: true,
      },
      {
        source: "/tag/evenement-a-venir/",
        destination: "/evenements/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
