import { SignInController } from './SignInPlayerController';
import { SignInBusinessLogic } from './SignInPlayerBusinessLogic';
import { JWTokenProvider } from '../../../../shared/providers/implementations/JWTokenProvider';
import { PlayersRepository } from '../../repositories/implementations/PlayersRepository';
import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider';

const jwtTokenProvider = new JWTokenProvider();
const bcryptHashProvider = new BCryptHashProvider();
const playersRepository = new PlayersRepository();

const signInBusinessLogic = new SignInBusinessLogic(
  playersRepository, 
  jwtTokenProvider, 
  bcryptHashProvider
);

const signInController = new SignInController(signInBusinessLogic);

export {
  signInController,
  signInBusinessLogic,
}