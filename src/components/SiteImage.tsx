"use client";

import NextImage, { getImageProps, type ImageProps } from "next/image";
import { createContext, useContext, type ReactNode } from "react";
import { siteImageVariantKey } from "@/lib/site-image-variants";

export type SiteImageMap = Record<string, string>;

type ResponsiveVariants = {
  desktop: string;
  mobile: string;
  breakpoint?: number;
};

type SiteImageProps = ImageProps & {
  variant?: string;
  variants?: ResponsiveVariants;
};

const SiteImageContext = createContext<SiteImageMap>({});

export function SiteImageProvider({ images, children }: { images: SiteImageMap; children: ReactNode }) {
  return <SiteImageContext.Provider value={images}>{children}</SiteImageContext.Provider>;
}

export function SiteImage({ variant, variants, ...props }: SiteImageProps) {
  const images = useContext(SiteImageContext);
  if (typeof props.src !== "string") return <NextImage {...props} />;

  const slotKey = props.src;
  const baseSrc = images[slotKey] ?? slotKey;
  const resolveVariant = (variantId: string) => images[siteImageVariantKey(slotKey, variantId)] ?? baseSrc;
  const automaticVariants: ResponsiveVariants | undefined = images[siteImageVariantKey(slotKey, "desktop")] || images[siteImageVariantKey(slotKey, "mobile")]
    ? { desktop: "desktop", mobile: "mobile" }
    : undefined;
  const responsiveVariants = variants ?? automaticVariants;

  if (!responsiveVariants) {
    return <NextImage {...props} src={variant ? resolveVariant(variant) : baseSrc} />;
  }

  const breakpoint = responsiveVariants.breakpoint ?? 760;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...props, src: resolveVariant(responsiveVariants.desktop) });
  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({ ...props, src: resolveVariant(responsiveVariants.mobile) });

  return (
    <picture className="site-image-picture">
      <source media={`(min-width: ${breakpoint + 1}px)`} srcSet={desktopSrcSet} sizes={props.sizes} />
      <source media={`(max-width: ${breakpoint}px)`} srcSet={mobileSrcSet} sizes={props.sizes} />
      {/* getImageProps intentionally supplies the optimized attributes for art direction. */}
      <img {...mobileProps} alt={props.alt} />
    </picture>
  );
}
