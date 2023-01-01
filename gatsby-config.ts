import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "blog.zzzkan.me",
    siteUrl: "https://blog.zzzkan.me/",
    description: "zzzkan's blog",
    author: "zzzkan",
    publicationYear: 2023,
    imageUrl: "https://blog.zzzkan.me/banner.png",
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "@zzzkan/gatsby-theme-blog",
      options: {
        lang: "ja",
        basePath: "/",
        contentPath: "contents/posts",
        dateFormatString: "YYYY/MM/DD",
        links: [
          {
            name: "Profile",
            url: "/",
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
    "gatsby-plugin-robots-txt",
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
      resolve: `gatsby-plugin-feed`,
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
                const url = site?.siteMetadata?.siteUrl + post.slug;
                return {
                  title: post.title,
                  date: post.updatedDate,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                };
              }),
            query: `
              {
                allPost(sort: {updatedDate: DESC}) {
                  nodes {
                    slug
                    title
                    updatedDate
                    excerpt
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed",
          },
        ],
      },
    },
  ],
}

export default config
