import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
const AttemptContext = createContext();

export const AttemptProvider = ({ children }) => {
  const [attempt, setAttempt] = useLocalStorage('attempt', null);

  // call this function when you want to set history attempt details
  const add = (data) => {
    setAttempt(data);
  };
  // call this function to clear attempt
  const clear = () => {
    setAttempt(null);
  };

  const value = useMemo(
    () => ({
      attempt,
      add,
      clear
    }),
    [attempt]
  );
  return <AttemptContext.Provider value={value}>{children}</AttemptContext.Provider>;
};

export const useAttempt = () => {
  return useContext(AttemptContext);
};
