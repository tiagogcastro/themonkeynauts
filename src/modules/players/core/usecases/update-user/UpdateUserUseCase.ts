import { IHashProvider } from '../../../../shared/providers/IHashProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { Player, PlayerRole } from '@prisma/client';
import { IPlayersRepository } from '../../repositories/IPlayersRepository';

type UpdatePlayerRequestDTO = {
  player_id: string;
  nickname: string;
  role?: PlayerRole;

  old_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
}

type Response = {
  player: Player;
}

class UpdatePlayerBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    player_id,
    nickname,
    new_password,
    new_password_confirmation,
    old_password,
    role
  }: UpdatePlayerRequestDTO): Promise<Response> {
    const player_logged = await this.playersRepository.findById(player_id);

    if (!player_logged) {
      throw new AppError('Nickname does not exists', 403);
    }

    if(nickname !== player_logged.nickname) {
      const found_nickname_different = await this.playersRepository.findByNickname(nickname);

      if(found_nickname_different) {
        throw new AppError('Nickname exists another account', 403);
      }

      player_logged.nickname = nickname;
    }

    // TODO - Verify if string exist "admin || default"

    if(role) {
      player_logged.role = role;
    }

    if(old_password) {
      if(!new_password_confirmation || !new_password) {
        throw new AppError('New password and confirmation is required', 403);
      }

      if(new_password !== new_password_confirmation) {
        throw new AppError('New password and confirmation not matched', 403);
      }

      const oldPasswordMatched = this.hashProvider.compareHashSync(old_password, player_logged.password);

      if(!oldPasswordMatched) {
        throw new AppError('Old password does not matched', 403);
      }

      const generateNewPasswordHashed = await this.hashProvider.generateHash(new_password);

      player_logged.password = generateNewPasswordHashed;
    }

    const playerUpdated = {
      ...player_logged,
      premium_pass: undefined
    } as Player

    await this.playersRepository.save(playerUpdated);

    return {
      player: player_logged
    };
  }
}

export { UpdatePlayerBusinessLogic };
