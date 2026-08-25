import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Input } from '@/components';
import {
  PlayerType,
} from '@/services/api';

import { useAuth, useBoolean } from '@/hooks';
import { COLORS } from '@/theme';

import logo from '@/assets/images/logo.png';

import {
  Container,
  Content,
  MainContent,
  FormContainer
} from './styles';
import { ApiError } from '@/utils/apiError';

const schema = Yup.object().shape({
  nickname: Yup.string().required('This field is required'),
  email: Yup.string().required('This field is required').email('Enter a valid email address'),
  password: Yup.string().required('This field is required'),
});

export function Register() {
  const { register: registerPlayer } = useAuth();
  const loadingRegister = useBoolean(false);

  const { register, handleSubmit, formState: { errors } } = useForm<PlayerType.AppRegisterParams>({
    resolver: yupResolver(schema),
  });

  async function handleRegisterPlayer(data: PlayerType.AppRegisterParams) {
    loadingRegister.changeToTrue();

    try {
      await registerPlayer(data);
    } catch(error: any) {
      loadingRegister.changeToFalse();

      const apiErrorResponse = ApiError(error);

      apiErrorResponse.messages.map(message => {
        return toast(message, {
          autoClose: 5000,
          pauseOnHover: true,
          type: 'error',
          style: {
            background: COLORS.global.white_0,
            color: COLORS.global.red_0,
            fontSize: 14,
            fontFamily: 'Orbitron, sans-serif',
          }
        });
      });
    }
  }

  return (
    <Container>
      <Content>
        <MainContent>
          <img src={logo} alt="App Logo" className="app_logo"/>
          <FormContainer onSubmit={handleSubmit(handleRegisterPlayer)}>
            <h1 className="page_title">Sign up</h1>
            <div className="inputs">
              <Input
                labelText="Nickname"
                placeholder="Nickname..."
                type="text"
                error={errors.nickname?.message}
                registration={register('nickname')}
              />
              <Input
                labelText="E-mail"
                placeholder="E-mail..."
                type="text"
                error={errors.email?.message}
                registration={register('email')}
              />
              <Input
                labelText="Password"
                placeholder="Password..."
                type="password"
                error={errors.password?.message}
                registration={register('password')}
              />
            </div>
            <Button
              className="button_submit"
              type="submit"
              text="Sign up"
              loading={{
                state: loadingRegister.state,
              }}
            />

            <footer>
              <span className="to_login">
                Already have an account?
                <Link to="/login">Login</Link>
              </span>

              <span className="app_name">The Monkeynauts</span>
            </footer>
          </FormContainer>
        </MainContent>
      </Content>
    </Container>
  );
}
