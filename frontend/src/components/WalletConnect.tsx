import React, { useState } from "react";
import { connectEthereumWallet } from "../utils/ethereum";
import SuiWalletConnect from "./SuiWalletConnect";

const WalletConnect: React.FC = () => {
  const [ethereumStatus, setEthereumStatus] = useState<string>("Not Connected");

  const handleEthereumConnect = async () => {
    const result = await connectEthereumWallet();
    setEthereumStatus(result ? "Connected" : "Failed to Connect");
  };

  return (
    <div>
      <h1>Wallet Connect</h1>
      <div>
        <button onClick={handleEthereumConnect}>Connect Ethereum Wallet</button>
        <span>{ethereumStatus}</span>
      </div>
      <SuiWalletConnect />
    </div>
  );
};

export default WalletConnect;
