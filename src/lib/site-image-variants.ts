const VARIANT_SEPARATOR = "::variant::";

export function siteImageVariantKey(slotKey: string, variantId: string) {
  return `${slotKey}${VARIANT_SEPARATOR}${variantId}`;
}

export function siteImageRowKeys(slotKey: string, variantIds: string[]) {
  return [slotKey, ...variantIds.map((variantId) => siteImageVariantKey(slotKey, variantId))];
}
