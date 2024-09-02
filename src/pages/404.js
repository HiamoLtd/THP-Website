import React from 'react';

import { Seo } from '../components/shared';
import { Layout } from '../components';

const NotFoundPage = () => (
  <Layout>
    <Seo title="Then you are lost!" robots={false} />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: '200px 16px'
      }}
    >
      <h1>404: Not Found</h1>
      <p>
        This site is still being built, so there's bits missing!
        <br/>
        If you're expecting something to be here, please let us know.
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;
