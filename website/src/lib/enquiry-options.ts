export const ENQUIRY_SERVICES = [
  "Website development",
  "Application development",
  "UI/UX design",
  "Custom digital solutions",
  "Website security",
  "Vulnerability Assessment and Penetration Testing (VAPT)",
  "Network security",
  "Infrastructure security",
  "Cybersecurity training",
  "PMAT Website Care & Security",
  "Other",
] as const;

export type EnquiryService = (typeof ENQUIRY_SERVICES)[number];

export const ENQUIRY_CONTEXTS: Record<string, EnquiryService> = {
  build: "Website development",
  secure: "Website security",
  care: "PMAT Website Care & Security",
};

export const ENQUIRY_BUDGETS = [
  "Not specified",
  "Under €1,000",
  "€1,000–€5,000",
  "€5,000–€15,000",
  "€15,000+",
  "Not sure",
] as const;
