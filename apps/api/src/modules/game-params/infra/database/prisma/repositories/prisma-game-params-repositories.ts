import { GameParam as PrismaGameParam } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/core/logic/maybe';
import {
  GameParam,
  IGameParam,
} from '@modules/game-params/domain/entities/game-param';
import { IGameParamsRepository } from '@modules/game-params/domain/repositories/game-params-repositories';

export const parseGameParam = (gameParam: PrismaGameParam): IGameParam => {
  return new GameParam(gameParam, {
    id: gameParam.id,
    createdAt: gameParam.createdAt,
    updatedAt: gameParam.updatedAt,
  }).gameParam;
};

class PrismaGameParamsRepository implements IGameParamsRepository {
  async save(gameParam: IGameParam): Promise<void> {
    const { id: gameParamId, ...props } = gameParam;

    await prisma.gameParam.update({
      data: {
        ...props,
        updatedAt: new Date(),
      },
      where: {
        id: gameParamId,
      },
    });
  }

  async create(gameParam: IGameParam): Promise<void> {
    const { id: gameParamId, ...props } = gameParam;

    await prisma.gameParam.create({
      data: {
        id: gameParamId,
        ...props,
      },
    });
  }

  async findFirst(): AsyncMaybe<IGameParam> {
    const gameParam = await prisma.gameParam.findFirst();

    if (!gameParam) {
      return null;
    }

    return parseGameParam(gameParam);
  }
}

export { PrismaGameParamsRepository };
