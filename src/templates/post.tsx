import React from 'react';

import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { HeadFactory } from '../components/HeadFactory';
import { Layout } from '../components/Layout';

import type { PostPageContext } from '../../gatsby-node';
import type { DeepNonNullable } from '../types/utils';
import type { PageProps, HeadProps } from 'gatsby';

export type PostPageProps = PageProps<
  Queries.PostPageQuery,
  Queries.PostPageQueryVariables & PostPageContext
>;

export type PostHeadProps = HeadProps<DeepNonNullable<Queries.PostPageQuery>>;

const Post = ({ data, pageContext }: PostPageProps) => {
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
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(truncate: true, pruneLength: 120, format: PLAIN)
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

export const Head = ({ data }: PostHeadProps) => {
  const { siteUrl } = data.site.siteMetadata;
  const { excerpt, frontmatter } = data.markdownRemark;
  const { title, slug } = frontmatter;
  return (
    <HeadFactory
      title={title}
      description={excerpt}
      siteUrl={`${siteUrl}/${slug}`}
      type="article"
    />
  );
};
