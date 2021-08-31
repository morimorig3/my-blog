import React from 'react';
import { RiFolderLine } from 'react-icons/ri';
import { Link } from 'gatsby';

const ArticleItem = ({
  id,
  publishDate,
  slug,
  title,
  categorySlug,
  category,
}) => (
  <article key={id} className="mb-6 last:m-0 rounded-lg bg-gray-100 p-4">
    <p className="text-gray-500 text-sm">{publishDate}</p>
    <Link to={`/post/${slug}/`} className="block">
      <h2 className="text-xl font-bold">{title}</h2>
    </Link>
    <Link
      to={`/category/${categorySlug}/`}
      className="text-gray-500 flex items-center"
    >
      <RiFolderLine className="mr-1" />
      {category}
    </Link>
  </article>
);
export default ArticleItem;
