import { ConnectorNames } from "../config/connectors";
import * as binanceWalletUtils from "./binanceWallet";
import * as metamaskUtils from "./metamask";

export const setupNetwork = async (connectorName: string, selectedChainId: number) => {
  if (!selectedChainId) {
    return false;
  }

  switch (connectorName) {
    case ConnectorNames.BSC:
      return binanceWalletUtils.setupNetwork(selectedChainId);

    case ConnectorNames.Injected:
      return metamaskUtils.setupNetwork(selectedChainId);
  }

  return false;
};

declare var window: any
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: string,
  tokenImage: string
) => {
  if (!window.ethereum) {
    return false;
  }

  return window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  });
};
