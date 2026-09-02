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
      description: "A Package Manager and Registry for ABAP"
    }
  },

  head: [
    ["meta", { name: "keywords", content: "apm, ABAP, package manager, registry, SAP, verioning, dependencies" }],
    ["meta", { name: "author", content: "apm" }],
    ["meta", { name: "robots", content: "index, follow" }]
  ],

  bundler: viteBundler(),

  theme,

  clientConfigFile: path.resolve(__dirname, "./client.ts")
});
