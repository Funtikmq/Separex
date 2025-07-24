import { createContext, useContext } from "react";
import { useDoorsLogic } from "../pages/configurator/hooks/useDoorsLogic";

const DoorsContext = createContext(null);

export const DoorsProvider = ({ children }) => {
  const doorLogic = useDoorsLogic();
  return (
    <DoorsContext.Provider value={doorLogic}>{children}</DoorsContext.Provider>
  );
};

export const useDoorsContext = () => {
  return useContext(DoorsContext);
};
