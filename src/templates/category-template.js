import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../component/layout';
import Seo from '../component/seo';
import ArticleItem from '../component/articleItem';
import { RiFolderFill } from 'react-icons/ri';

const CategoryPage = ({ data }) => {
  const articles = data.allContentfulBlogPost.edges;
  const categoryName = data.contentfulCategory.category;
  return (
    <>
      <Seo title={`${categoryName}の記事一覧`} />
      <Layout>
        <h1 className="flex items-center text-xl text-gray-100 font-bold mb-4">
          <RiFolderFill className="mr-1" />
          {`${categoryName}の記事一覧`}
        </h1>
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

export default CategoryPage;

export const query = graphql`
  query ($id: String!) {
    allContentfulBlogPost(
      sort: { fields: publishDate, order: DESC }
      filter: { category: { id: { eq: $id } } }
    ) {
      edges {
        node {
          id
          title
          slug
          publishDate(formatString: "YYYY-MM-DD")
          category {
            category
            categorySlug
          }
        }
      }
    }
    contentfulCategory(id: { eq: $id }) {
      category
    }
  }
`;
