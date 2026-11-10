import assert from "node:assert/strict";
import test from "node:test";
import { isAllowedEnquiryOrigin } from "../src/lib/enquiry-origin.ts";

test("allows the exact HTTPS apex Origin", () => {
  assert.equal(
    isAllowedEnquiryOrigin(
      "https://pmazimelutechnologies.com",
      "same-origin",
    ),
    true,
  );
});

test("allows the exact HTTPS www Origin", () => {
  assert.equal(
    isAllowedEnquiryOrigin(
      "https://www.pmazimelutechnologies.com",
      "same-origin",
    ),
    true,
  );
});

test("rejects a missing Origin", () => {
  assert.equal(isAllowedEnquiryOrigin(null, "same-origin"), false);
});

test("rejects malformed and non-HTTPS Origins", () => {
  assert.equal(isAllowedEnquiryOrigin("not an origin", "same-origin"), false);
  assert.equal(
    isAllowedEnquiryOrigin(
      "http://pmazimelutechnologies.com",
      "same-origin",
    ),
    false,
  );
});

test("rejects Origins with unexpected ports", () => {
  assert.equal(
    isAllowedEnquiryOrigin(
      "https://pmazimelutechnologies.com:8443",
      "same-origin",
    ),
    false,
  );
  assert.equal(
    isAllowedEnquiryOrigin(
      "https://pmazimelutechnologies.com:443",
      "same-origin",
    ),
    false,
  );
});

test("rejects unapproved domains", () => {
  assert.equal(
    isAllowedEnquiryOrigin("https://example.com", "same-origin"),
    false,
  );
});

test("rejects cross-site Fetch Metadata for an approved Origin", () => {
  assert.equal(
    isAllowedEnquiryOrigin(
      "https://pmazimelutechnologies.com",
      "cross-site",
    ),
    false,
  );
  assert.equal(
    isAllowedEnquiryOrigin(
      "https://pmazimelutechnologies.com",
      " Cross-Site ",
    ),
    false,
  );
});
