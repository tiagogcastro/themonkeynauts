import { PlayerRole } from '@modules/players/domain/enums/player-role';

export type CreatePlayerRequestDTO = {
  email: string;
  nickname: string;
  role?: PlayerRole;
  password: string;
};
