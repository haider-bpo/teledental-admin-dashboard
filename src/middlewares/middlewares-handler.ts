import { NextRequest } from 'next/server';
import { Middleware, RouteHandler, RouteHandlerContext } from '@/types/route-handler';

export const middlewaresHandler =
  (...middlewares: Middleware[]) =>
  (handler: RouteHandler) =>
  async (req: NextRequest, context: RouteHandlerContext) => {
    return middlewares.reduceRight((acc, curr) => curr(acc), handler)(req, context);
  };
