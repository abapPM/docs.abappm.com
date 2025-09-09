import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

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

  theme,

  clientConfigFile: path.resolve(__dirname, "./client.ts")
});
