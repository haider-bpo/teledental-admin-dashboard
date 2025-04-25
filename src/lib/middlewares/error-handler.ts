import { NextApiResponse, NextApiRequest } from 'next';
import ApiError from './api-error';

const errorHandler = (err: any, req: NextApiRequest, res: NextApiResponse) => {
  if (err instanceof ApiError) {
    // If it's an ApiError, send a structured response
    return res.status(err.statusCode).json(new ApiError(err.message, err.statusCode));
  }

  //if this is zod error
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors,
    });
  }
  // Generic error handling for any other errors
  return res
    .status(err.statusCode || 500)
    .json(new ApiError(err.message || 'Something went wrong', err.statusCode || 500));
};

export default errorHandler;
