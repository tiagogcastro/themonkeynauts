import { EnsureAuthenticatedBusinessLogic } from '@modules/players/core/business-logic/ensure-authenticated';
import { AppError } from '@shared/errors/app-error';
import { NextFunction, Request, Response } from 'express';

import { container } from 'tsyringe';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = request.headers;

  if(!authorization) {
    throw new AppError('Header params: authorization is missing.')
  }

  const ensureAuthenticatedBusinessLogic = container.resolve(
    EnsureAuthenticatedBusinessLogic
  )

  const execute = await ensureAuthenticatedBusinessLogic.execute({
    authorization
  });

  if(execute) {
    const { decoded } = execute;
    
    request.player = {
      id: decoded.playerId,
    };
    
    return next();
  }
}
