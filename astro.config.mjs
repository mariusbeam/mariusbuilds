import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import compress from "@playform/compress";
import AutoImport from "astro-auto-import";
import icon from "astro-icon";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";

/** Full reload when config or CMS content files change (Vite HMR often misses these). */
function reloadOnContentChange() {
  return {
    name: "reload-on-content-change",
    configureServer(server) {
      const watchDirs = ["src/config", "src/data"];
      for (const dir of watchDirs) {
        server.watcher.add(dir);
      }
      const reload = (file) => {
        if (watchDirs.some((dir) => file.includes(dir))) {
          server.ws.send({ type: "full-reload" });
        }
      };
      server.watcher.on("change", reload);
      server.watcher.on("add", reload);
      server.watcher.on("unlink", reload);
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://mariusbuilds.com",
  server: {
    port: 4321,
    strictPort: true,
  },
  adapter: netlify({
    imageCDN: false,
  }),
  redirects: {
    "/admin": "/keystatic",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      // Shiki Themes: https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "dracula",
      wrap: true,
    },
  },
  integrations: [
    // example auto import component into mdx files
    AutoImport({
      imports: [
        // https://github.com/delucis/astro-auto-import
        "@components/Admonition/Admonition.astro",
      ],
    }),
    mdx(),
    react(),
    icon(),
    keystatic(),
    sitemap(),
    compress({
      HTML: true,
      JavaScript: true,
      CSS: false, // enabling this can cause issues
      Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
      SVG: false, // astro-icon handles this
    }),
  ],

  vite: {
    plugins: [tailwindcss(), reloadOnContentChange()],
    // stop inlining short scripts to fix issues with ClientRouter
    build: {
      assetsInlineLimit: 0,
    },
  },
});
