import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
const AttemptContext = createContext();

export const AttemptProvider = ({ children }) => {
  const [attempt, setAttempt] = useLocalStorage('attempt', null);

  // call this function when you want to set history attempt id and details
  const add = (id, data) => {
    if (attempt === null) {
      setAttempt({ [id]: data });
    } else {
      setAttempt({ ...attempt, [id]: data });
    }
  };

  // call this function to clear attempt
  const clear = () => {
    setAttempt(null);
    localStorage.clear();
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
