const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  const blogPostTemplate = path.resolve(`./src/templates/blogpost-template.js`);
  const categoryPageTemplate = path.resolve(
    `./src/templates/category-template.js`
  );

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
      component: blogPostTemplate,
      context: {
        id: node.id,
      },
    });
  });
  categories.forEach(({ node }) => {
    createPage({
      path: `/category/${node.categorySlug}/`,
      component: categoryPageTemplate,
      context: {
        id: node.id,
      },
    });
  });
};

exports.onCreateNode = async ({
  actions: { createNode },
  node,
  getCache,
  createNodeId,
}) => {
  if (node.internal.type !== `MarkdownRemark`) return;
  const { id, rawMarkdownBody } = node;

  const regex =
    /^<article-image.+(imageurl|title|href)="(.[^"]+)"><\/article-image>$/gm;
  const tags = rawMarkdownBody.match(regex);

  if (!tags) return;

  const urls = tags.map((tag) => tag.match(/imageurl="([^"]*)"/)[1]);

  if (!urls) return;

  await Promise.all(
    urls.map(async (url) => {
      const fileNode = await createRemoteFileNode({
        url: url,
        getCache,
        createNode,
        createNodeId,
        parentNodeId: id,
        name: 'articleImage',
      });

      fileNode.internal.content = url;

      if (fileNode) {
        node.localFile___NODE = fileNode.id;
      }
    })
  );
};
