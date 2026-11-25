import { ErrorRequestHandler } from 'express';
import { isAppError } from '../lib/AppError';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (isAppError(err)) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  if (err?.code === 11000) {
    res.status(409).json({ message: 'Duplicate value' });
    return;
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
};