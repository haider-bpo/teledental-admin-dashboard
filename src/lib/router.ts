import { createRouter, expressWrapper } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next/server';
import { authenticate } from './middlewares/authenticate';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import errorHandler from './middlewares/error-handler';
import connectWithDB from './middlewares/connect-with-db';

const router = createRouter<NextApiRequest, NextApiResponse>()
  .use(helmet()) // Adds security headers
  .use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50, // Limit each IP to 100 requests per windowMs
    }),
  )
  .use(connectWithDB)
  .use(authenticate); // authenticate each request
// .use(errorHandler);

export default router;
