import React from 'react';
import Layout from '../components/Layout';

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location}>
      <div>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
      </div>
    </Layout>
  );
}
