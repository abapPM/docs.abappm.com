import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  hostname: "https://docs.abappm.com",
  author: {
    name: "apm",
    url: "https://abappm.com"
  },

  repo: "https://github.com/abapPM/docs.abappm.com",
  docsDir: "src",
  editLink: true,
  logo: "/logo.svg",
  logoDark: "/logo-dark.svg",
  favicon: "/favicon.svg",

  // navbar
  navbar: [
    {
      text: "Home",
      icon: "house",
      link: "/"
    },
    {
      text: "User Guide",
      icon: "circle-info",
      link: "/user-guide/"
    },
    {
      text: "Development Guide",
      icon: "code",
      link: "/development-guide/"
    }
  ],

  // sidebar
  sidebar: {
    "/user-guide": "structure",
    "/development-guide": "structure"
  },
  footer: "",
  copyright: "Copyright 2025 apm.to Inc.",
  displayFooter: true,

  markdown: {
    figure: true,
    imgLazyload: true
  },

  plugins: {
    catalog: false,
    icon: {
      assets: "fontawesome-with-brands"
    },

    redirect: {
      // redirect old pages to new site (for future use, if required)
      config: {
        "/old.html": "/new.html"
      }
    },
    slimsearch: {
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
    }
  }
});