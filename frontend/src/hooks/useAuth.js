import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_USER_SVC_AUTH } from '../configs';
import { STATUS_CODE_OK, STATUS_CODE_UNAUTH } from '../constants';
import { useLocalStorage } from './useLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [isAuth, setAuthStatus] = useState(false);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const checkAuth = async (user) => {
    const res = await axios
      .post(URL_USER_SVC_AUTH, { user }, { withCredentials: true })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_UNAUTH) {
          logout();
        }
        setAuthStatus(false);
      });
    if (res && res.status === STATUS_CODE_OK) {
      setAuthStatus(true);
    }
  };

  const login = async (data) => {
    setUser(data);
    document.cookie = 'token=' + data.token;
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate('/welcome/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      checkAuth,
      login,
      logout
    }),
    [user, isAuth]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
