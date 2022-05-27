import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { authConfig } from '../../../config/auth';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  exp: number;
  iat: number;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers

  if (!authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.player = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
