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
      text: "Get Started",
      icon: "rocket",
      link: "/get-started/"
    },
    {
      text: "Packages and Modules",
      icon: "box-open",
      link: "/packages-and-modules/"
    },
    {
      text: "apm Client",
      icon: "terminal",
      link: "/apm-client/"
    },
    {
      text: "Policies",
      icon: "scale-balanced",
      link: "/policies/"
    },
    {
      text: "Development Guide",
      icon: "code",
      link: "/development-guide/"
    }
  ],

  // sidebar
  sidebar: "structure",
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
        "/old.html": "/new.html",
        "/user-guide/": "/get-started/",
        "/user-guide/getting-started/": "/apm-client/installation.html",
        "/user-guide/getting-started/install.html": "/apm-client/installation.html"
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
