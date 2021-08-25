require('dotenv').config();

module.exports = {
  siteMetadata: {
    defaultTitle: 'morimorig3.Blog',
    titleTemplate: '%s | morimorig3.Blog',
    defaultDescription:
      'JavaScriptを勉強した時の覚書や便利なスニペットなどを紹介するブログです',
    siteUrl: 'https://blog.morimorig3.com/',
    twitterUsername: '@morimorig3',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: './src/images/favicon.png',
      },
    },
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
