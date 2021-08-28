const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const response = await graphql(`
    {
      allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            id
            slug
          }
        }
      }
      allContentfulCategory {
        edges {
          node {
            categorySlug
            id
          }
        }
      }
    }
  `);
  if (response.errors) {
    reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`);
    return;
  }

  const articles = response.data.allContentfulBlogPost.edges;
  const categories = response.data.allContentfulCategory.edges;

  articles.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}/`,
      component: path.resolve(`./src/templates/blogpost-template.js`),
      context: {
        id: node.id,
      },
    });
  });
  categories.forEach(({ node }) => {
    createPage({
      path: `/category/${node.categorySlug}/`,
      component: path.resolve(`./src/templates/category-template.js`),
      context: {
        id: node.id,
      },
    });
  });
};

exports.onCreateNode = async ({
  actions,
  node,
  createNodeId,
  cache,
  store,
  getNodesByType,
}) => {
  const { createNode } = actions;

  if (node.internal.type !== `MarkdownRemark`) return;

  const regex =
    /^<article-image.+(imageurl|title)="(.[^"]+)"><\/article-image>$/gm;
  const tags = getNodesByType('MarkdownRemark')
    .map((e) => e.rawMarkdownBody.match(regex))
    .filter((e) => !!e)
    .flat();

  if (!tags) return;

  const images = tags.map((e) => e.match(/imageurl="([^"]*)"/)[1]);
  if (!images) return;

  await Promise.all(
    images.map(async (url) => {
      const fileNode = await createRemoteFileNode({
        url: url,
        cache,
        store,
        createNode,
        createNodeId,
        name: 'articleImage',
      });
      fileNode.internal.content = url;

      if (fileNode) {
        node.localFile___NODE = fileNode.id;
      }

      return fileNode;
    })
  );
};
