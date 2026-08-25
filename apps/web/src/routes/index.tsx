import { Loading } from '@/components';
import { useAuth } from '@/hooks';
import { AppContainer } from '@/styles/global';
import { PrivateRouters } from './PrivateRouters';
import { PublicRouters } from './PublicRouters';



export function AppRoutes() {
  const { loading, tokenIsValid } = useAuth();

  return (
    <AppContainer isLoading={loading}>
      {loading ? (
        <Loading size={7.2} />
      ) : (
        <>
          {tokenIsValid 
            ? <PrivateRouters /> 
            : <PublicRouters />
          }
        </>
      )}
    </AppContainer>
  );
}