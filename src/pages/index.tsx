import * as React from "react";
import { graphql, PageProps } from "gatsby";

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  return (
    <main>
      <article
        dangerouslySetInnerHTML={{
          __html: data.allMarkdownRemark.edges[0].node.html || "",
        }}
      ></article>
    </main>
  );
};

export const query = graphql`
  query IndexPage {
    allMarkdownRemark {
      edges {
        node {
          html
          tableOfContents
        }
      }
    }
  }
`;

export default IndexPage;
