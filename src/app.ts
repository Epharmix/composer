/**
 * App server
 */

import http from 'http';
import path from 'path';

import Koa from 'koa';
import KoaBody from 'koa-body';
import KoaLogger from 'koa-logger';
import KoaMount from 'koa-mount';
import KoaStatic from 'koa-static';

import Router from './urls';
import Logger from './logger';

export default class AppServer {

  public port: number;
  public app: Koa;
  public server: http.Server;

  constructor(port: number) {
    this.port = port;
    this.app = new Koa();
  }

  public async start(): Promise<http.Server> {
    // Error handling
    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.app.emit('error', err, ctx);
      }
    });
    // Set up basic middlewares
    this.app.use(KoaBody({
      multipart: true
    }));
    // FIXME: must replace the following random string with a 
    // new one from https://randomkeygen.com/ `Strong Passwords` section
    this.app.keys = ['FIXME_WITH_NEW_STRING'];
    // Serve static files
    const staticDir = path.join(__dirname, '../static');
    this.app.use(KoaMount('/static', KoaStatic(staticDir)));
    // Logging
    if (!process.env.HIP_TEST) {
      this.app.use(KoaLogger());
    }
    this.app.on('error', (err, ctx) => {
      Logger.error(err, `Error for url: ${ctx.request.url}`);
    });
    // Set up router
    this.app.use(Router.routes());
    this.app.use(Router.allowedMethods());
    // Start the server
    this.server = http.createServer(this.app.callback());
    // Start listening
    this.server.listen(this.port);
    // eslint-disable-next-line no-console
    console.log('Server is now listening on port', this.port, '...');
    return this.server;
  }

}
