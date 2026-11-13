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
    formats: ["image/webp"],
    qualities: [75],
    minimumCacheTTL: 2678400,
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
      ...([
        ["/en/home/", "/"], ["/en/about-us/", "/qui-sommes-nous/"],
        ["/en/our-services/", "/nos-prestations/"], ["/en/discover/", "/decouverte/"],
        ["/en/i-discover-baptism/", "/decouverte/"], ["/en/i-discover-initiation/", "/je-decouvre-initiation/"],
        ["/en/ssi_training-course/", "/formation_ssi/"], ["/en/french-training/", "/formation-francaise/"],
        ["/en/i-dive/", "/je-plonge-autonome/"], ["/en/french-to-american-american-to-french/", "/passerelle/"],
        ["/en/cetacean-excursions/", "/sorties-cetaces-2/"], ["/en/rates/", "/nos-tarifs/"],
        ["/en/our-events/", "/evenements/"], ["/en/contact/", "/contactez-nous/"],
        ["/en/to-dive-in-reunion/", "/plonger-reunion/"], ["/en/blog-about-diving-in-reunion-island/", "/blog/"],
        ["/en/shop/", "/boutique/"], ["/en/cart/", "/panier/"],
        ["/en/privacy-policies/", "/confidentialite/"], ["/en/terms-and-conditions/", "/mention-legal/"],
      ] as const).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/en/:path*", destination: "/", permanent: true },
      {
        source: "/tag/evenement-a-venir/",
        destination: "/evenements/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
