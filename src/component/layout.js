import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';
import { HiHome } from 'react-icons/hi';
import Bio from './bio';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          defaultTitle
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
          {data.site.siteMetadata.defaultTitle}
        </Link>
        <a href="https://www.morimorig3.com/" className="text-gray-100">
          <HiHome size="1.5em" />
        </a>
      </header>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-12 gap-4">
        <main className="lg:col-start-1 lg:col-end-10">{children}</main>
        <aside className="lg:w-60 lg:col-start-10 lg:col-end-13">
          <Bio />
        </aside>
      </div>
    </div>
  );
};

export default Layout;
