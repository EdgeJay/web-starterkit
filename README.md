# web-starterkit
Template project to kickstart new web projects

## About This Repository
I created this repository to serve as a starter kit to assist me in kickstarting new web app projects without the need of building from scratch or depend on various plugins/projects that use CLI commands.

Feel free to post issues or raise PRs if you found any bugs or areas that require improvement.

## Pre-requisites

* Node.js v8.3.0 and above must be installed.
* Recommended to use [yarn](https://yarnpkg.com) as package manager

## Getting Started

1. Copy dotenv file from `/deploy/local` folder into project root folder and rename to `.env`
2. `yarn install` or `npm install`
3. `npm run dev:server`
4. Open http://localhost:6150 in web browser

## Features

* [x] Powered by Node.js v8 + [Koa v2](http://koajs.com/)
* [x] UI rendered by React v16 + react-router-redux
* [x] Based CSS styles provided by [Milligram CSS](http://milligram.io/)
* [x] [styled-components](https://www.styled-components.com) for styling React components
* [x] Server-side rendering
* [x] Webpack for bundling front-end Javascript code 
* [x] Webpack hot module replacement + Koa HMR middlewares for instant review of changes without the need to constantly reload app
* [x] Automatic Node.js app rebooting via [Nodemon](https://github.com/remy/nodemon)
* [x] [Eslint](https://eslint.org/) for code consistency and encourage better code writing styles
* [x] Responsive components styled using [styled-components](https://www.styled-components.com)
* [ ] Progressive web app (PWA) _\*Coming soon\*_
* [ ] Tests _\*Coming soon\*_
* [x] Production ready bundles
* [x] Gzipped bundles
* [x] [Helmet](https://helmetjs.github.io/) via **koa-helmet**
* [x] CSRF protection via [koa-csrf](https://github.com/koajs/csrf)
* [ ] Better handling of custom fonts _\*Coming soon\*_

## Preparing For Production Deployment

1. Make sure the following set of commands are included in your deployment script
    * `cp ./deploy/production/dotenv .env`
    * `yarn install` or `npm install`
    * `npm run build`
2. `npm run build` generates production-ready versions of Javascript bundles used by front-end app, and related static assets into the `/dist/assets` folder. You should come up with your own post-deployment strategy to copy/move the files into appropriate storage locations and update your app code accordingly.

## Wishlist

* Hosted demo app
* Stream server-side rendering
* Cached server-side rendering
* React UI testing with [Enzyme](https://github.com/airbnb/enzyme) ?
