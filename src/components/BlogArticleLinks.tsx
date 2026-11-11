"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePreviewTextValue } from "./PreviewText";

export function BlogArticleImageLink({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  const currentTitle = usePreviewTextValue(`article.${href}.title`, title);
  return <Link className="blog-origin-image" href={href} aria-label={currentTitle}>{children}</Link>;
}

export function BlogArticleEmailLink({ path, title, url, children }: { path: string; title: string; url: string; children: ReactNode }) {
  const currentTitle = usePreviewTextValue(`article.${path}.title`, title);
  return <a href={`mailto:?subject=${encodeURIComponent(currentTitle)}&body=${encodeURIComponent(url)}`}>{children}</a>;
}
