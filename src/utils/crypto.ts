import { HASH_ALGO, SALT } from '@/config/environment';
import crypto from 'crypto';

// const HASH_ALGO = process.env.HASH_ALGO || 'sha256';
// const SALT = process.env.SALT || 'teledental-default-salt';

/**
 * Hashes a text using HMAC with the configured algorithm and salt.
 * Always returns a hex string. Empty text returns an empty string.
 *
 * @param text - The input string to hash
 * @returns The hashed hex string
 */
export function makeHashValue(text: string | number): string {
  if (!text) return '';

  const hmac = crypto.createHmac(HASH_ALGO, SALT);
  hmac.update(text.toString());

  return hmac.digest('hex');
}
