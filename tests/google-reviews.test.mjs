import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_GOOGLE_REVIEWS_URL, googleReviewsUrl, validateGoogleReviewsUrl } from "../src/lib/google-reviews.ts";

test("review links accept official HTTPS Google addresses and reject misleading domains", () => {
  assert.equal(validateGoogleReviewsUrl(DEFAULT_GOOGLE_REVIEWS_URL), DEFAULT_GOOGLE_REVIEWS_URL);
  assert.equal(validateGoogleReviewsUrl("https://maps.app.goo.gl/example"), "https://maps.app.goo.gl/example");
  assert.throws(() => validateGoogleReviewsUrl("http://google.com/maps"));
  assert.throws(() => validateGoogleReviewsUrl("https://google.com.example.org/"));
  assert.throws(() => validateGoogleReviewsUrl("https://example.org@google.com/"));
  assert.equal(googleReviewsUrl("javascript:alert(1)"), DEFAULT_GOOGLE_REVIEWS_URL);
});
