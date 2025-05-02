import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema } from 'zod';

export interface Options {
  auth?: boolean;
  validationSchema?: ZodSchema;
  middlewares?: MiddlewareFn[];
}

export type MiddlewareFn = (req: NextRequest, context: any) => Promise<void | NextResponse>;

export type HandlerFn = (req: NextRequest, context: any) => Promise<NextResponse>;
