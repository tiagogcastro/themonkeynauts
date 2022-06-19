import { AsyncMaybe } from '@shared/types/maybe';
import { ICrew } from '../entities/crew';

interface ICrewsRepository {
  create(crew: ICrew): Promise<void>;

  save(crew: ICrew): Promise<void>;
  update(crew: ICrew): Promise<void>;
  destroy(crewId: string): Promise<void>;

  findById(crewId: string): AsyncMaybe<ICrew>;
  findMany(): Promise<ICrew[]>;
  findUniqueByMonkeynautId(monkeynautId: string): Promise<ICrew | null>;
}
export { ICrewsRepository };
