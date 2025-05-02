import { NextRequest } from 'next/server';

export const parseBody = async (req: NextRequest, context: any) => {
  let body = {};
  try {
    body = await req.json();
  } catch {
    // Ignore JSON parsing errors and use empty object
    body = {};
  }
  context.body = body;
};
