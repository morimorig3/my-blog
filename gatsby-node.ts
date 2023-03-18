import path from 'path';

import type { GatsbyNode } from 'gatsby';

export interface PostPageContext {
  id: string;
  next: Queries.postsQuery['allMarkdownRemark']['edges'][number]['next'];
  previous: Queries.postsQuery['allMarkdownRemark']['edges'][number]['previous'];
}

export const createPages: GatsbyNode['createPages'] = async function ({
  actions,
  graphql,
  reporter,
}) {
  const { createPage } = actions;
  // ポストページ作成
  const { data: postData } = await graphql<Queries.postsQuery>(`
    query posts {
      allMarkdownRemark(sort: { frontmatter: { updatedAt: DESC } }) {
        edges {
          previous {
            id
            frontmatter {
              slug
              title
            }
          }
          node {
            id
            frontmatter {
              slug
              title
            }
          }
          next {
            id
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `);
  if (!postData) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  postData.allMarkdownRemark.edges.forEach(({ previous, node, next }) => {
    if (!node.frontmatter?.slug) throw new Error('slugが存在しません');
    const slug = node.frontmatter.slug;
    const id = node.id;
    const context: PostPageContext = {
      id,
      previous,
      next,
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
  const postsPerPage = 4;
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
