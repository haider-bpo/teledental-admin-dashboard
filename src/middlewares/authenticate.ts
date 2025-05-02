import ApiError from '@/lib/api-error';
import { MiddlewareFn } from './api-handler/types';
import { handleError } from './handle-error';
import { verifyToken } from './verifyToken';

export const authenticate: MiddlewareFn = async (req, context) => {
  try {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      throw new ApiError('Authorization header missing', 401);
    }

    const token = authHeader.split(' ')[1]; // Bearer token

    if (!token) {
      throw new ApiError('Token missing from Authorization header', 401);
    }

    // Verify token (e.g., JWT verification)
    const user = await verifyToken(token); // This would be your JWT verification logic
    if (!user) {
      throw new ApiError('Invalid or expired token', 401);
    }

    // Add authenticated user to the context
    context.user = user;
  } catch (error) {
    return handleError(error);
  }
};
