import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface StateUserAuthenticate {
  // dados do estado de autentiação
  token: string;
  user: object;
}

interface SignInCredentials {
  // dados das credenciais de login
  email: string;
  password: string;
}

interface AuthContextData {
  // dados do contexto
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); // criando contexto vazio

/**
 * Isola o provider do contexto recebendo o componente filho que vai
 * utilizar as informações do contexto passadas no value
 */
const AuthProvider: React.FC = ({ children }) => {
  const [dataUserAuthenticate, setDataUserAuthenticate] = useState<
    StateUserAuthenticate
  >({} as StateUserAuthenticate); // estado que vai armazenar os dados do usuário logado

  const [loading, setLoading] = useState(true); // estado que vai setar o loading no momento do login

  // carrega os dados do usuário salvos no async storage
  useEffect(() => {
    async function loadStorageUserAuthenticate(): Promise<void> {
      // const token = await AsyncStorage.getItem('@Todolist:token');
      // const user = await AsyncStorage.getItem('@Todolist:user');

      const [token, user] = await AsyncStorage.multiGet([
        '@Todolist:token',
        '@Todolist:user',
      ]);

      if (token[1] && user[1]) {
        /**
         * envia automaticamente o token a cada requisição
         */
        api.defaults.headers.Authorization = `Bearer ${token[1]}`;
        setDataUserAuthenticate({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageUserAuthenticate();
  }, []);

  // método de login recebendo as credenciais de acesso e salvando no async storage
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    // await AsyncStorage.setItem('@Todolist:token', token);
    // await AsyncStorage.setItem('@Todolist:user', JSON.stringify(user));

    /**
     * envia automaticamente o token a cada requisição
     */
    api.defaults.headers.Authorization = `Bearer ${token[1]}`;

    await AsyncStorage.multiSet([
      ['@Todolist:token', token],
      ['@Todolist:user', JSON.stringify(user)],
    ]);

    setDataUserAuthenticate({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    // await AsyncStorage.removeItem('@Todolist:token');
    // await AsyncStorage.removeItem('@Todolist:user');

    await AsyncStorage.multiRemove(['@Todolist:token', '@Todolist:user']);

    setDataUserAuthenticate({} as StateUserAuthenticate);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: dataUserAuthenticate,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook de autenticação p/ simplificar a utilização do contexto
function useAuth(): AuthContextData {
  const context = useContext(AuthContext); // recebe o contexto criado, se não existir entao o componente nao tá em volta do provider

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
