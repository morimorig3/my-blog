import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../component/layout';
import Seo from '../component/seo';
import { RiFolderLine } from 'react-icons/ri';

const BlogPost = ({ data }) => {
  const article = data.contentfulBlogPost;
  return (
    <>
      <Seo title={article.title} />
      <Layout>
        <article
          key={article.id}
          className="mb-6 last:m-0 rounded-lg bg-gray-100 p-4"
        >
          <header className="pb-4 mb-4 border-gray-400 border-b-2 border-dashed">
            <p className="text-gray-500 text-sm mb-1">{article.publishDate}</p>
            <h2 className="text-2xl font-bold mb-1">{article.title}</h2>
            <Link
              to={`/category/${article.category.categorySlug}/`}
              className="text-gray-500 flex items-center"
            >
              <RiFolderLine className="mr-1" />
              {article.category.category}
            </Link>
          </header>
          <div
            className="py-4 leading-6"
            dangerouslySetInnerHTML={{
              __html: article.content.childMarkdownRemark.html,
            }}
          />
        </article>
      </Layout>
    </>
  );
};

export default BlogPost;

export const query = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      category {
        category
        categorySlug
      }
      title
      publishDate(formatString: "YYYY-MM-DD")
      id
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
