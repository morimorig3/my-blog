import React from 'react';

import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Layout } from '../components/Layout';

import type { PostPageContext } from '../../gatsby-node';
import type { PageProps } from 'gatsby';

export type PostPage = PageProps<
  Queries.PostPageQuery,
  Queries.PostPageQueryVariables & PostPageContext
>;

const Post = ({ data, pageContext }: PostPage) => {
  return (
    <Layout>
      <div>
        <h1>{data.markdownRemark?.frontmatter?.title}</h1>
        <GatsbyImage
          image={
            data.markdownRemark!.frontmatter!.keyVisual!.childImageSharp!
              .gatsbyImageData
          } // TODO: アサーション
          alt="keyVisual"
          as="figure"
        />
        <div>
          <p>{data.markdownRemark?.frontmatter?.author}</p>
          <p>{data.markdownRemark?.frontmatter?.createdAt}</p>
          <p>{data.markdownRemark?.frontmatter?.updatedAt}</p>
        </div>
        <article
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark?.html ?? '',
          }}
        ></article>
      </div>
      <div>
        {pageContext.next?.frontmatter?.slug && (
          <Link to={`/${pageContext.next.frontmatter?.slug}`}>前の記事</Link>
        )}
        {pageContext.previous?.frontmatter?.slug && (
          <Link to={`/${pageContext.previous.frontmatter?.slug}`}>
            次の記事
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default Post;

export const postPage = graphql`
  query PostPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        updatedAt
        slug
        author
        category
        createdAt
        keyVisual {
          childImageSharp {
            gatsbyImageData(width: 250)
          }
        }
      }
    }
  }
`;
