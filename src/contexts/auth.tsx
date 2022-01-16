import { useBoolean } from '@/hooks';
import { createContext, useEffect, useState } from 'react';

import {
  UserType,
  api,
  monkeynautsApiToken,
  baseApi
} from '../services/api';

export type AuthContextData = {
  signIn: (credentials: UserType.AppLoginParams) => Promise<UserType.AppLoginResponse | undefined>;
  register: (credentials: UserType.AppRegisterParams) => Promise<UserType.AppRegisterResponse | undefined>;

  user: UserType.GetUser | null;
  token: string | null;
  tokenIsValid: boolean;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export type AuthProviderProps = {
  children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserType.GetUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(monkeynautsApiToken));

  const tokenIsValid = useBoolean(true);
  const loading = useBoolean(true);

  function signOut() {
    tokenIsValid.changeToFalse();
    loading.changeToFalse();
    setToken(null);
    localStorage.removeItem(monkeynautsApiToken);

    baseApi.defaults.headers.common['Authorization'] = ``;
  }

  async function getUser() {
    try {
      const response = await api.user.geral.getUser();

      setUser(response.data);

      loading.changeToFalse();
      
      tokenIsValid.changeToTrue();
    } catch(err) {
      return signOut();
    }
  }

  useEffect(() => {
    if(!token) {
      return signOut();
    }

    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    getUser();
   
  }, []);

  async function signIn(credentials: UserType.AppLoginParams): Promise<UserType.AppLoginResponse | undefined> {
    const response = await api.user.geral.authenticate.app_login(credentials);

    const { token } = response.data;

    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    localStorage.setItem(monkeynautsApiToken, token);
    tokenIsValid.changeToTrue();
    setToken(token);

    getUser();

    return response.data || undefined;
  }

  async function register(credentials: UserType.AppRegisterParams): Promise<UserType.AppRegisterResponse | undefined> {
    const response = await api.user.geral.register(credentials);

    const { player, token } = response.data;

    localStorage.setItem(monkeynautsApiToken, token);
    
    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    tokenIsValid.changeToTrue();
    setToken(token);
    setUser({
      user: player
    });

    return response.data || undefined;
  }

  return (
    <AuthContext.Provider 
      value={{
        signIn, 
        register,
        token,
        tokenIsValid: tokenIsValid.state,
        loading: loading.state,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}