import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  auth: {
    // name? : string;
    // email? :string;
    // userId?: string;
    user?: string;
    pwd?: string;
    roles?: string[];
    accessToken?: string;
  };
  setAuth: (auth: AuthContextType['auth']) => void;
}
//
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [auth, setAuth] = useState<AuthContextType['auth']>({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;