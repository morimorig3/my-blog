import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';

const ArticleImage = ({ title, imageurl, href }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { name: { eq: "articleImage" } }) {
        edges {
          node {
            internal {
              content
            }
            childImageSharp {
              gatsbyImageData(
                backgroundColor: "transparent"
                placeholder: BLURRED
                quality: 70
                layout: FULL_WIDTH
                aspectRatio: 1.777
                transformOptions: { fit: CONTAIN }
              )
            }
          }
        }
      }
    }
  `);

  const gatsbyImageData = data.allFile.edges.find(
    ({ node }) => node.internal.content === imageurl
  ).node;
  const image = getImage(gatsbyImageData);
  const imageSrc = getSrc(gatsbyImageData);

  return (
    <>
      {href ? (
        <a
          className="block px-6"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GatsbyImage className="block" as="span" image={image} alt={title} />
        </a>
      ) : (
        <a className="block px-6" href={imageSrc}>
          <GatsbyImage className="block" as="span" image={image} alt={title} />
        </a>
      )}
    </>
  );
};
export default ArticleImage;
