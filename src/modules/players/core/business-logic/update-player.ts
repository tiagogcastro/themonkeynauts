import { IPlayer } from '@modules/players/domain/entities/player';
import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IHashProvider } from '@shared/domain/providers/hash-provider';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';

type UpdatePlayerRequestDTO = {
  player_id: string;
  nickname: string;
  role?: PlayerRole;

  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
};

type Response = {
  player: IPlayer;
};

@injectable()
class UpdatePlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    player_id,
    nickname,
    newPassword,
    newPasswordConfirmation,
    oldPassword,
    role,
  }: UpdatePlayerRequestDTO): Promise<Response> {
    const player = await this.playersRepository.findById(player_id);

    if (!player) {
      throw new AppError('Nickname does not exists', 403);
    }

    if (nickname !== player.nickname) {
      const checkUsernameAlreadyExists =
        await this.playersRepository.findByNickname(nickname);

      if (checkUsernameAlreadyExists) {
        throw new AppError('Nickname exists another account', 403);
      }

      player.nickname = nickname;
    }

    // TODO - Verify if string exist "admin || default"

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

    return {
      player,
    };
  }
}

export { UpdatePlayerBusinessLogic };
