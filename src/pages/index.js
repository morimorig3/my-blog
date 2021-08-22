import React from 'react';
import Layout from '../component/layout';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = () => (
  <Layout>
    <h1 className="font-bold text-xl">Hello World</h1>
    <p>landscape</p>
    <StaticImage alt="somealt" src="../images/profile.jpg" />
  </Layout>
);

export default IndexPage;
