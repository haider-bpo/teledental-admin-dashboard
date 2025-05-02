import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import ApiResponse from '@/lib/api-response';
import { apiHandler } from '@/middlewares/api-handler';
import { HandlerFn } from '@/middlewares/api-handler/types';
import { signinSchema } from '@/features/auth/auth.schema';
import AuthService from '@/services/auth.service';
import { ADMIN_TOKEN_EXPIRY, JWTSECRET } from '@/config/environment';

const signin: HandlerFn = async (req, { body }) => {
  const { email, password } = body;

  const admin = await AuthService.signinAdmin(email, password);

  // Create JWT token
  const token = jwt.sign(
    {
      _id: admin._id,
      email: admin.email,
    },
    JWTSECRET,
    { expiresIn: ADMIN_TOKEN_EXPIRY } as jwt.SignOptions,
  );

  // Set JWT token in HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return NextResponse.json(new ApiResponse(admin, 'Successfully signed in'));
};

export const POST = apiHandler(signin, { validationSchema: signinSchema });
