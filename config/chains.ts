import { rpcUrls } from "./rpcUrls";

/**
 *
 * interface AddEthereumChainParameter {
 *   chainId: string; // A 0x-prefixed hexadecimal string
 *   chainName: string;
 *   nativeCurrency: {
 *     name: string;
 *     symbol: string; // 2-6 characters long
 *     decimals: 18;
 *   };
 *   rpcUrls: string[];
 *   blockExplorerUrls?: string[];
 *   iconUrls?: string[]; // Currently ignored.
 * }
 *
 */
// Update according to https://github.com/ethereum-lists/chains
// Should strictly follow interface AddEthereumChainParameter (no additional keys can be added)
export const chains = [
  {
    chainId: `0x${(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: rpcUrls[56],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  {
    chainId: `0x${(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: rpcUrls[97],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  {
    chainId: `0x${(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: rpcUrls[137],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  {
    chainId: `0x${(80001).toString(16)}`,
    chainName: "Polygon Testnet Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: rpcUrls[80001],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  {
    chainId: `0x${(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: rpcUrls[1],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  {
    chainId: `0x${(3).toString(16)}`,
    chainName: "Ropsten Testnet",
    nativeCurrency: {
      name: "Ropsten Ether",
      symbol: "ROP",
      decimals: 18,
    },
    rpcUrls: rpcUrls[3],
    blockExplorerUrls: ["https://ropsten.etherscan.io/"],
  },
  {
    chainId: `0x${(42).toString(16)}`,
    chainName: "Kovan Testnet",
    nativeCurrency: {
      name: "Kovan Ether",
      symbol: "KOV",
      decimals: 18,
    },
    rpcUrls: rpcUrls[42],
    blockExplorerUrls: ["https://kovan.etherscan.io/"],
  },
];
type NetworkNames = {
  [key: number]: string
}

export const NetworkNames: NetworkNames = {
  56: "BSC Mainnet",
  97: "BSC Testnet",
  137: "Polygon Mainnet",
  80001: "Polygon Testnet Mumbai",
  1: "Ethereum Mainnet",
  3: "Ropsten Testnet",
  42: "Kovan Testnet",
};

export const explorer = {
  address: {
    56: "https://bscscan.com/address/%s",
    97: "https://testnet.bscscan.com/address/%s",
    3: "https://ropsten.etherscan.io/address/%s",
    42: "https://kovan.etherscan.io/address/%s",
    1: "https://etherscan.io/address/%s",
    80001: "https://mumbai.polygonscan.com/address/%s",
    137: "https://polygonscan.com/address/%s",
  },
  tx: {
    56: "https://bscscan.com/tx/%s",
    97: "https://testnet.bscscan.com/tx/%s",
    3: "https://ropsten.etherscan.io/tx/%s",
    42: "https://kovan.etherscan.io/tx/%s",
    1: "https://etherscan.io/tx/%s",
    80001: "https://mumbai.polygonscan.com/tx/%s",
    137: "https://polygonscan.com/tx/%s",
  },
  block: {
    56: "https://bscscan.com/block/%s",
    97: "https://testnet.bscscan.com/block/%s",
    3: "https://ropsten.etherscan.io/block/%s",
    42: "https://kovan.etherscan.io/block/%s",
    1: "https://etherscan.io/block/%s",
    80001: "https://mumbai.polygonscan.com/block/%s",
    137: "https://polygonscan.com/block/%s",
  },
};
