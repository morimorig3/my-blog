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
        <h1 className={styles.header__title}>
          <Link to="/">morimorig3.com</Link>
        </h1>
      </header>
      {children}
      <footer
        className={styles.footer}
      >{`Copyright © 2022 - ${new Date().getFullYear()} morimorig3`}</footer>
    </Fragment>
  );
};
