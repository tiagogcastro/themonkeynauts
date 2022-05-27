
import path from 'path'
import { AppError } from '../../../../shared/errors/AppError'
import { IMailProvider } from '../../../../shared/providers/IMailProvider'
import { IPlayersRepository } from '../../repositories/IPlayersRepository'
import { IPlayerTokensRepository } from '../../repositories/IPlayerTokensRepository'

class SendForgotPasswordEmailBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
    private mailProvider: IMailProvider,
    private playerTokensRepository: IPlayerTokensRepository
  ) { }
  async execute(email: string): Promise<void> {
    const player = await this.playersRepository.findByEmail(email)

    if (!player) throw new AppError('Player does not exists.', 409)

    const playerToken = await this.playerTokensRepository.findByPlayerId(player.id)

    if(playerToken) {
      await this.playerTokensRepository.destroy(playerToken.id)
    }

    const { token } = await this.playerTokensRepository.generate(player.id)

    const forgotPasswordTemplatePath = path.resolve(__dirname, '..', '..', 'views', 'forgotPasswordEmailTemplate.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: player.nickname,
        address: player.email,
      },
      subject: 'Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: player.nickname,
          redirect: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
        }
      }
    })


  }
}

export { SendForgotPasswordEmailBusinessLogic }