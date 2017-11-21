### v0.2.1 / 21 Nov 2017
    * Fix order of babel plugins to avoid className mismatch issues with styled-components

### v0.2.0 / 20 Nov 2017
    * Bump up minor version as this version includes breaking changes that might not be compatible with v0.1.x code
    * Broken down app into smaller components (one JS file per page) that are loaded asynchronously into app only when user navigated to page

### v0.1.6 / 28 Oct 2017
    * Add redux-thunk
    * Moved CSRF token validation logic to async redux action via redux-thunk
    * Add static assets management class
    * Add custom fonts to Features page

### v0.1.5 / 5 Oct 2017
    * Add fetch-ponyfill as cleaner way of handling various implementations of WHATWG fetch, promises API specs in different browsers, with ability to provide alternative replacement libraries for incomplete implementations

### v0.1.4 / 5 Oct 2017
    * Add fetch-ponyfill as cleaner way of handling various implementations of WHATWG fetch, promises API specs in different browsers, with ability to provide alternative replacement libraries for incomplete implementations
    * Add common API class for handling front-end AJAX requests
    * Bug fix to stylesheet generation at server-side

### v0.1.3 / 3 Oct 2017
    * Add koa-session for client session management
    * Add koa-helment, koa-csrf for better app security
    * Improve handling of redux store
    * Clean up env vars

### v0.1.2 / 2 Oct 2017
    * Add util to add media queries in css generated via styled-components
    * Add webpack minify plugin
    * Update HTML template to choose right JS bundle to import based on app environment
    * Test production build scripts

### v0.1.1 / 1 Oct 2017
    * UI and route updates

### v0.1.0 / 27 Sep 2017
    * Initial commit
    * Add ReactJS v16
    * Add react prop types validation
    * Setup webpack
    * Add HMR for front-end code
    * Enable server-side rendering
    * Add react-hot-loader
    * Add react-router-redux and setup related files