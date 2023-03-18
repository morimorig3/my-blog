import React from 'react';

import { FaTwitter, FaGithub } from 'react-icons/fa';

import * as styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <section className={styles.footer__social}>
          <ul className={styles.footer__others}>
            <li>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.morimorig3.com/"
              >
                WEBSITE
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://qiita.com/morimorig3"
              >
                QIITA
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.wantedly.com/id/morishita_naoto"
              >
                WANTEDLY
              </a>
            </li>
          </ul>
          <ul className={styles.footer__sns}>
            <li>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/morimorig3"
              >
                <FaGithub className={styles.icon} />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://twitter.com/morimorig3"
              >
                <FaTwitter className={styles.icon} />
              </a>
            </li>
          </ul>
        </section>
      </div>
      <small className={styles.footer__copyright}>
        {`Copyright © 2022 - ${new Date().getFullYear()} morimorig3`}
      </small>
    </footer>
  );
};
