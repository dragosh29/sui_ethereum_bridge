import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider, SuiClientProvider } from "@mysten/dapp-kit";
import TokenDashboard from "./components/TokenDashboard";
import WalletConnect from "./components/WalletConnect";

const localnet = import.meta.env.VITE_SUI_URL || null;

const networks = {
  testnet: { url: "https://fullnode.testnet.sui.io" },
  mainnet: { url: "https://fullnode.mainnet.sui.io" },
  localnet: { url: localnet },
};

let prefferedNetwork = "testnet" as keyof typeof networks;
if (localnet) {
  prefferedNetwork = "localnet";
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork={prefferedNetwork}>
        <WalletProvider>
          <Router>
            <div id="aa" style={appStyles.container}>
              <header style={appStyles.header}>
                <h1 style={appStyles.title}>Token Management App</h1>
                <nav style={appStyles.nav}>
                  <Link to="/" style={appStyles.navLink}>
                    Dashboard
                  </Link>
                  <Link to="/wallet-connect" style={appStyles.navLink}>
                    Wallet Connect
                  </Link>
                </nav>
              </header>
              <main style={appStyles.main}>
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

const appStyles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as "column",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center" as "center",
    padding: "1rem",
    backgroundColor: "#1e1e1e",
    color: "#f0f0f0",
  },
  title: {
    fontSize: "1.75rem",
    margin: 0,
  },
  nav: {
    marginTop: "0.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#00bcd4",
    fontSize: "1rem",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
    overflow: "hidden",
  },
};

export default App;
