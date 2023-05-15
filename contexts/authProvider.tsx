import { Dispatch, FC, SetStateAction, createContext, useState } from 'react';

export type Auth = {
  accessToken?: string;
  user?: {
    id: string;
    username: string;
  };
};

const AuthContext = createContext<{
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider: FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
