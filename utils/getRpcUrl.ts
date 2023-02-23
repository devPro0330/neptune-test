import { rpcUrls } from "../config/rpcUrls";
import { getOne } from "./random";

// Used if user's wallet is not connected  or while using walletconnect
export const getNodeUrl = (networkId: number) => {
  const nodes = rpcUrls[networkId];
  return getOne(...nodes);
};
