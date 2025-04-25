import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { ZodError, ZodSchema } from 'zod';

interface ValidationMiddleware {
  (schema: ZodSchema): (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => void;
}

// A utility function that generates the middleware for Zod validation
const validateSchema: ValidationMiddleware = (schema) => {
  return (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    try {
      // Validate the request body using the provided Zod schema
      schema.parse(req.body);

      // If you want to validate query or params as well, you can do so like this:
      // schema.parse(req.query); // Uncomment to validate query parameters
      // schema.parse(req.params); // Uncomment to validate route parameters

      next(); // If validation is successful, proceed to the next middleware or route handler
    } catch (error) {
      if (error instanceof ZodError) {
        // If validation fails, return a 400 response with the validation error details
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        });
      }

      // If it's another error type, pass it to the next error handler
      next();
    }
  };
};

export default validateSchema;
