import Koa from 'koa';
import { initSecurity } from './secure';
import { initViews } from './views';
import { initWebpack } from './webpack';
import { initRoutes, initStatic } from './routes';
import { initBodyParser } from './helpers';

const port = process.env.NODE_PORT;
const app = new Koa();

app.keys = [
  process.env.COOKIE_KEY_1,
  process.env.COOKIE_KEY_2,
  process.env.COOKIE_KEY_3,
];

initSecurity(app);
initViews(app);
initWebpack(app);
initBodyParser(app);
initRoutes(app);
initStatic(app);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running at port ${port}`);
});
