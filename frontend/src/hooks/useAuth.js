import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login', { replace: true });
  //   }
  // }, [user]);

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    document.cookie = 'token=' + data.token;
    navigate('/dashboard');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
