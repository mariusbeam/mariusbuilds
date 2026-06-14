import type { CookieConsentConfig } from "vanilla-cookieconsent";
import * as CookieConsent from "vanilla-cookieconsent";

import { legal, umamiHost, umamiWebsiteId } from "@config/legal";

type Locale = "en" | "fr";

const policyLinks = {
  en: {
    privacy: "/privacy-policy/",
    cookies: "/cookie-policy/",
  },
  fr: {
    privacy: "/fr/privacy-policy/",
    cookies: "/fr/cookie-policy/",
  },
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

function buildTranslations(locale: Locale) {
  const links = policyLinks[locale];

  if (locale === "fr") {
    return {
      consentModal: {
        title: "Cookies et confidentialité",
        description:
          "Ce site utilise des cookies pour mémoriser vos choix et faire fonctionner les fonctionnalités essentielles. Des cookies optionnels peuvent servir à mesurer l'utilisation du site et à charger des contenus intégrés. Consultez nos politiques, puis acceptez, refusez les cookies optionnels ou gérez vos préférences.",
        acceptAllBtn: "Tout accepter",
        acceptNecessaryBtn: "Refuser",
        showPreferencesBtn: "Gérer les préférences",
        footer: `
          <a href="${links.privacy}">Politique de confidentialité</a>
          <a href="${links.cookies}">Politique des cookies</a>
        `,
      },
      preferencesModal: {
        title: "Préférences cookies",
        acceptAllBtn: "Tout accepter",
        acceptNecessaryBtn: "Refuser",
        savePreferencesBtn: "Enregistrer",
        closeIconLabel: "Fermer",
        serviceCounterLabel: "Service|Services",
        sections: [
          {
            title: "Vos choix",
            description:
              "Vous pouvez accepter ou refuser les catégories ci-dessous. Les cookies strictement nécessaires sont toujours actifs.",
          },
          {
            title: "Strictement nécessaires",
            description:
              "Mémorisent votre choix de consentement et vos préférences d'affichage. Ils ne peuvent pas être désactivés.",
            linkedCategory: "necessary",
          },
          {
            title: "Analytique",
            description:
              "Mesure d'audience agrégée et anonyme pour comprendre ce qui est utile sur le site. Vous pouvez refuser cette catégorie.",
            linkedCategory: "analytics",
          },
          {
            title: "Fonctionnel",
            description:
              "Le formulaire de contact intègre Tally. Il ne se charge qu'après votre accord.",
            linkedCategory: "functional",
          },
          {
            title: "En savoir plus",
            description: `Questions ? Écrivez à <a href="mailto:${legal.contactEmail}">${legal.contactEmail}</a> ou consultez notre <a href="${links.privacy}">politique de confidentialité</a>.`,
          },
        ],
      },
    };
  }

  return {
    consentModal: {
      title: "Cookies and privacy",
      description:
        "This site uses cookies to remember your choices and run core features. Optional cookies may be used to measure how the site is used and to load embedded content. Read our policies, then accept all, reject optional cookies, or manage your preferences.",
      acceptAllBtn: "Accept all",
      acceptNecessaryBtn: "Reject all",
      showPreferencesBtn: "Manage preferences",
      footer: `
        <a href="${links.privacy}">Privacy Policy</a>
        <a href="${links.cookies}">Cookie Policy</a>
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
          description: `Questions? Email <a href="mailto:${legal.contactEmail}">${legal.contactEmail}</a> or read our <a href="${links.privacy}">Privacy Policy</a>.`,
        },
      ],
    },
  };
}

export function getCookieConsentConfig(locale: Locale = "en"): CookieConsentConfig {
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
      default: locale,
      translations: {
        en: buildTranslations("en"),
        fr: buildTranslations("fr"),
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
