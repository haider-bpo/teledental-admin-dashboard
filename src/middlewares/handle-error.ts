import { NextResponse } from 'next/server';
import ApiError from '@/lib/api-error';
export const handleError = (error: any) => {
  console.error('[ERROR]', error);

  // Handle ApiError instances
  if (error instanceof ApiError) {
    return NextResponse.json(
      { success: false, message: error.message, status: error.statusCode, details: error.details },
      { status: error.statusCode },
    );
  }

  // Handle ZodError for validation
  if (error.name === 'ZodError') {
    const errors = error.flatten();
    // const message = Object.entries(errors.fieldErrors)
    //   .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
    //   .join('; ');

    return NextResponse.json(
      { success: false, message: errors || 'Validation failed', status: 400 },
      { status: 400 },
    );
  }

  // Default error handling
  return NextResponse.json(
    { success: false, message: error.message || 'Internal server error', status: 500 },
    { status: 500 },
  );
};
