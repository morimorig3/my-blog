import { graphql, useStaticQuery } from 'gatsby';

import type { DeepNonNullable } from '../types/utils';

/**
 * メタデータを返すカスタムフック
 */
export const useSiteMetadata = () => {
  const data = useStaticQuery<
    DeepNonNullable<Queries.SiteMetaDataQuery>
  >(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          image
          description
          siteUrl
          twitterUsername
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
