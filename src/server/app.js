import Koa from 'koa';
import { initHelpers, initBodyParser } from './helpers';
import { initSecurity } from './secure';
import { initViews } from './views';
import { initWebpack } from './webpack';
import { initRoutes, initStatic } from './routes';

const port = process.env.PORT || process.env.NODE_PORT;
const app = new Koa();

app.keys = [
  process.env.COOKIE_KEY_1,
  process.env.COOKIE_KEY_2,
  process.env.COOKIE_KEY_3,
];

initHelpers(app);
initBodyParser(app);
initSecurity(app);
initViews(app);
initWebpack(app);
initRoutes(app);
initStatic(app);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running at port ${port}`);
});
