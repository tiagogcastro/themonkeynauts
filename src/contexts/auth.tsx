import { useBoolean } from '@/hooks';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { replaceToShortString } from '@/utils/replaceToShortString';

import { COLORS } from '@/theme';

import {
  PlayerType,
  api,
  monkeynautsApiToken,
  baseApi
} from '../services/api';

export type AuthContextData = {
  signIn: (credentials: PlayerType.AppLoginParams) => Promise<PlayerType.AppLoginResponse | undefined>;
  register: (credentials: PlayerType.AppRegisterParams) => Promise<PlayerType.AppRegisterResponse | undefined>;
  signOut: () => void;

  player: PlayerType.GetPlayer | null;
  token: string | null;
  tokenIsValid: boolean;
  loading: boolean;

  setPlayer: React.Dispatch<React.SetStateAction<PlayerType.GetPlayer | null>>;
  getPlayer: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export type AuthProviderProps = {
  children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [player, setPlayer] = useState<PlayerType.GetPlayer | null>(null);
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

  async function getPlayer() {
    try {
      const response = await api.player.geral.getPlayer();
      
      let { player } = response.data;
      
      setPlayer({
        player: {
          ...player,
          id_short: player.id.replace(/^(\w{3}).*(\w{3})$/, '$1...$2')
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

    getPlayer();
   
  }, []);

  async function signIn(credentials: PlayerType.AppLoginParams): Promise<PlayerType.AppLoginResponse | undefined> {
    const response = await api.player.geral.authenticate.app_login(credentials);

    const { token: { payload: token } } = response.data;

    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    sessionStorage.setItem(monkeynautsApiToken, token);
    tokenIsValid.changeToTrue();
    setToken(token);

    getPlayer();

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

  async function register(credentials: PlayerType.AppRegisterParams): Promise<PlayerType.AppRegisterResponse | undefined> {
    const response = await api.player.geral.register(credentials);

    const { player, token: { payload: token } } = response.data;

    localStorage.setItem(monkeynautsApiToken, token);
    
    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    tokenIsValid.changeToTrue();
    setToken(token);
    setPlayer({
      player: {
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
        player,
        
        getPlayer,
        setPlayer,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}