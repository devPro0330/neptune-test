import React from "react";

import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { networkId } from "../config/environment";
import { useNotifier } from "../hooks/useNotifier";

const AppContext = React.createContext({});

export const AppProvider = ({ children } : any) => {
  const { notifier } = useNotifier();

  useEagerConnect({networkId, notifier});
  useInactiveListener({networkId, notifier});

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
