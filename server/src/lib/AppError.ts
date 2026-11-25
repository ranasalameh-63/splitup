export type AppError = Error & { statusCode: number; isAppError: true };

export function createError(statusCode: number, message: string): AppError {
  const err = new Error(message) as AppError;
  err.statusCode = statusCode;
  err.isAppError = true;
  return err;
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof Error && (err as AppError).isAppError === true;
}