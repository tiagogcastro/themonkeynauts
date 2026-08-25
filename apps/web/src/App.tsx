import { MetaMaskProvider } from 'metamask-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts';

import { AppRoutes } from './routes';

import { 
  GlobalStyle, 
} from './styles/global';

export function App() {
  return (
    <AuthProvider>
      <MetaMaskProvider>
        <ToastContainer />
        <AppRoutes />
        <GlobalStyle />
      </MetaMaskProvider>
    </AuthProvider>
  );
}
