import { POLLING_INTERVAL } from "../config/connectors";
import { getNodeUrl } from "./getRpcUrl";
import { ExternalProvider, JsonRpcFetchFunc, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";

// Fallback Provider
export const getProvider = (networkId: number) => {
  const rpcUrl = getNodeUrl(networkId);
  const library = new JsonRpcProvider(rpcUrl);

  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

// Used if wallet is connected
export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider);

  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const getSigner = (library: any, account: string) => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (library: any, account: string, networkId: number) => {
  if (!library) {
    library = getProvider(networkId);
  }

  if (!account) {
    return library;
  }

  return getSigner(library, account);
};
