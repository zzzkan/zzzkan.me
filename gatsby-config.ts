import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "blog.zzzkan.me",
    siteUrl: "https://blog.zzzkan.me/",
    description:
      "zzzkanのブログです。ソフトウェア関連の話題が多いと思いますが気が向いたことなら何でも書くところ。",
    author: "zzzkan",
    authorUrl: "https://zzzkan.me/",
    publicationYear: 2023,
    imageUrl: "https://blog.zzzkan.me/banner.png",
  },
  graphqlTypegen: true,
  trailingSlash: "always",
  plugins: [
    {
      resolve: "@zzzkan/gatsby-theme-blog",
      options: {
        lang: "ja",
        basePath: "/",
        contentPath: "contents/posts",
        dateFormatString: "YYYY/MM/DD",
        shikiTheme: "dracula",
        links: [
          {
            name: "Profile",
            url: "https://zzzkan.me/",
          },
          {
            name: "RSS",
            url: "/rss.xml",
          },
          {
            name: "GitHub",
            url: "https://github.com/zzzkan",
          },
          {
            name: "Twitter",
            url: "https://twitter.com/_zzzkan",
          },
        ],
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "blog.zzzkan.me",
        short_name: "blog.zzzkan.me",
        start_url: "/",
        background_color: "#fff",
        display: "minimal-ui",
        icon: "contents/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allPost },
            }: {
              query: { site: Queries.Site; allPost: Queries.PostConnection };
            }) =>
              allPost.nodes.map((post) => {
                const url = new URL(
                  (post.slug + "/").replace(/\/\/+/g, "/"),
                  site?.siteMetadata?.siteUrl ?? ""
                ).href;
                const date = new Date(
                  `${post.updatedDate ?? post.publishedDate} GMT+0900`
                ).toUTCString();
                return {
                  title: `${post.title} - ${site?.siteMetadata?.title}`,
                  date,
                  description: post.excerpt,
                  url,
                  guid: url,
                };
              }),
            query: `
              {
                allPost(sort: {publishedDate: DESC}) {
                  nodes {
                    slug
                    title
                    publishedDate(formatString: "YYYY-MM-DD")
                    updatedDate(formatString: "YYYY-MM-DD")
                    excerpt
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed - blog.zzzkan.me",
            feed_url: "https://blog.zzzkan.me/rss.xml",
            site_url: "https://blog.zzzkan.me/",
          },
        ],
      },
    },
    "gatsby-plugin-twitter",
  ],
};

export default config;
