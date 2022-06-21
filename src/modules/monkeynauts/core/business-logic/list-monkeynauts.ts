import { IMonkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';
import { inject, injectable } from 'tsyringe';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class ListMonkeynautsBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,
  ) {}

  async execute(playerId?: string): Promise<IMonkeynaut[]> {
    let monkeynauts: IMonkeynaut[] = [];

    if (playerId) {
      monkeynauts =
        await this.monkeynautsRepository.listAllMonkeynautsFromPlayer(playerId);
    } else {
      monkeynauts = await this.monkeynautsRepository.listAllMonkeynauts();
    }

    return monkeynauts;
  }
}

export { ListMonkeynautsBusinessLogic };
