import type { ReactNode } from 'react';
import { Fragment } from 'react';
import React from 'react';

import { Link } from 'gatsby';

import * as styles from './Layout.module.scss';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          <Link to="/">morimorig3.com</Link>
        </h1>
      </header>
      <div>{children}</div>
    </Fragment>
  );
};
