import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { PlayersRepository } from '../../repositories/implementations/PlayersRepository'
import { UpdatePlayerController } from './UpdatePlayerController'
import { UpdatePlayerBusinessLogic } from './UpdatePlayerBusinessLogic'

const playersRepository = new PlayersRepository()
const bcryptHashProvider = new BCryptHashProvider()

const updatePlayerBusinessLogic = new UpdatePlayerBusinessLogic(playersRepository, bcryptHashProvider)

const updatePlayerController = new UpdatePlayerController(updatePlayerBusinessLogic)

export {
  updatePlayerController,
}
