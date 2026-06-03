/**
 * Global site settings
 */

import { type SiteSettingsProps } from "./types/configDataTypes";

// The below locales need to match what you've put in your `astro.config.mjs` file
export const locales = ["en"] as const;
export const defaultLocale = "en" as const;

export const localeMap = {
  en: "en-US",
} as const;

export const languageSwitcherMap = {
  en: "EN",
} as const;

// site settings that don't change between languages
export const siteSettings: SiteSettingsProps = {
  useViewTransitions: true,
  useAnimations: true,
};

export default siteSettings;
