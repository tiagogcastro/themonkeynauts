import { IPlayer } from '@modules/players/domain/entities/player';

type Player = IPlayer & {
  password: undefined;
};

type Instance<T extends IPlayer> = T extends IPlayer ? Player : never;

type InstanceType = 'player';

export function instanceToInstance<T extends IPlayer>(
  instance_type: InstanceType,
  instance: T,
): Instance<T> {
  const formattedInstance = {
    player: {
      ...(instance as IPlayer),
      password: undefined,
    } as Instance<T>,
  }[instance_type];

  return formattedInstance as Instance<T>;
}
