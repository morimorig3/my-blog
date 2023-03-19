import React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

interface Props {
  className?: string;
}

export const DefaultKeyVisual = ({ className }: Props) => (
  <StaticImage
    src="../../../static/ogp.png"
    alt="キービジュアル"
    as="figure"
    className={className}
  />
);
