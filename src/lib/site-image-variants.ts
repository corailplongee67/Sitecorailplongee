const VARIANT_SEPARATOR = "::variant::";

export const SITE_IMAGE_BUCKET = "site-images";
export const SITE_IMAGE_SOURCE_VARIANT = "source";

export function siteImageVariantKey(slotKey: string, variantId: string) {
  return `${slotKey}${VARIANT_SEPARATOR}${variantId}`;
}

export function siteImageRowKeys(slotKey: string, variantIds: string[]) {
  return [slotKey, ...variantIds.map((variantId) => siteImageVariantKey(slotKey, variantId))];
}

export function siteImageStorageFolder(slotKey: string) {
  return slotKey
    .replace(/^\/images\//, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

export function isSiteImageUploadPath(slotKey: string, path: string) {
  const folder = siteImageStorageFolder(slotKey);
  return path.startsWith(`${folder}/`)
    && /^[a-z0-9-]+\/[a-z0-9-]+-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.webp$/.test(path);
}
