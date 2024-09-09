require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "The Heritage Practice",
    description: "The Heritage Practice Ltd. is here to help.",
    siteUrl: "https://theheritagepractice.co.nz",
    siteShortUrl: "theheritagepractice.co.nz",
    imagePath: "/images/default_meta_image.png"
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
        enableTags: true
      },
    },
    "gatsby-plugin-remove-serviceworker",
    "gatsby-plugin-remove-fingerprints"
  ],
};
