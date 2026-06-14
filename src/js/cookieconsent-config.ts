import type { CookieConsentConfig } from "vanilla-cookieconsent";
import * as CookieConsent from "vanilla-cookieconsent";

import { legal, umamiHost, umamiWebsiteId } from "@config/legal";

const policyLinks = {
  privacy: "/privacy-policy/",
  cookies: "/cookie-policy/",
} as const;

function loadUmami() {
  if (!umamiHost || !umamiWebsiteId) return;
  void CookieConsent.loadScript(`https://${umamiHost}/script.js`, {
    "data-website-id": umamiWebsiteId,
  });
}

function unloadUmami() {
  if (!umamiHost) return;
  document
    .querySelectorAll(`script[src*="${umamiHost}"]`)
    .forEach((script) => script.remove());
}

const analyticsServices =
  umamiHost && umamiWebsiteId
    ? {
        umami: {
          label: legal.analyticsTool,
          onAccept: loadUmami,
          onReject: unloadUmami,
        },
      }
    : undefined;

const translations = {
  consentModal: {
    title: "Cookies and privacy",
    description:
      "This site uses cookies to remember your choices and run core features. Optional cookies may be used to measure how the site is used and to load embedded content. Read our policies, then accept all, reject optional cookies, or manage your preferences.",
    acceptAllBtn: "Accept all",
    acceptNecessaryBtn: "Reject all",
    showPreferencesBtn: "Manage preferences",
    footer: `
      <a href="${policyLinks.privacy}">Privacy Policy</a>
      <a href="${policyLinks.cookies}">Cookie Policy</a>
    `,
  },
  preferencesModal: {
    title: "Cookie preferences",
    acceptAllBtn: "Accept all",
    acceptNecessaryBtn: "Reject all",
    savePreferencesBtn: "Save preferences",
    closeIconLabel: "Close",
    serviceCounterLabel: "Service|Services",
    sections: [
      {
        title: "Your choices",
        description:
          "You can accept or decline the categories below. Strictly necessary cookies are always on.",
      },
      {
        title: "Strictly necessary",
        description:
          "Remember your consent choice and display preferences. These cannot be turned off.",
        linkedCategory: "necessary",
      },
      {
        title: "Analytics",
        description:
          "Aggregated, anonymous usage measurement to understand what is useful on the site. You can decline this category.",
        linkedCategory: "analytics",
      },
      {
        title: "Functional",
        description:
          "The contact form embeds Tally. It only loads after you allow this category.",
        linkedCategory: "functional",
      },
      {
        title: "More information",
        description: `Questions? Email <a href="mailto:${legal.contactEmail}">${legal.contactEmail}</a> or read our <a href="${policyLinks.privacy}">Privacy Policy</a>.`,
      },
    ],
  },
};

export function getCookieConsentConfig(): CookieConsentConfig {
  return {
    mode: "opt-in",
    disablePageInteraction: true,
    cookie: {
      name: "cc_cookie",
      expiresAfterDays: 182,
    },
    guiOptions: {
      consentModal: {
        layout: "box",
        position: "middle center",
        equalWeightButtons: true,
      },
      preferencesModal: {
        layout: "box",
        equalWeightButtons: true,
      },
    },
    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        services: analyticsServices,
      },
      functional: {},
    },
    language: {
      default: "en",
      translations: {
        en: translations,
      },
    },
    onChange: () => {
      document.dispatchEvent(new CustomEvent("cookieconsent-change"));
    },
    onConsent: ({ cookie }) => {
      if (cookie.categories.includes("analytics")) {
        loadUmami();
      }
      document.dispatchEvent(new CustomEvent("cookieconsent-change"));
    },
  };
}
