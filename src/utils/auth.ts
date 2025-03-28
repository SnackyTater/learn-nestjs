import crypto from 'crypto';
import jwt, { sign } from 'jsonwebtoken';

export const createToken = (payload: Record<string,any>) => {
  const secret = process.env.JWT_SECRET as string;
  return sign(payload, secret);
}

export const extractTokenInfo = (token: string) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret);
}

export const validateToken = (token: string) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret);
}

export const createSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
}