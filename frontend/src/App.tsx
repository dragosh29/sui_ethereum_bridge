import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider, SuiClientProvider } from "@mysten/dapp-kit";
import TokenDashboard from "./components/TokenDashboard";
import WalletConnect from "./components/WalletConnect";

const localnet = import.meta.env.VITE_SUI_URL || null;

// Define network configurations for Sui
const networks = {
  testnet: { url: "https://fullnode.testnet.sui.io" },
  mainnet: { url: "https://fullnode.mainnet.sui.io" },
  localnet: { url: localnet },
};

let prefferedNetwork = "testnet" as keyof typeof networks;
if (localnet) {
  prefferedNetwork = "localnet";
}

// Initialize the QueryClient
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork={ prefferedNetwork }>
        <WalletProvider>
          <Router>
            <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
              <header style={{ marginBottom: "1.5rem" }}>
                <h1>Token Management App</h1>
                <nav>
                  <Link to="/" style={{ marginRight: "1rem" }}>
                    Dashboard
                  </Link>
                  <Link to="/wallet-connect">Wallet Connect</Link>
                </nav>
              </header>

              <main>
                <Routes>
                  <Route path="/" element={<TokenDashboard />} />
                  <Route path="/wallet-connect" element={<WalletConnect />} />
                </Routes>
              </main>
            </div>
          </Router>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default App;
