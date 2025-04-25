import { connectDB } from '@/lib/connectDB';
import { errorResponse } from '@/lib/responses';
import { NextRequest } from 'next/server';
import { Middleware, RouteHandler } from '@/types/route-handler';

export const withDB: Middleware = (handler: RouteHandler) => {
  return async (req: NextRequest, context) => {
    try {
      await connectDB();
      return await handler(req, context);
    } catch (error) {
      console.error('[withDB]', error);
      return errorResponse('Database connection error', 500);
    }
  };
};
