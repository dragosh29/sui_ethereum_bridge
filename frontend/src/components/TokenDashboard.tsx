import React, { useState } from "react";
import SuiQuery from "./SuiQuery";
import EthereumQuery from "./EthereumQuery";
import TokenBridge from "./TokenBridge";

const TokenDashboard: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  return (
    <div>
      <h1>Token Dashboard</h1>

      {/* Blockchain Data Display */}
      <div>
        <h2>Blockchain Data</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1, marginRight: "1rem" }}>
            <h3>Sui Data</h3>
            <SuiQuery owner={import.meta.env.VITE_SUI_USER_ADDRESS || ""} />
          </div>
          <div style={{ flex: 1, marginLeft: "1rem" }}>
            <h3>Ethereum Data</h3>
            <EthereumQuery />
          </div>
        </div>
      </div>

      {/* Token Bridge */}
      <div>
        <h2>Token Bridge</h2>
        <TokenBridge setStatus={setStatus} />
      </div>

      {/* Status Section */}
      <div>
        <h2>Status</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default TokenDashboard;
