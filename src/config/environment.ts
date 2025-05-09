export const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const MONGODB_URI = process.env.MONGODB_URI!;
export const JWTSECRET = process.env.JWTSECRET!;
export const HASH_ALGO = process.env.HASH_ALGO! || 'sha256';
export const SALT = process.env.SALT! || 'teledental-default-salt';
export const ADMIN_TOKEN_EXPIRY = process.env.ADMIN_TOKEN_EXPIRY! || '1d';
