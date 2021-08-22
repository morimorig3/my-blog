import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../component/layout';

const IndexPage = ({ data }) => {
  const articles = data.allContentfulBlogPost.edges;
  return (
    <Layout>
      {articles.map(({ node }) => (
        <article key={node.id} className="mb-6 last:m-0 rounded-lg bg-gray-100">
          <Link to={node.slug} className="block p-4">
            <p className="text-gray-500 text-sm">{node.publishDate}</p>
            <h2 className="text-xl font-bold">{node.title}</h2>
          </Link>
        </article>
      ))}
    </Layout>
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
        }
      }
    }
  }
`;
