import assert from "node:assert/strict";
import test from "node:test";
import {
  isSiteImageUploadPath,
  siteImageStorageFolder,
  siteImageVariantKey,
} from "../src/lib/site-image-variants.ts";

const slotKey = "/images/services/discovery.webp";
const uuid = "123e4567-e89b-12d3-a456-426614174000";

test("builds stable image variant and storage keys", () => {
  assert.equal(siteImageVariantKey(slotKey, "home-card-mobile"), `${slotKey}::variant::home-card-mobile`);
  assert.equal(siteImageStorageFolder(slotKey), "services-discovery-webp");
});

test("accepts only generated WebP paths belonging to the requested slot", () => {
  assert.equal(
    isSiteImageUploadPath(slotKey, `services-discovery-webp/home-card-mobile-${uuid}.webp`),
    true,
  );
  assert.equal(
    isSiteImageUploadPath(slotKey, `hero-diving-reunion-jpg/home-card-mobile-${uuid}.webp`),
    false,
  );
  assert.equal(
    isSiteImageUploadPath(slotKey, `services-discovery-webp/home-card-mobile-${uuid}.jpg`),
    false,
  );
});
