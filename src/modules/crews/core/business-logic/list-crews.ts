import { ICrew } from '@modules/crews/domain/entities/crew';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { AppError } from '@shared/errors/app-error';
import { app } from '@shared/infra/http/app';
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

    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,
  ) {}

  async execute({ monkeynautId }: ListCrewsRequest): Promise<ICrew> {
    const foundMonkeynaut = await this.monkeynautsRepository.findById(
      monkeynautId,
    );

    if (!foundMonkeynaut) {
      throw new AppError('Monkeynaut does not exist', 404);
    }

    const crew = await this.crewsRepository.findUniqueByMonkeynautId(
      monkeynautId,
    );

    return crew;
  }
}

export { ListCrewsBusinessLogic };
