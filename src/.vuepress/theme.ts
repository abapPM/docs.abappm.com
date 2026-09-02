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
  logo: "/apm_logo.svg",
  logoDark: "/apm_logo.svg",
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
    seo: {
      fallbackImage: "/apm_social_preview.png",
      autoDescription: true,
      canonical: "https://docs.abappm.com",
      ogp: (ogp, page) => {
        const hostname = "https://docs.abappm.com";
        const customImage = page.frontmatter.image as string | undefined;
        const imagePath = customImage || "/apm_social_preview.png";
        const imageUrl = imagePath.startsWith("http")
          ? imagePath
          : `${hostname}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;

        return {
          ...ogp,
          "og:image": imageUrl,
          "twitter:card": "summary_large_image",
          "twitter:image:alt": String(page.title || "apm Docs")
        };
      }
    },

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
