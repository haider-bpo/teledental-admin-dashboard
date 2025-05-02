import { handleError } from '@/middlewares/handle-error';
import { NextRequest } from 'next/server';
import { HandlerFn, Options } from './types';
import { authenticate } from '../authenticate';
import { runMiddlewares } from './runMiddlewares';
import { validateRequest } from './validateRequest';
import { connectDB } from '@/lib/connectDB';
import { parseBody } from './parseBody';

export function apiHandler(handler: HandlerFn, options: Options = {}) {
  return async function (req: NextRequest, context: any) {
    try {
      const searchParams = req.nextUrl.searchParams;

      await connectDB();

      // Auth
      if (options.auth) {
        await authenticate(req, context);
      }

      // Body Validation
      if (options.validationSchema) {
        await validateRequest(options.validationSchema, req, context);
      } else {
        await parseBody(req, context);
      }

      // Enriched Context (same for middleware & handler)
      const ApiContext = {
        ...context,
        params: context.params,
        searchParams,
      };

      // Run Middlewares (AFTER auth & validation)
      if (options.middlewares) {
        await runMiddlewares(options.middlewares, req, ApiContext);
      }

      // Call Handler
      return await handler(req, ApiContext);
    } catch (error: any) {
      console.error('API Error:', error);
      return handleError(error);
    }
  };
}
