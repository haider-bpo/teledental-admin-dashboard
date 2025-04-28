import ApiError from '@/lib/api-error';
import ApiResponse from '@/lib/api-response';
import { NextRequest, NextResponse } from 'next/server';

export type RouteHandlerContext = {
  params: Record<string, string>;
  searchParams: URLSearchParams;
  body: any;
};

export type RouteHandler = (
  req: NextRequest,
  context: RouteHandlerContext,
) => Promise<NextResponse | any>;

export type Middleware = (handler: RouteHandler) => RouteHandler;
