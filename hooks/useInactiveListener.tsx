import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ConnectorNames } from "../config/connectors";
import { ACTIVE_CONNECTOR_KEY } from "../config/localstorage";
import useAuth from "./useAuth";


interface ConnectParam {
  networkId: number;
  notifier: (notification: any) => void;
}
export function useInactiveListener({networkId, notifier}: ConnectParam) {
  const { login, logout } = useAuth(networkId, notifier);
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } : Window & any = window;

    const connectorName = window.localStorage.getItem(ACTIVE_CONNECTOR_KEY);

    if (connectorName !== ConnectorNames.Injected) {
      return;
    }

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = async (chainId: string) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        await logout();
        login(ConnectorNames.Injected);
      };
      const handleAccountsChanged = async (accounts: string) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          await logout();
          login(ConnectorNames.Injected);
        }
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, activate, login, logout]);

  useEffect(() => {
    const { BinanceChain }: Window & any = window;

    const connectorName = window.localStorage.getItem(ACTIVE_CONNECTOR_KEY);

    if (connectorName !== ConnectorNames.BSC) {
      return;
    }

    if (BinanceChain && BinanceChain.on && !active && !error) {
      const handleChainChanged = async (chainId: string) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        await logout();
        login(ConnectorNames.BSC);
      };
      const handleAccountsChanged = async (accounts: string) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          await logout();
          login(ConnectorNames.BSC);
        }
      };

      BinanceChain.on("chainChanged", handleChainChanged);
      BinanceChain.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (BinanceChain.removeListener) {
          BinanceChain.removeListener("chainChanged", handleChainChanged);
          BinanceChain.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, activate, login, logout]);
}
