import React from 'react';
import { graphql } from 'gatsby';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import Layout from '../component/layout';

const BlogPost = ({ data }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-6">{children}</p>
      ),
    },
  };
  const article = data.contentfulBlogPost;
  return (
    <Layout>
      <article
        key={article.id}
        className="mb-6 last:m-0 rounded-lg bg-gray-100 p-4"
      >
        <p className="text-gray-500 text-sm">{article.publishDate}</p>
        <h2 className="text-xl font-bold pb-2 border-b-2 border-gray-400 border-dashed mb-2">
          {article.title}
        </h2>
        <div className="leading-loose">
          {renderRichText(article.body, options)}
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      publishDate(formatString: "YYYY-MM-DD")
      id
      body {
        raw
      }
    }
  }
`;
