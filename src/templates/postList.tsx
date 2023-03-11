import React from 'react';

import { graphql } from 'gatsby';

import { ArticleCard } from '../components/ArticleCard';
import { HeadFactory } from '../components/HeadFactory';
import { Layout } from '../components/Layout';
import { Pagination } from '../components/Pagination';

import type { PageProps } from 'gatsby';

export type PostListPage = PageProps<
  Queries.PostListQuery,
  Queries.PostListQueryVariables & {
    numPages: number;
    currentPage: number;
  }
>;

const PostList = ({ data, pageContext }: PostListPage) => {
  return (
    <Layout>
      <main>
        <ul>
          {data.allMarkdownRemark.nodes.map((node, index) => {
            return <ArticleCard key={index} node={node} />;
          })}
        </ul>
        <Pagination numPages={pageContext.numPages} />
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

export const Head = () => <HeadFactory />;
