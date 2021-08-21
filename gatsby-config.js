require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteUrl: 'https://blog.morimorig3.com/',
    title: 'my-blog',
  },
  plugins: [
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
