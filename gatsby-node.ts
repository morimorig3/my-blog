import path from 'path';

import type { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async function ({
  actions,
  graphql,
  reporter,
}) {
  const { createPage } = actions;
  // ポストページ作成
  const { data: postData } = await graphql<Queries.pagesQuery>(`
    query pages {
      allMarkdownRemark(sort: { frontmatter: { updatedAt: DESC } }) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  if (!postData) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  postData.allMarkdownRemark.nodes.forEach((node) => {
    if (!node.frontmatter?.slug) throw new Error('slugが存在しません');
    const slug = node.frontmatter.slug;
    const id = node.id;
    const context = {
      id,
      slug,
    };

    createPage({
      path: `/${slug}`,
      component: path.resolve(`./src/templates/post.tsx`),
      context,
    });
  });

  // ページネーションページ作成
  const { data: paginationData } = await graphql<Queries.paginationQuery>(`
    query pagination {
      allMarkdownRemark(sort: { frontmatter: { updatedAt: DESC } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (!paginationData) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const posts = paginationData.allMarkdownRemark.nodes;
  const postsPerPage = 2;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/` : `/page/${index + 1}`,
      component: path.resolve(`./src/templates/postList.tsx`),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    });
  });
};
