
const playersRepository = new PlayersRepository()
const playerTokensRepository = new PlayerTokensRepository()
const bcryptHashProvider = new BCryptHashProvider()


const resetPasswordBusinessLogic = new ResetPasswordBusinessLogic(playersRepository, playerTokensRepository, bcryptHashProvider)

const resetPasswordController = new ResetPasswordController(resetPasswordBusinessLogic)

export {
    resetPasswordController,
}

