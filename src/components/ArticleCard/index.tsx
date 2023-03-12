import React from 'react';

import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './ArticleCard.module.scss';

import type { DeepNonNullable } from '../../types/utils';

type Props = DeepNonNullable<
  Queries.PostListQuery['allMarkdownRemark']['nodes'][number]['frontmatter']
>;

export const ArticleCard = ({ title, slug, keyVisual, createdAt }: Props) => {
  return (
    <article className={styles.article}>
      <Link to={`/${slug}`} target="_blank">
        <div className={styles.article__imageWrapper}>
          <GatsbyImage
            image={keyVisual.childImageSharp.gatsbyImageData} // TODO: アサーション
            alt="keyVisual"
            as="figure"
          />
        </div>
        <div className={styles.article__body}>
          <p>{title}</p>
          <p>{`createdAt: ${createdAt}`}</p>
        </div>
      </Link>
    </article>
  );
};
