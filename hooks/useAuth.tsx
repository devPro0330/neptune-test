import { useCallback, useEffect } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import { ACTIVE_CONNECTOR_KEY } from "../config/localstorage";
import { getConnectorByName } from "../utils/connectors";
import { wallets } from "../config/wallets";
import { setupNetwork } from "../utils/wallet";
import * as walletConnectUtils from "../utils/walletConnect";
import * as notifications from "../utils/notifications";

const handleInjectedError = async (notify: any, error: any) => {
  const { NoEthereumProviderError, UserRejectedRequestErrorInjected } =
    await import("../connectors/injected/errors");

  if (error instanceof NoEthereumProviderError) {
    return notifications.providerError(notify, error);
  }

  if (error instanceof UserRejectedRequestErrorInjected) {
    return notifications.authError(notify, error);
  }

  notifications.unidentifiedError(notify, error);
};

const clearConnectionData = () => {
  window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
};

const activateConnector = async (
  connectorName: string,
  activate: any,
  networkId: any,
  notify: any
) => {
  const connector = await getConnectorByName(connectorName, networkId);

  if (!connector) {
    console.info("Invalid Connector Name", connectorName);
    return;
  }

  window.localStorage.setItem(ACTIVE_CONNECTOR_KEY, connectorName);

  activate(connector, async (error: UnsupportedChainIdError) => {
    if (error instanceof UnsupportedChainIdError) {
      const hasSetup = await setupNetwork(connectorName, networkId);

      if (hasSetup) {
        return activate(connector, clearConnectionData);
      }

      clearConnectionData();

      const wallet = wallets.find(
        (_wallet) => _wallet.connectorName === connectorName
      );

      return notifications.wrongNetwork(
        notify,
        error
      );
    }

    clearConnectionData();

    handleInjectedError(notify, error);

    notifications.unidentifiedError(notify, error);
  });
};

const useAuth = (networkId: number, notify = console.log) => {
  const { activate, deactivate, connector } = useWeb3React();

  useEffect(() => {
    if (!connector) {
      return;
    }

    connector?.addListener("Web3ReactDeactivate", clearConnectionData);
    return () => {
      connector?.removeListener("Web3ReactDeactivate", clearConnectionData);
    };
  }, [connector]);

  const login = useCallback(
    (connectorName) =>
      activateConnector(connectorName, activate, networkId, notify),
    [activate, networkId, notify]
  );

  const logout = useCallback(() => {
    clearConnectionData();

    deactivate();
    walletConnectUtils.disconnect();
  }, [deactivate]);

  return { logout, login };
};

export default useAuth;
