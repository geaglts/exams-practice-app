import { createContext } from "react";
import { useInitialState, initialState } from "../hooks/useInitialState";

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const state = useInitialState();

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
}
