import Cookies from "js-cookie";
import { createContext, ReactNode, useState } from "react";


interface AuthContectType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContectType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [accessToken, setAccessToken] = useState<string | null>(
    Cookies.get("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    Cookies.get("refresh_token") || null
  );

  const login = (access_token: string, refresh_token: string) => {
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setRefreshToken(null);
    setAccessToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

