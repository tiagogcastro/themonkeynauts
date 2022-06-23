import { IPlayer } from '@modules/players/domain/entities/player';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { Either, left, right } from '@shared/core/logic/either';
import { IMailProvider } from '@shared/domain/providers/mail-provider';
import { UserNotFoundError } from '@shared/errors/user-not-fount-error';
import path from 'node:path';
import { inject, injectable } from 'tsyringe';
import { Maybe } from '@shared/core/logic/maybe';

type BanUnbanPlayerResponse = Either<UserNotFoundError, IPlayer>;

export type BanUnbanPlayerRequestDTO = {
  playerIdOrWallet: string;
  reason: string;
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
    playerIdOrWallet,
    reason,
  }: BanUnbanPlayerRequestDTO): Promise<BanUnbanPlayerResponse> {
    let player: Maybe<IPlayer>;

    if (
      playerIdOrWallet.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      )
    ) {
      player = await this.playersRepository.findById(playerIdOrWallet);
    } else {
      player = await this.playersRepository.findByWallet(playerIdOrWallet);
    }

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
        variables: {
          reason,
        },
      },
      to: {
        address: player.email,
        name: player.nickname,
      },
    });

    return right(player);
  }
}

export { BanUnbanPlayerBusinessLogic };
