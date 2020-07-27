import { Next } from 'koa';
import Router, { RouterContext } from 'koa-router';

import IndexController from './controllers/index';

interface Controller {
  [endpoint: string]: (ctx: RouterContext, next?: Next) => Promise<any>;
}

const Controllers: Record<string, Controller> = {
  index: IndexController
};

const router = new Router();

const P_CATCHALL = '__CATCH_ALL__';

router.all('/', async (ctx: RouterContext, next: Next) => {
  await Controllers.index.index(ctx, next);
  return;
});

router.all('/:key/', async (ctx: RouterContext, next: Next) => {
  const controller = Controllers[ctx.params.key];
  if (controller && controller.index) {
    await controller.index(ctx, next);
    return;
  } else if (controller && controller[P_CATCHALL]) {
    await controller[P_CATCHALL](ctx, next);
    return;
  }
  const endpoint = Controllers.index[ctx.params.key];
  if (endpoint) {
    await endpoint(ctx);
    return;
  }
  await next();
});

router.all('/:key/:endpoint/', async (ctx: RouterContext, next: Next) => {
  const controller = Controllers[ctx.params.key];
  const endpoint = ctx.params.endpoint;
  if (controller && controller[endpoint]) {
    await controller[endpoint](ctx, next);
    return;
  } else if (controller && controller[P_CATCHALL]) {
    await controller[P_CATCHALL](ctx, next);
    return;
  }
  await next();
});

router.get('(.*)', async (ctx: RouterContext, next: Next) => {
  await Controllers.index.index(ctx, next);
  await next();
});

export default router;
