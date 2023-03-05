import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

interface Props {
  node: Queries.HomePageQuery['allMarkdownRemark']['nodes'][number];
}

export const ArticleCard = ({ node }: Props) => {
  if (
    !node.frontmatter?.slug ||
    !node.frontmatter?.title ||
    !node.frontmatter?.keyVisual?.childImageSharp ||
    !node.frontmatter?.createdAt ||
    !node.frontmatter?.category
  ) {
    throw new Error('props value is invalid.');
  }
  return (
    <li>
      <Link to={`posts/${node.frontmatter.slug}`} target="_blank">
        <GatsbyImage
          image={node.frontmatter.keyVisual.childImageSharp.gatsbyImageData} // TODO: アサーション
          alt="keyVisual"
          as="figure"
        />
        <p>{node.frontmatter.title}</p>
        <p>{`createdAt: ${node.frontmatter.createdAt}`}</p>
        {node.frontmatter.category.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </Link>
    </li>
  );
};
