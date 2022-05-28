import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DisablePlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  async execute(player_id: string): Promise<void> {}
}

export { DisablePlayerBusinessLogic };
