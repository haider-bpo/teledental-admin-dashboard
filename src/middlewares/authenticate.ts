// src/middlewares/authenticate.ts
import { NextRequest } from 'next/server';
import { RouteHandler } from '@/types/route-handler';
import ApiError from '@/lib/api-error';
import jwt from 'jsonwebtoken';

// Define user type
interface User {
  id: string;
  email: string;
  role: string;
  // Add any other user properties you need
}

// Define options for the authenticate middleware
interface AuthOptions {
  roles?: string[]; // Required roles (if any)
  optional?: boolean; // Whether authentication is optional
}

/**
 * Authentication middleware for Next.js App Router
 *
 * @param options Authentication options
 * @returns Middleware function
 */
export const authenticate = (options: AuthOptions = {}) => {
  return (handler: RouteHandler): RouteHandler => {
    return async (req: NextRequest, context) => {
      try {
        // Get authorization header
        const authHeader = req.headers.get('authorization');

        // Check if auth header exists and has correct format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          // If authentication is optional, continue without user
          if (options.optional) {
            return handler(req, context);
          }

          throw ApiError.unauthorized('Authentication required');
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        if (!token) {
          throw ApiError.unauthorized('Invalid authentication token');
        }

        try {
          // Verify token (replace SECRET_KEY with your actual secret)
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key') as User;

          // Check if user has required roles (if specified)
          if (options.roles && options.roles.length > 0) {
            if (!decoded.role || !options.roles.includes(decoded.role)) {
              throw ApiError.forbidden('Insufficient permissions');
            }
          }

          // Add user to context
          const enhancedContext = {
            ...context,
            user: decoded,
          };

          // Continue to next middleware or handler with enhanced context
          return handler(req, enhancedContext);
        } catch (error: any) {
          // Handle token verification errors
          if (error.name === 'JsonWebTokenError') {
            throw ApiError.unauthorized('Invalid token');
          }

          if (error.name === 'TokenExpiredError') {
            throw ApiError.unauthorized('Token expired');
          }

          // Rethrow other errors
          throw error;
        }
      } catch (error) {
        // If it's already an ApiError, just rethrow it
        if (error instanceof ApiError) {
          throw error;
        }

        // For other errors, wrap in an ApiError
        console.error('[Authentication Error]', error);
        throw ApiError.unauthorized('Authentication failed');
      }
    };
  };
};

/**
 * Middleware that requires admin role
 */
export const requireAdmin = authenticate({ roles: ['admin'] });

/**
 * Middleware that optionally authenticates the user
 */
export const optionalAuth = authenticate({ optional: true });
