/**
 * * This file is used to define the navigation links for the site.
 */

import { type navItem } from "../types/configDataTypes";

const navConfig: navItem[] = [
  {
    text: "How can I help you?",
    dropdown: [
      {
        text: "Custom tools",
        link: "/services/custom-tools",
      },
      {
        text: "AI consultancy",
        link: "/services/ai-consultancy",
      },
      {
        text: "Websites",
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
