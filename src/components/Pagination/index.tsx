import React from 'react';

import { Link } from 'gatsby';

interface Props {
  numPages: number;
}

export const Pagination = ({ numPages }: Props) => {
  return (
    <ul>
      {Array.from({ length: numPages }).map((_, index) => (
        <Link to={index === 0 ? `/` : `/page/${index + 1}`} key={index}>
          <li>{index + 1}</li>
        </Link>
      ))}
    </ul>
  );
};
