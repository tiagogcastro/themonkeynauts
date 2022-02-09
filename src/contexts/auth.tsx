import { useBoolean } from '@/hooks';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { replaceToShortString } from '@/utils/replaceToShortString';

import { COLORS } from '@/theme';

import {
  UserType,
  api,
  monkeynautsApiToken,
  baseApi
} from '../services/api';

export type AuthContextData = {
  signIn: (credentials: UserType.AppLoginParams) => Promise<UserType.AppLoginResponse | undefined>;
  register: (credentials: UserType.AppRegisterParams) => Promise<UserType.AppRegisterResponse | undefined>;
  signOut: () => void;

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
  const [token, setToken] = useState<string | null>(sessionStorage.getItem(monkeynautsApiToken));

  const tokenIsValid = useBoolean(true);
  const loading = useBoolean(true);

  function signOut() {
    tokenIsValid.changeToFalse();
    loading.changeToFalse();
    sessionStorage.removeItem(monkeynautsApiToken);

    setToken(null);

    baseApi.defaults.headers.common['Authorization'] = ``;
  }

  async function getUser() {
    try {
      const response = await api.user.geral.getUser();
      
      let { user } = response.data;
      
      setUser({
        user: {
          ...user,
          id_short: user.id.replace(/^(\w{3}).*(\w{3})$/, '$1...$2')
        }
      });

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

    sessionStorage.setItem(monkeynautsApiToken, token);
    tokenIsValid.changeToTrue();
    setToken(token);

    getUser();

    toast('Success. You have accessed your account. Welcome back!', {
      autoClose: 5000,
      pauseOnHover: true,
      type: 'success',
      style: {
        background: COLORS.global.white_0,
        color: COLORS.global.black_0 ,
        fontSize: 14,
        fontFamily: 'Orbitron, sans-serif',
      }
    });

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
      user: {
        ...player,
        id_short: replaceToShortString(player.id)
      }
    });
    
    toast('Success! You managed to create your account. Welcome!', {
      autoClose: 5000,
      pauseOnHover: true,
      type: 'success',
      style: {
        background: COLORS.global.white_0,
        color: COLORS.global.black_0 ,
        fontSize: 14,
        fontFamily: 'Orbitron, sans-serif',
      }
    });

    return response.data || undefined;
  }

  return (
    <AuthContext.Provider 
      value={{
        signIn, 
        register,
        signOut,
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