import { Loading } from '@/components';
import { useAuth } from '@/hooks';
import { AppContainer } from '@/styles/global';
import { PrivateRouters } from './PrivateRouters';
import { PublicRouters } from './PublicRouters';

export function AppRoutes() {
  const { loading, tokenIsValid } = useAuth();

  if (loading) {
    return <AppContainer isLoading>{<Loading size={7.2} />}</AppContainer>;
  }

  return tokenIsValid ? <PrivateRouters /> : <PublicRouters />;
}
