import { chains } from "../config/chains";

const getNetworkParams = (networkId: number) => {
  return chains.find((x) => x.chainId === `0x${networkId.toString(16)}`);
};

declare var window: any
export const setupNetwork = async (networkId: number) => {
  const provider = window.ethereum;

  if (!provider) {
    console.error("Can't setup network - window.ethereum is undefined");
    return false;
  }

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: getNetworkParams(networkId)?.chainId }],
    });
    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      return addChain(networkId);
    }
    // handle other "switch" errors
    console.error(switchError);
  }

  return false;
};

export const addChain = async (networkId: number) => {
  const provider = window.ethereum;

  if (!provider) {
    console.error("Can't setup network - window.ethereum is undefined");
    return false;
  }

  try {
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [getNetworkParams(networkId)],
    });
    return true;
  } catch (addError) {
    // handle "add" error
    console.error(addError);
  }
  return false;
};
