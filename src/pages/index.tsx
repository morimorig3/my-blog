import React from 'react';

import { graphql } from 'gatsby';

import { Layout } from '../components/Layout';

import type { PageProps } from 'gatsby';
import { ArticleCard } from '../components/ArticleCard';

const HomePage = ({ data }: PageProps<Queries.HomePageQuery>) => {
  return (
    <Layout>
      <main>
        <ul>
          {data.allMarkdownRemark.nodes.map((node) => {
            return <ArticleCard node={node} />;
          })}
        </ul>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query HomePage {
    allMarkdownRemark(sort: { frontmatter: { updatedAt: DESC } }) {
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

export default HomePage;
