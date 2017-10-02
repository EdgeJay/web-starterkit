import React from 'react';
import PageHeader from './PageHeader';

const About = () => (
  <div>
    <PageHeader>About This Repo</PageHeader>
    <p>{`I created this repository to serve as a starter kit to assist me in kickstarting 
      new web app projects without the need of building from scratch or depend on various 
      plugins/projects that use CLI commands. Feel free to post issues or raise PRs if 
      you found any bugs or areas that require improvement.`}</p>
    <h2>Pre-requisites</h2>
    <ul>
      <li>Node.js v8.3.0 and above must be installed.</li>
      <li>Recommended to use <a href="https://yarnpkg.com" rel="noopener noreferrer" target="_blank">yarn</a> as package manager</li>
    </ul>
    <h2>Getting Started</h2>
    <ol>
      <li>Copy dotenv file from <code>/deploy/local</code> folder into project root folder
        and rename to <code>.env</code></li>
      <li><code>yarn install</code> or <code>npm install</code></li>
      <li><code>npm run dev:server</code></li>
      <li>Open <a href="http://localhost:6150" rel="noopener noreferrer" target="_blank">http://localhost:6150</a> in web browser</li>
    </ol>
  </div>
);

export default About;
