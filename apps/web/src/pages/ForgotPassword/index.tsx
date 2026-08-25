import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Input } from '@/components';
import { api, baseApi } from '@/services/api';
import logo from '@/assets/images/logo.png';
import {
  Container,
  Content,
  MainContent,
  FormContainer
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('This field is required').email('Enter a valid email address'),
});

type ForgotPasswordFormData = {
  email: string;
};

export function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(schema),
  });

  async function handleForgotPassword({ email }: ForgotPasswordFormData) {
    try {
      await baseApi.post('/players/forgot-password', { email });

      void api;
    } catch {
      // silent: we do not reveal whether the email exists
    }
  }

  return (
    <Container>
      <Content>
        <MainContent>
          <img src={logo} alt="App Logo" className="app_logo"/>
          <FormContainer onSubmit={handleSubmit(handleForgotPassword)}>
            <h1 className="page_title">Forgot password</h1>
            <div className="inputs">
              <Input
                labelText="E-mail"
                placeholder="E-mail..."
                type="text"
                error={errors.email?.message}
                registration={register('email')}
              />
            </div>
            <Button
              className="button_submit"
              type="submit"
              text="Forgot password"
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
