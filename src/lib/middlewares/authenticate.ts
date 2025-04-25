import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export const authenticate = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  //   const token = req.headers['authorization'];

  //   if (!token) {
  //     return res.status(401).json({ error: 'Authorization token is required' });
  //   }

  //   // Validate token (You can replace with JWT or other methods)
  //   if (token !== 'valid-token') {
  //     return res.status(403).json({ error: 'Invalid token' });
  //   }

  next();
};
