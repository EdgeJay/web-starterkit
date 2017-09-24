import Koa from 'koa';
import { initRoutes } from './routes';
import { initViews } from './views';

const port = process.env.NODE_PORT;
const app = new Koa();

initViews(app);
initRoutes(app);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running at port ${port}`);
});
