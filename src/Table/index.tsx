import React from 'react';

import * as styles from './Table.module.scss';

export const Table = (props: any): JSX.Element => {
  return (
    <div className={styles.tableWrapper}>
      <table>{props.children}</table>
    </div>
  );
};
