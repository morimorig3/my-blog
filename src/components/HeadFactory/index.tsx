import React, { Fragment } from 'react';

import { useSiteMetadata } from '../../hooks/useSiteMetadata';

interface Props {
  title?: string;
  description?: string;
  siteUrl?: string;
  image?: string;
  type?: 'blog' | 'article';
}

/**
 * Head生成
 * Gatsby Head API
 * @link - https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 * @param title - titleに使用する
 * @param description - descriptionに使用する
 * @param siteUrl - url系のプロパティに使用する
 * @param image - OGP画像に使用する（ルートパス）
 * @param type - 記事ページかブログページか
 */
export const HeadFactory = ({
  title,
  description,
  siteUrl,
  image,
  type = 'blog',
}: Props) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl: defaultSiteUrl,
    image: defaultImage,
    twitterUsername,
  } = useSiteMetadata();

  const head = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    siteUrl: siteUrl || defaultSiteUrl,
    image: image || defaultImage,
  };

  return (
    <Fragment>
      <meta name="format-detection" content="address=no, email=no" />
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      <meta property="og:title" content={head.title} />
      <meta property="og:description" content={head.description} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:url" content={head.siteUrl} />
      <meta property="og:image" content={`${defaultSiteUrl}${head.image}`} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={head.title} />
      <meta name="twitter:description" content={head.description} />
      <meta name="twitter:url" content={head.siteUrl} />
      <meta name="twitter:image" content={`${defaultSiteUrl}${head.image}`} />
      <meta name="twitter:creator" content={twitterUsername} />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        sizes="180x180"
      />
    </Fragment>
  );
};
