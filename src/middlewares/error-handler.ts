import { errorResponse } from '@/lib/responses';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { Middleware, RouteHandler } from '@/types/route-handler';

export const errorHandler: Middleware = (handler: RouteHandler) => {
  return async (req: NextRequest, context) => {
    try {
      return await handler(req, context);
    } catch (err: unknown) {
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
      if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
        return errorResponse(
          (err as { message: string }).message,
          (err as { status: number }).status,
        );
      }

      // Default fallback
      return errorResponse('Internal server error', 500);
    }
  };
};
