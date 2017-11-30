import React from 'react';
import PageHeader from './PageHeader';
import staticAssets from '../utils/staticAssets';

const Home = () => (
  <div>
    <PageHeader>{'Web Starter Kit'}</PageHeader>
    <img src={staticAssets.images.rocket} alt="Shooom!" height={200} />
  </div>
);

export default Home;
