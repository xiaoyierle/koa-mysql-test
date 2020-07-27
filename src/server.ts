import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import jwt from 'koa-jwt';
import 'reflect-metadata';

import { protectedRouter, unprotectedRouter } from './routes';
import { logger } from './logger';
import { JWT_SECRET } from './constants';

createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(logger());
    app.use(cors());
    app.use(bodyParser());
    
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // 只返回 JSON 格式的响应
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
      }
    });

    // 无需 JWT Token 即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // 注册 JWT 中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

    // 需要 JWT Token 才可访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // 运行服务器
    app.listen(3100);
  })
  .catch((err: string) => console.log('TyptORM connection error:', err));
