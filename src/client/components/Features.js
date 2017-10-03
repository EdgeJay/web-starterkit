/* eslint-disable react/no-danger */

import React from 'react';
import PageHeader from './PageHeader';

const Features = () => (
  <div>
    <PageHeader>{'Features'}</PageHeader>
    <h2>CSRF</h2>
    <p dangerouslySetInnerHTML={{ __html: 'Generated CSRF token is <code></code>. Tap on "Test CSRF token validity" to test the token.' }} />
    <button>Test CSRF token validity</button>
  </div>
);

export default Features;
