import { connectDB } from '@/lib/connectDB';
import { errorResponse } from '@/lib/responses';
import { NextRequest } from 'next/server';

export const withDB = (handler: (req: NextRequest) => Promise<Response>) => {
  return async (req: NextRequest): Promise<Response> => {
    try {
      await connectDB();
      return await handler(req);
    } catch (error) {
      console.error('[withDB]', error);
      return errorResponse('Database connection error', 500);
    }
  };
};
