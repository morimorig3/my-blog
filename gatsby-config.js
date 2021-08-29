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
    `gatsby-plugin-postcss`,
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-component`,
            options: {
              components: ['article-image'],
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                'heading[depth=1]':
                  'font-bold text-2xl border-b border-gray-400 pb-2 mb-4 mt-10',
                'heading[depth=2]':
                  'font-bold text-xl border-b border-gray-400 pb-2 mb-4 mt-8',
                'heading[depth=3]': 'font-bold text-lg mb-2 mt-8',
                paragraph: 'mb-4',
                link: 'underline',
                'list[ordered=false]': 'list-disc pl-5 mb-4',
                'list[ordered=true]': 'list-decimal pl-5 mb-4',
                strong: 'font-bold',
              },
            },
          },
        ],
      },
    },
  ],
};
