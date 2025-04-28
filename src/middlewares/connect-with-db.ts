import { connectDB } from '@/lib/connectDB';
import { NextRequest } from 'next/server';
import { Middleware, RouteHandler } from '@/types/route-handler';
import { handleError } from './handle-error';

export const connectWithDB: Middleware = (handler: RouteHandler) => {
  return async (req: NextRequest, context) => {
    try {
      await connectDB();
      return await handler(req, context);
    } catch (error) {
      console.error('[connectWithDB]', error);
      return handleError(error);
    }
  };
};
