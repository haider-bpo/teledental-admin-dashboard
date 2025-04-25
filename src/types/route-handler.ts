import { NextRequest } from 'next/server';

export type RouteHandlerContext = {
  params: Record<string, string>;
  searchParams: URLSearchParams;
};

export type RouteHandler = (req: NextRequest, context: RouteHandlerContext) => Promise<Response>;

export type Middleware = (handler: RouteHandler) => RouteHandler;
