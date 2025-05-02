import jwt from 'jsonwebtoken';

interface User {
  id: string;
  role: string;
  email: string;
}

export function verifyToken(token: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject(null);
      } else {
        resolve(decoded as User); // Return the user object after successful token verification
      }
    });
  });
}
