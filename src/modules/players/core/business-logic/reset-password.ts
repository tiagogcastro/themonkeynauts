
class ResetPasswordBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
    private playerTokensRepository: IPlayerTokensRepository,
    private hashProvider: IHashProvider
  ) { }

  async execute({ token, password }: ResetPasswordRequestDTO): Promise<void> {
    const playerTokens = await this.playerTokensRepository.findByToken(token)

    if (!playerTokens) throw new AppError('Token does not exists', 401)

    const player = await this.playersRepository.findById(playerTokens.player_id)

    if (!player) throw new AppError('Player does not exists', 409)

    const amount = 2
    const limitDate = addHours(playerTokens.created_at, amount)

    if (isAfter(Date.now(), limitDate)) {
      await this.playerTokensRepository.destroy(playerTokens.id)

      throw new AppError('Token expired', 401)
    }
    
    player.password = await this.hashProvider.generateHash(password)

    await this.playersRepository.save(player)

    await this.playerTokensRepository.destroy(playerTokens.id)

  }

}

export { ResetPasswordBusinessLogic }