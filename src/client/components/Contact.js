import React from 'react';
import PageHeader from './PageHeader';
import staticAssets from '../utils/staticAssets';

const Contact = () => (
  <div>
    <PageHeader>{'Contact'}</PageHeader>
    <img src={staticAssets.images.smiley} alt="Smile!" height={200} />
  </div>
);

export default Contact;
