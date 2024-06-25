import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { redirectPlugin } from "@vuepress/plugin-redirect";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "en-US",
      title: "apm Docs",
      description: "apm is a Package Manager 📦, a Website 🌐, and a Registry 📑 for ABAP"
    }
    // "/de/": {
    //   lang: "de-DE",
    //   title: "apm Doku",
    //   description: "apm ist ein Packetmanager 📦, eine Website 🌐, und eine Registry 📑 für ABAP",
    // },
  },
  theme,
  plugins: [
    searchProPlugin({
      indexContent: true,
      // add supports for category and tags
      customFields: [
        {
          getter: page => (page.frontmatter as any).category,
          formatter: "Category: $content"
        },
        {
          getter: page => page.frontmatter.tag,
          formatter: "Tag: $content"
        }
      ]
    }),
    redirectPlugin({
      // For future use, if required
      // Redirect old pages to new site
      config: {
        "/old": "/new.html"
      }
    })    
  ]
});
