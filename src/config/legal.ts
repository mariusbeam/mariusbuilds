/** Shared legal / company details for policies and the cookie banner. */
export const legal = {
  companyName: "Beamlight",
  fullLegalName: "Beamlight (KVK 90049209)",
  country: "the Netherlands",
  address: "KVK 90049209, the Netherlands",
  contactEmail: "reach@beamlight.me",
  effectiveDate: "14 June 2026",
  analyticsTool: "Umami",
  tallyFormId: "rjqG6X",
} as const;

export const umamiHost = import.meta.env.PUBLIC_UMAMI_HOST as string | undefined;
export const umamiWebsiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID as string | undefined;
