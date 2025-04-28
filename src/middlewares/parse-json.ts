// src/middlewares/parse-json.ts
import { NextRequest } from 'next/server';
import { RouteHandler } from '@/types/route-handler';

export const parseJson = (handler: RouteHandler): RouteHandler => {
  return async (req: NextRequest, context) => {
    // Only try to parse JSON for methods that normally have a body
    if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
      let body = {};
      try {
        body = await req.json();
      } catch (error: any) {
        // If JSON parsing fails, use an empty object instead of throwing
        console.log('[parseJson] Could not parse request body, using empty object');
      }

      // Add parsed body to context (will be {} if parsing failed)
      return handler(req, { ...context, body });
    }

    // For other methods, just pass through with an empty body object
    return handler(req, { ...context, body: {} });
  };
};
