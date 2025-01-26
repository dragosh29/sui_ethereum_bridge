import React, { useEffect, useState } from "react";
import { BrowserProvider, formatUnits } from "ethers";
import { getEthereumIbtBalance } from "../utils/ethereum";
import { dashboardStyles } from "./TokenDashboard";

const EthereumQuery: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Loading...");
  const [refresh, setRefresh] = useState<boolean>(false);

  // Fetch Ethereum data
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

      const rawBalance = await provider.getBalance(address);
      setEthBalance(formatUnits(rawBalance, 18));

      const tokenBalance = await getEthereumIbtBalance();
      setTokenBalance(tokenBalance);

    } catch (error: any) {
      setStatus(error.message || "Error fetching Ethereum data.");
    }
  };

  // add a listener for transaction success to trigger balance refresh
  useEffect(() => {
    const handleTransactionSuccess = () => {
      fetchEthereumData();
      setRefresh((prev) => !prev);
    };

    window.addEventListener("ethTransactionSuccess", handleTransactionSuccess);

    return () => {
      window.removeEventListener("ethTransactionSuccess", handleTransactionSuccess);
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEthereumData();
  }, []);

  if (!account) {
    return <div>{status}</div>;
  }

  return (
    <div style={dashboardStyles.column}>
      <h2>Account Details</h2>
      <p><strong>Address:</strong> {account}</p>
      <p><strong>ETH Balance:</strong> {ethBalance || "0"} ETH</p>
      <p><strong>IBT_TOKEN Balance:</strong> {tokenBalance || "0"} IBT</p>
    </div>
  );
};

export default EthereumQuery;
