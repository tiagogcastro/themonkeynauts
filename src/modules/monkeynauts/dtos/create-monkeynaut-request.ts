type MonkeynautClasse = 'SOLDIER' | 'ENGINEER' | 'SCIENTIST';

type MonkeynautRank = 'PRIVATE' | 'SERGEANT' | 'CAPTAIN' | 'MAJOR';

type CreateMonkeynautRequestDTO = {
  bonus: string;
  bonus_value: number;

  breed_count: number;

  class: MonkeynautClasse;
  rank: MonkeynautRank;

  energy: number;
  max_energy: number;

  health: number;
  power: number;
  resistence: number;
  speed: number;

  name: string;
  player_id: string;
};

export { CreateMonkeynautRequestDTO, MonkeynautClasse, MonkeynautRank };
