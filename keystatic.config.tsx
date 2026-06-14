/**
 * * This is the Keystatic configuration file. It is used to define the collections and fields that will be used in the Keystatic CMS.
 *
 * ! This works in conjunction with Astro content collections. If you update one, you must update the other.
 *
 * Access keystatic interface at /admin or /keystatic
 * This works in local mode in dev, then cloud mode in prod
 * Cloud deployment is free to sign up (up to 3 users per team)
 * Docs: https://keystatic.com/docs/cloud
 * Create a Keystatic Cloud account here: https://keystatic.cloud/
 */

import { config } from "@keystatic/core";

// components
import Collections from "@components/KeystaticComponents/Collections";
import Singletons from "@components/KeystaticComponents/Singletons";

const isDev = import.meta.env.DEV === true;

/** Set on Netlify after creating a project at https://keystatic.cloud (see CMS.md). */
const keystaticCloudProject =
  import.meta.env.KEYSTATIC_CLOUD_PROJECT ?? "mariusbuilds/mariusbuilds";

export default config({
  // Local files in dev; Keystatic Cloud in production
  storage: isDev ? { kind: "local" } : { kind: "cloud" },
  ...(isDev
    ? {}
    : {
        cloud: {
          project: keystaticCloudProject,
        },
      }),
  ui: {
    brand: { name: "mariusbuilds.com" },
  },
  singletons: {
    homepageEN: Singletons.Homepage("en"),
    aboutEN: Singletons.About("en"),
    contactEN: Singletons.Contact("en"),
  },
  collections: {
    blogEN: Collections.Blog("en"),

    workEN: Collections.Work("en"),

    toolsEN: Collections.Tools("en"),

    beliefsEN: Collections.Beliefs("en"),
    howIWorkEN: Collections.HowIWorkSteps("en"),
    faqEN: Collections.Faq("en"),

    authors: Collections.Authors(""),

    servicesEN: Collections.Services("en"),

    otherPagesEN: Collections.OtherPages("en"),
  },
});
