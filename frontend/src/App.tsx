import React from "react";
import { WalletConnect } from "./components/WalletConnect";
import { TokenBridge } from "./components/TokenBridge";

const App = () => {
  return (
    <div>
      <h1>Ethereum-Sui Bridge</h1>
      <WalletConnect />
      <TokenBridge />
    </div>
  );
};

export default App;
