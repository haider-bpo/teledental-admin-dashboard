import { NextRequest } from 'next/server';
import { Middleware, RouteHandler, RouteHandlerContext } from '@/types/route-handler';
import { handleError } from './handle-error';

// export const middlewaresHandler =
//   (...middlewares: Middleware[]) =>
//   (handler: RouteHandler) =>
//   async (req: NextRequest, context: RouteHandlerContext) => {
//     return middlewares.reduceRight((acc, curr) => curr(acc), handler)(req, context);
//   };

export const middlewaresHandler =
  (...middlewares: Middleware[]) =>
  (handler: RouteHandler) =>
  async (req: NextRequest, context: RouteHandlerContext) => {
    try {
      // Apply all middlewares from right to left (traditional middleware composition)
      const composedHandler = middlewares.reduce((acc, curr) => curr(acc), handler);

      // Execute the composed handler
      return await composedHandler(req, context);
    } catch (error) {
      // Any error thrown during middleware execution or in the handler will be caught here
      return handleError(error);
    }
  };
