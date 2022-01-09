import { AuthProvider } from './contexts';

import { AppRoutes } from './routes';

import { 
  GlobalStyle, 
} from './styles/global';

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <GlobalStyle />
    </AuthProvider>
  );
}
