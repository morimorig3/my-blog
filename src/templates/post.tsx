import React from 'react';

import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';

import { DefaultKeyVisual } from '../components/DefaultKeyVisual';
import { HeadFactory } from '../components/HeadFactory';
import { Layout } from '../components/Layout';

import * as styles from './post.module.scss';

import type { PostPageContext } from '../../gatsby-node';
import type { DeepNonNullable } from '../types/utils';
import type { PageProps, HeadProps } from 'gatsby';

export type PostPageProps = PageProps<
  DeepNonNullable<Queries.PostPageQuery>,
  DeepNonNullable<Queries.PostPageQueryVariables & PostPageContext>
>;

export type PostHeadProps = HeadProps<DeepNonNullable<Queries.PostPageQuery>>;

const Post = ({ data, pageContext }: PostPageProps) => {
  const { title, keyVisual, createdAt } = data.markdownRemark.frontmatter;
  const dateTime = createdAt.replace(/-/gi, ' ');
  const image = getImage(keyVisual);
  const { next, previous } = pageContext;
  const hasNext = !!next;
  const hasPrevious = !!previous;
  return (
    <Layout>
      <article className={styles.post}>
        <header className={styles.post__header}>
          <time className={styles.post__time} dateTime={dateTime}>
            {dateTime}
          </time>
          <h1
            className={styles.post__title}
            dangerouslySetInnerHTML={{
              // FIXME: parser.translateHTMLString(title)WebComponentを使用する
              __html: `<budoux-ja>${title}</budoux-ja>`,
            }}
          />
        </header>
        <figure className={styles.post__keyVisual}>
          {image ? (
            <GatsbyImage
              className={styles.post__image}
              image={image}
              alt="keyVisual"
            />
          ) : (
            <DefaultKeyVisual className={styles.post__image} />
          )}
        </figure>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark?.html ?? '',
          }}
        />
        <footer className={styles.post__footer}>
          {hasPrevious && (
            <div className={styles.post__previous}>
              <p>PREV</p>
              <Link to={`/${previous.frontmatter.slug}`}>
                {previous.frontmatter.title}
              </Link>
            </div>
          )}
          {hasNext && (
            <div className={styles.post__previous}>
              <p>NEXT</p>
              <Link to={`/${next.frontmatter.slug}`}>
                {next.frontmatter.title}
              </Link>
            </div>
          )}
        </footer>
      </article>
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
        createdAt(formatString: "YYYY-MM-DD")
        title
        slug
        keyVisual {
          childImageSharp {
            gatsbyImageData(width: 1280, height: 600, formats: PNG)
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: PostHeadProps) => {
  const { siteUrl } = data.site.siteMetadata;
  const { excerpt, frontmatter } = data.markdownRemark;
  const { title, slug, keyVisual } = frontmatter;
  const imageSrc = getSrc(keyVisual) || '';
  return (
    <HeadFactory
      title={title}
      description={excerpt}
      siteUrl={`${siteUrl}/${slug}`}
      image={imageSrc}
      type="article"
    />
  );
};
