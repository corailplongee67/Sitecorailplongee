"use client";

import NextImage, { type ImageProps } from "next/image";
import { createContext, useContext, type ReactNode } from "react";

export type SiteImageMap = Record<string, string>;

const SiteImageContext = createContext<SiteImageMap>({});

export function SiteImageProvider({ images, children }: { images: SiteImageMap; children: ReactNode }) {
  return <SiteImageContext.Provider value={images}>{children}</SiteImageContext.Provider>;
}

export function SiteImage(props: ImageProps) {
  const images = useContext(SiteImageContext);
  const src = typeof props.src === "string" ? images[props.src] ?? props.src : props.src;
  return <NextImage {...props} src={src} />;
}
