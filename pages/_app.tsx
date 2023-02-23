import "@material-tailwind/react/tailwind.css";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/web3";
import { AppProvider } from "../context/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Web3ReactProvider>
  );
}

export default MyApp
