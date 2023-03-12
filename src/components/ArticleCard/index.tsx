import React from 'react';

import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import type { DeepNonNullable } from '../../types/utils';

type Props = DeepNonNullable<
  Queries.PostListQuery['allMarkdownRemark']['nodes'][number]['frontmatter']
>;

export const ArticleCard = ({ title, slug, keyVisual, createdAt }: Props) => {
  return (
    <article>
      <Link to={`/${slug}`} target="_blank">
        <GatsbyImage
          image={keyVisual.childImageSharp.gatsbyImageData} // TODO: アサーション
          alt="keyVisual"
          as="figure"
        />
        <p>{title}</p>
        <p>{`createdAt: ${createdAt}`}</p>
      </Link>
    </article>
  );
};
