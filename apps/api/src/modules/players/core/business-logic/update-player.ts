import { IPlayer } from '@modules/players/domain/entities/player';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, right } from '@shared/core/logic/either';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';

export type UpdatePlayerRequestDTO = {
  playerId: string;
  nickname: string;
  role?: PlayerRole;

  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
};

type UpdatePlayerResponse = Either<Error, IPlayer>;

@injectable()
class UpdatePlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    playerId,
    nickname,
    newPassword,
    newPasswordConfirmation,
    oldPassword,
    role,
  }: UpdatePlayerRequestDTO): Promise<UpdatePlayerResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      throw new AppError('Player does not exist', 403);
    }

    if (nickname.toLowerCase() !== player.nickname) {
      const checkNicknameAlreadyExists =
        await this.playersRepository.findByNickname(nickname.toLowerCase());

      if (checkNicknameAlreadyExists) {
        throw new AppError('Nickname exists another account', 403);
      }

      player.nickname = nickname.toLowerCase();
    }

    if (role) {
      player.role = role;
    }

    if (oldPassword) {
      if (!newPasswordConfirmation || !newPassword) {
        throw new AppError('New password and confirmation is required', 403);
      }

      if (newPassword !== newPasswordConfirmation) {
        throw new AppError('New password and confirmation not matched', 403);
      }

      const oldPasswordMatched = this.hashProvider.compareHashSync(
        oldPassword,
        player.password,
      );

      if (!oldPasswordMatched) {
        throw new AppError('Old password does not matched', 403);
      }

      const generateNewPasswordHashed = await this.hashProvider.generateHash(
        newPassword,
      );

      player.password = generateNewPasswordHashed;
    }

    await this.playersRepository.save(player);

    return right(player);
  }
}

export { UpdatePlayerBusinessLogic };
