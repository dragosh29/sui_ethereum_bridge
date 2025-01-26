import React, { useState, useEffect } from "react";
import { connectEthereumWallet } from "../utils/ethereum";
import SuiWalletConnect from "./SuiWalletConnect";

const WalletConnect: React.FC = () => {
  const [ethereumStatus, setEthereumStatus] = useState<string>("Not Connected");
  const [ethereumAddress, setEthereumAddress] = useState<string | null>(null);
  const [ethereumDropdownOpen, setEthereumDropdownOpen] = useState(false);

  useEffect(() => {
    const isConnected = localStorage.getItem("ethereumConnected") === "true";
    const address = localStorage.getItem("ethereumWalletAddress");

    if (isConnected && address) {
      setEthereumStatus("Connected");
      setEthereumAddress(address);
    }
  }, []);

  const handleEthereumConnect = async () => {
    const result = await connectEthereumWallet();
    if (result) {
      const address = localStorage.getItem("ethereumWalletAddress");
      setEthereumStatus("Connected");
      setEthereumAddress(address);
    } else {
      setEthereumStatus("Failed to Connect");
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("ethereumConnected");
    localStorage.removeItem("ethereumWalletAddress");
    setEthereumStatus("Not Connected");
    setEthereumAddress(null);
    setEthereumDropdownOpen(false);
  };

  return (
    <div>
      <h1>Wallet Connect</h1>

      {/* Ethereum Wallet Section */}
      <div style={{ marginBottom: "1rem" }}>
        <h2>Ethereum Wallet</h2>
        {ethereumAddress ? (
          <div
          style={{
            position: "relative",
            display: "inline-block",
            width: "200px",
            border: "1px solid #444",
            borderRadius: "4px",
            backgroundColor: "#222",
            color: "#fff",
            padding: "0.5rem",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => setEthereumDropdownOpen(!ethereumDropdownOpen)}
        >
          <span>
            {ethereumAddress.slice(0, 6)}...{ethereumAddress.slice(-4)} {/* Truncated address */}
          </span>
          <span style={{ marginLeft: "0.5rem" }}>▼</span>
          {ethereumDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "200px",
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "4px",
                padding: "0.5rem",
                zIndex: 1000,
              }}
            >
              <div style={{ padding: "0.5rem 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {ethereumAddress.slice(0, 10)}...{ethereumAddress.slice(-4)} {/* Truncated */}
              </div>
              <div
                style={{
                  marginTop: "0.5rem",
                  color: "red",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={handleDisconnect}
              >
                Disconnect
              </div>
            </div>
          )}
        </div>
        
        ) : (
          <button onClick={handleEthereumConnect}>Connect Ethereum Wallet</button>
        )}
      </div>

      {/* Sui Wallet Section */}
      <div>
        <SuiWalletConnect />
      </div>
    </div>
  );
};

export default WalletConnect;
