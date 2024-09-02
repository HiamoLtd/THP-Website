require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Wellington Heritage Festival",
    description: "Experience Wellington's people, places & stories during Wellington Heritage Festival.",
    siteUrl: "https://wellingtonheritagefestival.co.nz",
    siteShortUrl: "wellingtonheritagefestival.co.nz",
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
