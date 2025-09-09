import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "apm Docs",
      description: "apm is a Package Manager 📦, a Website 🌐, and a Registry 📑 for ABAP"
    }
  },

  bundler: viteBundler(),

  theme
});
