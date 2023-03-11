import type { ReactNode } from 'react';
import React from 'react';

import * as styles from './Layout.module.scss';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h1>morimorig3.com</h1>
      {children}
    </div>
  );
};
