import React from 'react';

import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './ArticleCard.module.scss';

import type { DeepNonNullable } from '../../types/utils';

type Props = DeepNonNullable<
  Queries.PostListQuery['allMarkdownRemark']['nodes'][number]['frontmatter']
>;

export const ArticleCard = ({ title, slug, keyVisual, createdAt }: Props) => {
  const dateTime = createdAt.replace(/-/gi, ' ');
  return (
    <article>
      <Link className={styles.article} to={`/${slug}`} target="_blank">
        <div className={styles.article__imageWrapper}>
          <GatsbyImage
            className={styles.article__image}
            image={keyVisual.childImageSharp.gatsbyImageData} // TODO: アサーション
            alt="keyVisual"
            as="figure"
          />
        </div>
        <div className={styles.article__body}>
          <time className={styles.article__time} dateTime={createdAt}>
            {dateTime}
          </time>
          <h2
            className={styles.article__title}
            dangerouslySetInnerHTML={{
              // FIXME: parser.translateHTMLString(title)WebComponentを使用する
              __html: `<budoux-ja>${title}</budoux-ja>`,
            }}
          ></h2>
        </div>
      </Link>
    </article>
  );
};
