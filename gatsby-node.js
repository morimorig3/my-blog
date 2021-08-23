const path = require('path');

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
