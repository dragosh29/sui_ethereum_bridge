import React, { useState } from "react";
import { connectEthereumWallet } from "../utils/ethereum";
import { connectSuiWallet } from "../utils/sui";

export const WalletConnect = () => {
  const [ethAccount, setEthAccount] = useState<string | null>(null);
  const [suiAccount, setSuiAccount] = useState<string | null>(null);

  const handleEthereumConnect = async () => {
    try {
      const signer = await connectEthereumWallet();
      setEthAccount(await signer.getAddress());
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuiConnect = async () => {
    try {
      const suiAccount = await connectSuiWallet();
      setSuiAccount(suiAccount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Connect Wallets</h2>
      <button onClick={handleEthereumConnect}>
        Connect Ethereum Wallet
      </button>
      {ethAccount && <p>Ethereum Account: {ethAccount}</p>}

      <button onClick={handleSuiConnect}>Connect Sui Wallet</button>
      {suiAccount && <p>Sui Account: {suiAccount}</p>}
    </div>
  );
};
