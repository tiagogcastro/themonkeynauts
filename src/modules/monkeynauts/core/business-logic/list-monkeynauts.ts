import { IMonkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';
import { inject, injectable } from 'tsyringe';
import { IMonkeynautsRepository } from '../../domain/repositories/monkeynauts-repositories';

@injectable()
class ListMonkeynautsBusinessLogic {
  constructor(
    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,
  ) {}

  async execute(player_id?: string): Promise<IMonkeynaut[]> {
    let monkeynauts: IMonkeynaut[] = [];

    if (player_id) {
      monkeynauts =
        await this.monkeynautsRepository.listAllMonkeynautsFromPlayer(
          player_id,
        );
    } else {
      monkeynauts = await this.monkeynautsRepository.listAllMonkeynauts();
    }

    return monkeynauts;
  }
}

export { ListMonkeynautsBusinessLogic };
