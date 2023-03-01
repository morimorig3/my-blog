import React from 'react';

import { Link } from 'gatsby';

import { Layout } from '../components/Layout';

const Post = () => {
  return (
    <Layout>
      <main>
        <Link to="/">Home</Link>
        <h1>about page</h1>
      </main>
    </Layout>
  );
};

export default Post;
