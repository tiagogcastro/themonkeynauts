import { AsyncMaybe } from '@shared/core/logic/maybe';
import { IGameParam } from '../entities/game-param';

interface IGameParamsRepository {
  create(gameParam: IGameParam): Promise<void>;
  save(gameParam: IGameParam): Promise<void>;
  findFirst(): AsyncMaybe<IGameParam>;
}
export { IGameParamsRepository };
