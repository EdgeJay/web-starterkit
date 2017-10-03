import Koa from 'koa';
import { initViews } from './views';
import { initWebpack } from './webpack';
import { initRoutes, initStatic } from './routes';
import { initBodyParser } from './helpers';

const port = process.env.NODE_PORT;
const app = new Koa();

initViews(app);
initWebpack(app);
initBodyParser(app);
initRoutes(app);
initStatic(app);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running at port ${port}`);
});
