import React, { useEffect, useState } from "react";
import SuiQuery from "./SuiQuery";
import EthereumQuery from "./EthereumQuery";
import TokenBridge from "./TokenBridge";

const TokenDashboard: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [txOutput, setTxOutput] = useState<string>("");

  const outputPar = txOutput ? <p>{txOutput}</p> : null;

  return (
    <div style={dashboardStyles.container}>
      {/* Main Content */}
      <div style={dashboardStyles.mainContent}>
        {/* Left Column: Blockchain Data */}
        <div style={dashboardStyles.leftColumn}>
          <h2 style={dashboardStyles.sectionTitle}>Blockchain Data</h2>
          <div style={dashboardStyles.dataContainer}>
            <div style={dashboardStyles.block}>
              <h3 style={dashboardStyles.subtitle}>Sui Data</h3>
              <SuiQuery owner={import.meta.env.VITE_SUI_USER_ADDRESS || ""} />
            </div>
            <div style={dashboardStyles.block}>
              <h3 style={dashboardStyles.subtitle}>Ethereum Data</h3>
              <EthereumQuery />
            </div>
          </div>
        </div>

        {/* Right Column: Token Bridge */}
        <div style={dashboardStyles.rightColumn}>
          <div style={dashboardStyles.block}>
            <TokenBridge setStatus={setStatus} setTxOutput={setTxOutput} />
          </div>
          <div style={dashboardStyles.statusBlock}>
            <h2 style={dashboardStyles.statusTitle}>Status</h2>
            <p>{status}</p>
            {outputPar}
          </div>
        </div>
      </div>
    </div>
  );
};

export const dashboardStyles = {
  container: {
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#121212",
    color: "#f0f0f0",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "100%",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "space-between",
  },
  mainContent: {
    display: "flex",
    flex: "1",
    gap: "1rem",
  },
  leftColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
  },
  rightColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    color: "#00acc1",
    marginBottom: "1rem",
    textAlign: "center" as "center",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "1rem",
  },
  block: {
    backgroundColor: "#1e1e1e",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
  statusBlock: {
    backgroundColor: "#1e1e1e",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    marginTop: "1rem",
  },
  statusTitle: {
    fontSize: "1.25rem",
    color: "#00acc1",
    marginBottom: "1rem",
    textAlign: "left" as "left",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "#00acc1",
    marginBottom: "0.5rem",
  },
};

export default TokenDashboard;
