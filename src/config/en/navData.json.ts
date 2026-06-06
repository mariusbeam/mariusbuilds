/**
 * * This file is used to define the navigation links for the site.
 * Notes:
 * 1 level of dropdown is supported
 * Mega menus look best with 3-5 columns, but supports anything > 2 columns
 * If using icons, the icon should be saved in the src/icons folder. If filename is "tabler/icon.svg" then input "tabler/icon"
 * Recommend getting icons from https://tabler.io/icons
 */

// types
import { type navItem } from "../types/configDataTypes";

// note: 1 level of dropdown is supported
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
