import type { ReactNode } from 'react';
import React from 'react';

import { Link } from 'gatsby';

import { Footer } from '../Footer';

import * as styles from './Layout.module.scss';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>
          <Link to="/">morimorig3.com</Link>
        </h1>
      </header>
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};
