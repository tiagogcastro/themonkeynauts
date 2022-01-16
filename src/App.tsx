import { MetaMaskProvider } from 'metamask-react';

import { AuthProvider } from './contexts';

import { AppRoutes } from './routes';

import { 
  GlobalStyle, 
} from './styles/global';

export function App() {
  return (
    <AuthProvider>
      <MetaMaskProvider>
        <AppRoutes />
        <GlobalStyle />
      </MetaMaskProvider>
    </AuthProvider>
  );
}
