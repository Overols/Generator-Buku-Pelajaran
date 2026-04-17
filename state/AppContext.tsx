
import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';
import { appReducer, Action } from './appReducer';
import { getInitialState, DEFAULT_STATE } from './initialState';
import { State } from '../models/StateTypes';

interface AppContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, DEFAULT_STATE, getInitialState);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
