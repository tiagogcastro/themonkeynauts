import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { prisma } from '../../../shared/prisma/client';

export default async function ensureAdministrator(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const player_id = request.player.id;

  const player = await prisma.player.findUnique({
    where: {
      id: player_id,
    },
  });

  if (!player) throw new AppError('Player does not exist', 401);

  if (player.role !== 'admin') throw new AppError('Only administrator can access here', 401);

  return next();
}
