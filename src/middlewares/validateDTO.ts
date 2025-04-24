import { errorResponse } from '@/lib/responses';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

export const validateDTO = (schema: any) => {
  return async (req: NextRequest): Promise<Response | undefined> => {
    try {
      const body = await req.json();
      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        const message = parsed.error.errors.map((e: any) => e.message).join(', ');
        return errorResponse(`Validation failed: ${message}`, 400);
      }

      // Attach sanitized data to request object
      (req as any).body = parsed.data;
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => e.message).join(', ');
        return errorResponse(`Validation failed: ${message}`, 400);
      }

      // Handle other errors (like invalid JSON)
      return errorResponse('Invalid request body format', 400);
    }
  };
};
