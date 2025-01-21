import React, { useEffect, useState } from "react";
import { BrowserProvider, formatUnits } from "ethers";

const EthereumQuery: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Loading...");

  // Load Ethereum data
  useEffect(() => {
    const fetchEthereumData = async () => {
      try {
        if (!window.ethereum) {
          setStatus("Ethereum provider not found.");
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setAccount(address);
        setStatus("Connected");

        // Fetch ETH balance
        const rawBalance = await provider.getBalance(address);
        setBalance(formatUnits(rawBalance, 18)); // Convert from wei to ETH
      } catch (error: any) {
        setStatus(error.message || "Error fetching Ethereum data.");
      }
    };

    fetchEthereumData();
  }, []);

  if (!account) {
    return <div>{status}</div>;
  }

  return (
    <div>
      <h2>Ethereum Account</h2>
      <p>Address: {account}</p>
      <p>Balance: {balance} ETH</p>
    </div>
  );
};

export default EthereumQuery;
