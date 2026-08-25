import { IMonkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';
import { Either, right } from '@shared/core/logic/either';
import { inject, injectable } from 'tsyringe';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

type ListMonkeynautsResponse = Either<
  Error,
  {
    monkeynauts: IMonkeynaut[];
  }
>;

@injectable()
class ListMonkeynautsBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,
  ) {}

  async execute(playerId?: string): Promise<ListMonkeynautsResponse> {
    let monkeynauts: IMonkeynaut[] = [];

    if (playerId) {
      monkeynauts =
        await this.monkeynautsRepository.listAllMonkeynautsFromPlayer(playerId);
    } else {
      monkeynauts = await this.monkeynautsRepository.listAllMonkeynauts();
    }

    return right({
      monkeynauts,
    });
  }
}

export { ListMonkeynautsBusinessLogic };
