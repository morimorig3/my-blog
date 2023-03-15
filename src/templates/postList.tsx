import React from 'react';

import { graphql } from 'gatsby';

import { ArticleCard } from '../components/ArticleCard';
import { HeadFactory } from '../components/HeadFactory';
import { Layout } from '../components/Layout';
import { Pagination } from '../components/Pagination';

import * as styles from './postList.module.scss';

import type { DeepNonNullable } from '../types/utils';
import type { PageProps } from 'gatsby';

export type PostListPage = PageProps<
  DeepNonNullable<Queries.PostListQuery>,
  Queries.PostListQueryVariables & {
    numPages: number;
    currentPage: number;
  }
>;

const PostList = ({ data, pageContext }: PostListPage) => {
  return (
    <Layout>
      <main>
        <section className={styles.postList}>
          {data.allMarkdownRemark.nodes.map(
            ({ frontmatter: { title, slug, createdAt, keyVisual } }) => {
              return (
                <ArticleCard
                  key={title}
                  title={title}
                  slug={slug}
                  createdAt={createdAt}
                  keyVisual={keyVisual}
                />
              );
            }
          )}
        </section>
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
          createdAt(formatString: "YYYY-MM-DD")
          slug
          keyVisual {
            childImageSharp {
              gatsbyImageData(width: 550)
            }
          }
        }
      }
    }
  }
`;

export const Head = () => <HeadFactory />;
