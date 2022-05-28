import { IPlayerTokensRepository } from '@modules/players/domain/repositories/player-tokens-repository';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { ResetPasswordRequestDTO } from '../dtos/reset-password-request';

@injectable()
class ResetPasswordBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('PlayerTokensRepository')
    private playerTokensRepository: IPlayerTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: ResetPasswordRequestDTO): Promise<void> {
    const playerTokens = await this.playerTokensRepository.findByToken(token);

    if (!playerTokens) throw new AppError('Token does not exists', 401);

    const player = await this.playersRepository.findById(playerTokens.playerId);

    if (!player) throw new AppError('Player does not exists', 409);

    const amount = 2;
    const limitDate = this.dateProvider.addHours(
      playerTokens.createdAt,
      amount,
    );

    if (this.dateProvider.isAfter(Date.now(), limitDate)) {
      await this.playerTokensRepository.destroy(playerTokens.id);

      throw new AppError('Token expired', 401);
    }

    await this.hashProvider.generateHash(password);

    player.password = password;

    await this.playersRepository.save(player);

    await this.playerTokensRepository.destroy(playerTokens.id);
  }
}

export { ResetPasswordBusinessLogic };
