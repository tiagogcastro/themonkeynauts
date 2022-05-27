import { PlayersRepository } from '../../repositories/implementations/PlayersRepository'
import { ShowPlayerController } from './ShowPlayerController'
import { ShowPlayerBusinessLogic } from './ShowPlayerBusinessLogic'

const playersRepository = new PlayersRepository()

const showPlayerBusinessLogic = new ShowPlayerBusinessLogic(playersRepository)

const showPlayerController = new ShowPlayerController(showPlayerBusinessLogic)

export {
  showPlayerController,
}
