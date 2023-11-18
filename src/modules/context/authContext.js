import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check for token in cookies and set isLogin accordingly
    const token = Cookies.get("isLogin");
    setIsLogin(token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const { isLogin, setIsLogin } = useContext(AuthContext);

  return { isLogin, setIsLogin };
};

export { AuthProvider, useAuth };
