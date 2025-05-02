import { NextRequest } from 'next/server';
import { MiddlewareFn } from './types';

export const runMiddlewares = async (
  middlewares: MiddlewareFn[],
  req: NextRequest,
  context: any,
) => {
  for (const middleware of middlewares) {
    await middleware(req, context);
  }
};
