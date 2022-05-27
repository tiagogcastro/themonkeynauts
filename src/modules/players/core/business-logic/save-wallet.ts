
type SaveWalletRequestDTO = {
  wallet: string;
  player_id: string;
}

class SaveWalletBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute({
    player_id, 
    wallet
  }: SaveWalletRequestDTO): Promise<void> {
    const player = await this.playersRepository.findById(player_id);
    
    if (!player) {
      throw new AppError('Player does not exist', 401);
    }
    
    const players = await this.playersRepository.findAllPlayers(false);

    players.map(player => {
      if(player.wallet) {
        const matchedWallet = this.hashProvider.compareHashSync(wallet, player.wallet);

        if(matchedWallet) {
          throw new AppError('This wallet already exists', 403);
        }
      }
    })

    const hashedWallet = await this.hashProvider.generateHash(wallet);

    const playerUpdated = {
      ...player,
      wallet: hashedWallet,
      premium_pass: undefined
    } as Player

    await this.playersRepository.save(playerUpdated)
  }
}

export { SaveWalletBusinessLogic };
