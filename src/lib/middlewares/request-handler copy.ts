import * as nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from './authenticate';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import errorHandler from './error-handler';
import connectWithDB from './connect-with-db';

const requestHandler = nextConnect<NextApiRequest, NextApiResponse>({ onError: errorHandler })
  .use(helmet()) // Adds security headers
  .use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50, // Limit each IP to 100 requests per windowMs
    }),
  )
  .use(connectWithDB)
  .use(authenticate); // authenticate each request

export default requestHandler;
