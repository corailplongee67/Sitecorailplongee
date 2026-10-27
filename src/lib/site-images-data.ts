import type { SiteImageMap } from "@/components/SiteImage";
import { SITE_IMAGE_BUCKET } from "./site-image-variants";
import { hasSupabaseEnv } from "./supabase/server";

export function publicSiteImageUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) return "";
  return `${baseUrl}/storage/v1/object/public/${SITE_IMAGE_BUCKET}/${path}`;
}

export async function getSiteImages(): Promise<SiteImageMap> {
  if (!hasSupabaseEnv()) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!baseUrl || !publishableKey) return {};

  let data: Array<{ slot_key: string; image_path: string }>;

  try {
    const response = await fetch(`${baseUrl}/rest/v1/site_images?select=slot_key,image_path`, {
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
      },
      next: { revalidate: 3600, tags: ["site-images"] },
    });
    if (!response.ok) return {};
    data = await response.json() as Array<{ slot_key: string; image_path: string }>;
  } catch {
    // Keep the built-in visuals available if Supabase is temporarily unreachable.
    return {};
  }

  return data.reduce<SiteImageMap>((images, row) => {
    images[row.slot_key] = publicSiteImageUrl(row.image_path);
    return images;
  }, {});
}
