import { mailConfig } from '../../../../config/mail'
import { HandlebarsMailTemplateProvider } from '../../../../shared/providers/HandlebarsMailTemplateProvider'
import EtherealMailProvider from '../../../../shared/providers/implementations/EtherealMailProvider'
import SESMailProvider from '../../../../shared/providers/implementations/SESMailProvider'
import { PlayersRepository } from '../../repositories/implementations/PlayersRepository'
import { PlayerTokensRepository } from '../../repositories/implementations/PlayerTokensRepository'
import { SendForgotPasswordEmailController } from './SendForgotPasswordEmailController'
import { SendForgotPasswordEmailBusinessLogic } from './SendForgotPasswordEmailBusinessLogic'

const playersRepository = new PlayersRepository()
const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider()
const playerTokensRepository = new PlayerTokensRepository()

const mailProvider = {
    ses: new SESMailProvider(handlebarsMailTemplateProvider),
    ethereal: new EtherealMailProvider(handlebarsMailTemplateProvider),
}[mailConfig.driver]

const sendForgotPasswordEmailBusinessLogic = new SendForgotPasswordEmailBusinessLogic(playersRepository, mailProvider, playerTokensRepository)

const sendForgotPasswordEmailController = new SendForgotPasswordEmailController(sendForgotPasswordEmailBusinessLogic)

export {
  sendForgotPasswordEmailController,
}
