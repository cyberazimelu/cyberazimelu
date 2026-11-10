const ALLOWED_ENQUIRY_ORIGINS = new Set([
  "https://pmazimelutechnologies.com",
  "https://www.pmazimelutechnologies.com",
]);

export function isAllowedEnquiryOrigin(
  originHeader: string | null,
  fetchSite: string | null,
): boolean {
  return (
    originHeader !== null &&
    ALLOWED_ENQUIRY_ORIGINS.has(originHeader) &&
    fetchSite?.trim().toLowerCase() !== "cross-site"
  );
}
