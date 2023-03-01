import path from "path";

import type { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async function ({
  actions,
  graphql,
}) {
  const { data } = await graphql<Queries.pagesQuery>(`
    query pages {
      allMarkdownRemark(sort: { frontmatter: { updatedAt: DESC } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  if (!data) throw new Error("データの取得に失敗しました");
  data.allMarkdownRemark.nodes.forEach((node) => {
    if (!node.frontmatter?.slug) throw new Error("slugが存在しません");
    const slug = node.frontmatter.slug;

    actions.createPage({
      path: `/posts/${slug}`,
      component: path.resolve(`./src/templates/post.tsx`),
      context: { slug: slug },
    });
  });
};
