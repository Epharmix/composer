/**
 * Index controller
 */

import fs from 'fs';
import path from 'path';

import { Next } from 'koa';
import { RouterContext } from 'koa-router';

import Logger from '../logger';

const LoadBaseTemplate = (): Buffer => {
  let template: Buffer;
  try {
    template = fs.readFileSync(path.join(__dirname, '../../static/dist/index.html'));
  } catch (err) {
    Logger.error(err);
  }
  return template;
};

const TEMPLATE = LoadBaseTemplate();

export default {

  index: async (ctx: RouterContext, _next?: Next): Promise<void> => {
    ctx.type = 'html';
    ctx.body = TEMPLATE;
    return;
  }

};
