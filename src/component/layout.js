import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="container mx-auto px-4">
      <Link
        to="/"
        className="font-righteous block text-center text-xl leading-none font-bold py-8 text-gray-100"
      >
        {data.site.siteMetadata.title}
      </Link>
      <main className="pb-32">{children}</main>
    </div>
  );
};

export default Layout;
