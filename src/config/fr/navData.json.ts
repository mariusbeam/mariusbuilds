/**
 * * This file is used to define the navigation links for the site.
 */

import { type navItem } from "../types/configDataTypes";

const navConfig: navItem[] = [
  {
    text: "Work",
    link: "/work",
  },
  {
    text: "How can I help you?",
    dropdown: [
      {
        text: "Custom tools and web apps",
        link: "/services/custom-tools",
      },
      {
        text: "AI consultancy and automation",
        link: "/services/ai-consultancy",
      },
      {
        text: "Custom websites you actually own",
        link: "/services/custom-websites",
      },
    ],
  },
  {
    text: "Blog",
    link: "/blog",
  },
  {
    text: "Tools",
    link: "/tools",
  },
  {
    text: "About",
    link: "/about",
  },
];

export default navConfig;
