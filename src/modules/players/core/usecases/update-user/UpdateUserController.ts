import { Request, Response } from 'express';
import { instanceToInstance } from '../../../../shared/helpers/instanceToInstance';
import { UpdatePlayerBusinessLogic } from './UpdatePlayerBusinessLogic'

class UpdatePlayerController {
    constructor(private updatePlayerBusinessLogic: UpdatePlayerBusinessLogic) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const player_id = request.player.id;

    const { 
      nickname, 
      new_password,
      new_password_confirmation,
      old_password,
      role,
    } = request.body;

    const { player } = await this.updatePlayerBusinessLogic.execute({
      player_id,
      nickname,
      new_password,
      new_password_confirmation,
      old_password,
      role
    });

    return response.status(200).json({
      player: instanceToInstance('player', player)
    });
  }
}

export { UpdatePlayerController };
