import { ICrew } from '@modules/crews/domain/entities/crew';
import { inject, injectable } from 'tsyringe';
import { ICrewsRepository } from '../../domain/repositories/crews-repositories';

type ListCrewsRequest = {
  monkeynautId: string;
};

@injectable()
class ListCrewsBusinessLogic {
  constructor(
    @inject('CrewsRepository')
    private crewsRepository: ICrewsRepository,
  ) {}

  async execute({ monkeynautId }: ListCrewsRequest): Promise<ICrew[]> {
    const crews = await this.crewsRepository.findManyByMonkeynautId(
      monkeynautId,
    );

    return crews;
  }
}

export { ListCrewsBusinessLogic };
