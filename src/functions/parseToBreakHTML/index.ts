import { loadDefaultJapaneseParser } from 'budoux';

export const parseToBreakHTML = (target: string) => {
  const parser = loadDefaultJapaneseParser();
  return parser.translateHTMLString(target);
};
