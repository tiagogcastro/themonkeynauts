import { IPlayer } from '@modules/players/domain/entities/player';

type Player = Omit<IPlayer, 'password'>;

type Instance<T extends IPlayer> = T extends IPlayer ? Player : never;

type InstanceType = 'player';

export function instanceToInstance<T extends IPlayer>(
  instance_type: InstanceType,
  instance: T,
): Instance<T> {
  const formattedInstance = {
    player: (() => {
      const { password: _, ...props } = instance;

      return props as Player;
    })(),
  }[instance_type];

  return formattedInstance as Instance<T>;
}
