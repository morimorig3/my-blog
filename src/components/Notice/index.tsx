import React from 'react';

import {
  AiOutlineAlert,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
} from 'react-icons/ai';

import * as styles from './Notice.module.scss';

const TYPE_MAP = {
  alert: {
    icon: AiOutlineAlert,
    style: styles.notice__alert,
  },
  info: {
    icon: AiOutlineInfoCircle,
    style: styles.notice__info,
  },
  check: {
    icon: AiOutlineCheckCircle,
    style: styles.notice__check,
  },
} as const;

// FIXME: 要リファクタリング（型付け）
export const Notice = (props: any): JSX.Element => {
  const type = TYPE_MAP[props.type as 'alert' | 'info' | 'check'];

  return (
    <div className={`${styles.notice} ${type.style}`}>
      <type.icon size="24px" />
      <div>{props.children}</div>
    </div>
  );
};
