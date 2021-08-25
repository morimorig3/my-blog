import React from 'react';
import { graphql, Link } from 'gatsby';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../component/layout';
import SEO from '../component/seo';
import { RiFolderLine } from 'react-icons/ri';

const BlogPost = ({ data }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-6">{children}</p>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          className="underline"
          href={node.data.uri}
          target={
            node.data.uri.startsWith('https://blog.morimorig3.com/')
              ? '_self'
              : '_blank'
          }
          rel={
            node.data.uri.startsWith('https://blog.morimorig3.com/')
              ? ''
              : 'noopener noreferrer'
          }
        >
          {children}
        </a>
      ),
    },
  };
  const article = data.contentfulBlogPost;
  return (
    <>
      <SEO title={article.title} />
      <Layout>
        <article
          key={article.id}
          className="mb-6 last:m-0 rounded-lg bg-gray-100 p-4"
        >
          <header className="pb-2 mb-2 border-gray-400 border-b-2 border-dashed">
            <p className="text-gray-500 text-sm">{article.publishDate}</p>
            <h2 className="text-xl font-bold">{article.title}</h2>
            <Link
              to={`/category/${article.category.categorySlug}/`}
              className="text-gray-500 flex items-center"
            >
              <RiFolderLine className="mr-1" />
              {article.category.category}
            </Link>
          </header>
          <div className="leading-loose">
            {renderRichText(article.body, options)}
          </div>
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
      body {
        raw
      }
    }
  }
`;
