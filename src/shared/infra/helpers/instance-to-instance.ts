import { Player } from '@modules/players/domain/entities/player';

type _Player = Player & {
  password: undefined;
};

type Instance<T extends Player> = T extends Player ? _Player : never;

type InstanceType = 'player';

export function instanceToInstance<T extends Player>(
  instance_type: InstanceType,
  instance: T,
): Instance<T> {
  const instanceFormatted = {
    player: {
      ...(instance as Player),
      password: undefined,
    } as Instance<T>,
  }[instance_type];

  return instanceFormatted as Instance<T>;
}
