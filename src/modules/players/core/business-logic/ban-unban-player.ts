import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, left, right } from '@shared/core/logic/either';
import { IMailProvider } from '@shared/domain/providers/mail-provider';
import { UserNotFoundError } from '@shared/errors/user-not-fount-error';
import path from 'node:path';
import { inject, injectable } from 'tsyringe';

type BanUnbanPlayerResponse = Either<UserNotFoundError, null>;

export type BanUnbanPlayerRequestDTO = {
  playerId: string;
};

@injectable()
class BanUnbanPlayerBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({
    playerId,
  }: BanUnbanPlayerRequestDTO): Promise<BanUnbanPlayerResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      return left(new UserNotFoundError());
    }

    player.isBanned = !player.isBanned;

    await this.playersRepository.save(player);

    await this.mailProvider.sendMail({
      subject: 'You have been banned on our platform',
      template_data: {
        file: path.resolve(
          __dirname,
          '..',
          '..',
          'infra',
          'views',
          'ban-unban-player-template.hbs',
        ),
        variables: {},
      },
      to: {
        address: player.email,
        name: player.nickname,
      },
    });

    return right(null);
  }
}

export { BanUnbanPlayerBusinessLogic };
