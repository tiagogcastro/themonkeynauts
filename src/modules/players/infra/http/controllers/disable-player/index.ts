
const playersRepository = new PlayersRepository()

const disablePlayerBusinessLogic = new DisablePlayerBusinessLogic(playersRepository)

const disablePlayerController = new DisablePlayerController(disablePlayerBusinessLogic)

export {
  disablePlayerController,
}