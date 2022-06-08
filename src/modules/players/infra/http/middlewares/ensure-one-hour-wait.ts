import { AppError } from '@shared/errors/app-error';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
  points: 1,
  duration: 3600,
});

export async function ensureOneHourWait(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
  } catch (err) {
    throw new AppError(`You need to wait 3600 seconds`, 429);
  }

  return next();
}
