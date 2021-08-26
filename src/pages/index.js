import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../component/layout';
import Seo from '../component/seo';
import ArticleItem from '../component/articleItem';

const IndexPage = ({ data }) => {
  const articles = data.allContentfulBlogPost.edges;
  return (
    <>
      <Seo title="TOP" />
      <Layout>
        {articles.map(({ node }) => {
          const { id, publishDate, slug, title } = node;
          const { category, categorySlug } = node.category;
          return (
            <ArticleItem
              id={id}
              publishDate={publishDate}
              slug={slug}
              title={title}
              category={category}
              categorySlug={categorySlug}
            />
          );
        })}
      </Layout>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allContentfulBlogPost {
      edges {
        node {
          id
          slug
          publishDate(formatString: "YYYY-MM-DD")
          title
          category {
            category
            categorySlug
          }
        }
      }
    }
  }
`;
