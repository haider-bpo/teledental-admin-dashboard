import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../handle-error';
import { ZodSchema } from 'zod';

export const validateRequest = async (schema: ZodSchema, req: NextRequest, context: any) => {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    context.body = result.data;
  } catch (error) {
    return handleError(error);
  }
};
