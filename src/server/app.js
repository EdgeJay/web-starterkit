import Koa from 'koa';
import { initViews } from './views';
import { initWebpack } from './webpack';
import { initRoutes } from './routes';

const port = process.env.NODE_PORT;
const app = new Koa();

initViews(app);
initWebpack(app);
initRoutes(app);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running at port ${port}`);
});
