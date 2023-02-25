import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { getImage, GatsbyImage, getSrc } from "gatsby-plugin-image";
import { Layout } from "../components/Layout";

const HomePage = ({ data }: PageProps<Queries.HomePageQuery>) => {
  return (
    <Layout>
      <main>
        <ul>
          {data.allMarkdownRemark.nodes.map((node) => {
            if (
              !node.frontmatter?.slug ||
              !node.frontmatter?.title ||
              !node.frontmatter?.keyVisual ||
              !node.frontmatter?.createdAt ||
              !node.frontmatter?.updatedAt ||
              !node.frontmatter?.category
            ) {
              throw new Error("props value is invalid.");
            }
            const { title, keyVisual, createdAt, updatedAt, category, slug } =
              node.frontmatter;

            return (
              <li key={slug}>
                <Link to={`posts/${slug}`} target="_blank">
                  <GatsbyImage
                    image={keyVisual.childImageSharp!.gatsbyImageData} // TODO: アサーション
                    alt="keyVisual"
                  />
                  <p>{title}</p>
                  <p>createdAt: {createdAt}</p>
                  <p>updatedAt: {updatedAt}</p>
                  {category.map((name) => (
                    <p key={name}>{name}</p>
                  ))}
                  <article
                    dangerouslySetInnerHTML={{
                      __html: node.html!, // TODO: アサーション
                    }}
                  ></article>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query HomePage {
    allMarkdownRemark(sort: { frontmatter: { updatedAt: DESC } }) {
      nodes {
        frontmatter {
          title
          author
          category
          createdAt(formatString: "YYYY年MM月DD日")
          updatedAt(formatString: "YYYY年MM月DD日")
          slug
          keyVisual {
            childImageSharp {
              gatsbyImageData(width: 250)
            }
          }
        }
        html
      }
    }
  }
`;

export default HomePage;
