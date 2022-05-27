
class SaveWalletController {
    constructor(private saveWalletBusinessLogic: SaveWalletBusinessLogic) {}

    async handle(request: Request, response: Response): Promise<Response> {
        let { wallet } = request.query;

        const player_id = request.player.id;

        await this.saveWalletBusinessLogic.execute({
            wallet: wallet as string,
            player_id,
        });

        return response.status(204).json();
    }
}

const saveWalletBusinessLogic = new SaveWalletBusinessLogic()

const saveWalletController = new SaveWalletController(saveWalletBusinessLogic);

export { SaveWalletController };
