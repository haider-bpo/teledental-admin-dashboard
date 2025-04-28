import { NextRequest } from 'next/server';
import { RouteHandler } from '@/types/route-handler';
import { z } from 'zod';
import { handleError } from './handle-error';

/**
 * Simple middleware that validates request body against a Zod schema
 *
 * @param schema The Zod schema to validate against
 * @returns A middleware function
 */
export const validateRequest = (schema: z.ZodSchema) => {
  return (handler: RouteHandler): RouteHandler => {
    return async (req: NextRequest, context) => {
      const { body } = context;

      try {
        // Validate the body against the schema
        const validatedData = schema.parse(body);

        // Update the context with the validated data
        return handler(req, { ...context, body: validatedData });
      } catch (error) {
        handleError(error);
      }
    };
  };
};
