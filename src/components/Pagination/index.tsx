import React from 'react';

import { Link } from 'gatsby';

import * as styles from './Pagination.module.scss';
interface Props {
  numPages: number;
  currentPage: number;
}

export const Pagination = ({ numPages, currentPage }: Props) => {
  return (
    <nav>
      <ol className={styles.pagination__list}>
        {Array.from({ length: numPages }).map((_, index) => {
          const isCurrent = currentPage === index + 1;
          return (
            <Link
              className={`${styles.pagination__item} ${
                isCurrent && `${styles.pagination__item__bold}`
              }`}
              to={index === 0 ? `/` : `/page/${index + 1}`}
              key={index}
            >
              <li>{index + 1}</li>
            </Link>
          );
        })}
      </ol>
    </nav>
  );
};
