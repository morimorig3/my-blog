import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../component/layout';
import SEO from '../component/seo';
import { RiFolderLine } from 'react-icons/ri';

const CategoryPage = ({ data }) => {
  const articles = data.allContentfulBlogPost.edges;
  const { category } = data.contentfulCategory;
  return (
    <>
      <SEO title={`${category}の記事一覧`} />
      <Layout>
        {articles.map(({ node }) => (
          <article
            key={node.id}
            className="mb-6 last:m-0 rounded-lg bg-gray-100 p-4"
          >
            <p className="text-gray-500 text-sm">{node.publishDate}</p>
            <Link to={`/${node.slug}/`} className="block">
              <h2 className="text-xl font-bold">{node.title}</h2>
            </Link>
            <Link
              to={`/category/${node.category.categorySlug}/`}
              className="text-gray-500 flex items-center"
            >
              <RiFolderLine className="mr-1" />
              {node.category.category}
            </Link>
          </article>
        ))}
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
