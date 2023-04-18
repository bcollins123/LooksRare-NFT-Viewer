import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

// import ChakraProvider to use chakra-ui
import { ChakraProvider } from "@chakra-ui/react";

// import theme
import { theme } from "../theme";

// import SEO component
import { SEO } from "@/components/SEO";

import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { AppLayout } from "@/layout/AppLayout";
import { QueryClient, QueryClientProvider } from "react-query";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <QueryClientProvider client={queryClient}>
          <SEO />
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </QueryClientProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
