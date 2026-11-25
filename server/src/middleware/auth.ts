import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { createError } from '../lib/AppError';

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(createError(401, 'Not authenticated'));
  }

  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET);
    if (typeof payload === 'string' || !payload.sub) throw new Error('bad token');
    req.userId = payload.sub;
    next();
  } catch {
    next(createError(401, 'Invalid or expired token'));
  }
};