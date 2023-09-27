import "./App.css";
import Router from "./Router";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserData";
import { FloatingWhatsApp } from "react-floating-whatsapp";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];
const projectId = "5e2fff502b10d47d6246081d08b5bbab";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  return (
    <>
      <FloatingWhatsApp
        accountName="Voting Secured By Chains"
        phoneNumber="2348060826547"
      />
      <WagmiConfig config={wagmiConfig}>
        <UserProvider>
          <Router /> <Toaster />
        </UserProvider>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
