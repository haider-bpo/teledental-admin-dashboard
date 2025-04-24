import { errorResponse } from '@/lib/responses';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

export const errorHandler = (handler: (req: NextRequest) => Promise<Response>) => {
  return async (req: NextRequest): Promise<Response> => {
    try {
      return await handler(req);
    } catch (err: any) {
      console.error('[ERROR]', err);

      // Handle Zod validation errors
      if (err instanceof ZodError) {
        const errors = err.flatten();
        const message = Object.entries(errors.fieldErrors)
          .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
          .join('; ');
        return errorResponse(message || 'Validation failed', 400);
      }

      // Handle known error with status/message
      if (err.status && err.message) {
        return errorResponse(err.message, err.status);
      }

      // Default fallback
      return errorResponse('Internal server error', 500);
    }
  };
};
