import React from 'react';

import { graphql, Link } from 'gatsby';

import { ArticleCard } from '../components/ArticleCard';
import { Layout } from '../components/Layout';

import type { PageProps } from 'gatsby';

export type PostListPage = PageProps<
  Queries.PostListQuery,
  Queries.PostListQueryVariables & {
    numPages: number;
    currentPage: number;
  }
>;

const PostList = ({ data, pageContext }: PostListPage) => {
  if (!data) throw new Error('データの取得に失敗しました');

  console.log(pageContext);

  return (
    <Layout>
      <main>
        <ul>
          {data.allMarkdownRemark.nodes.map((node) => {
            return <ArticleCard node={node} />;
          })}
        </ul>
        <ul>
          {new Array(pageContext.numPages).fill(0).map((_, index) => {
            return (
              <Link to={`/page/${index + 1}`} key={index}>
                <li>{index + 1}</li>
              </Link>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
};

export default PostList;

export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { createdAt: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        frontmatter {
          title
          category
          createdAt(formatString: "YYYY年MM月DD日")
          slug
          keyVisual {
            childImageSharp {
              gatsbyImageData(width: 250)
            }
          }
        }
      }
    }
  }
`;
