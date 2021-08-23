import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import { HiHome } from 'react-icons/hi';

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
      <header className="h-20 flex justify-between items-center">
        <Link
          to="/"
          className="font-righteous block text-center text-xl leading-none font-bold text-gray-100"
        >
          {data.site.siteMetadata.title}
        </Link>
        <a href="https://www.morimorig3.com/" className="text-gray-100">
          <HiHome size="1.5em" />
        </a>
      </header>
      <main className="pb-32">{children}</main>
    </div>
  );
};

export default Layout;
