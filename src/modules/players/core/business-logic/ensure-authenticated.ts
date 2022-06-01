import { inject, injectable } from 'tsyringe';

import { PlayerAuth } from '@modules/players/domain/entities/player-auth';

import { AppError } from '@shared/errors/app-error';

import { IAppPlayerAuthRepository } from '@modules/players/domain/repositories/app-player-auth-repository';
import { ITokenProvider } from '@shared/domain/providers/token-provider';
import { IDateProvider } from '@shared/domain/providers/date-provider';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';

type EnsureAuthenticatedRequestDTO = {
  authorization: string;
};

type TokenPayload = PlayerAuth & {
  exp: number;
  iat: number;
};

type EnsureAuthenticatedResponse = {
  decoded: TokenPayload;
};

@injectable()
export class EnsureAuthenticatedBusinessLogic {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('PlayersRepository')
    private playerRepository: IPlayersRepository,

    @inject('AppPlayerAuthRepository')
    private appPlayerAuthRepository: IAppPlayerAuthRepository,
  ) {}

  async execute({
    authorization,
  }: EnsureAuthenticatedRequestDTO): Promise<EnsureAuthenticatedResponse> {
    if (!authorization) {
      throw new AppError('Token is missing', 401);
    }

    if (typeof authorization !== 'string') {
      throw new AppError('Authorization token must be of type string', 401);
    }

    const [, token] = authorization.split(' ');

    let decoded: TokenPayload;

    try {
      decoded = this.tokenProvider.verify<TokenPayload>(token);
    } catch (error: any) {
      throw new AppError('Token is not valid', 401);
    }

    const { id, playerId, updatedAt, expireIn, isValidToken } = decoded;

    const foundPlayer = await this.playerRepository.findById(playerId);

    if(!foundPlayer?.enabled) {
      throw new AppError('User does not have an activated account', 403);
    }

    const foundPlayerAuth = await this.appPlayerAuthRepository.findById(id);

    if (!foundPlayerAuth) {
      throw new AppError('User does not logged', 403);
    }

    const foundPlayerAuthPayload =
      await this.appPlayerAuthRepository.findUniqueByPayload(token);

    if (!foundPlayerAuthPayload) {
      throw new AppError('Token not found', 401);
    }

    const verifyIsValidToken =
      await this.appPlayerAuthRepository.verifyIsValidToken(token);

    if (!verifyIsValidToken || !isValidToken) {
      throw new AppError('Token is not valid', 401);
    }

    const isValidAuthDate = this.dateProvider.isAfter(expireIn, updatedAt);

    if (!isValidAuthDate) {
      throw new AppError('Token expired', 401);
    }

    return {
      decoded,
    };
  }
}
