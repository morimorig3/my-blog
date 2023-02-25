import { Link } from "gatsby";
import React from "react";
import { Layout } from "../components/Layout";

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
