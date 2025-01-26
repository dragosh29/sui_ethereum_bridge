import React, { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { handleBurn, handleMintSui, handleMintEthereum } from "../utils/transactionHandler";
import { burnEthereumTokens } from "../utils/ethereum";

interface TokenBridgeProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setTxOutput: React.Dispatch<React.SetStateAction<string>>;
}

const TokenBridge: React.FC<TokenBridgeProps> = ({ setStatus, setTxOutput }) => {
  const { mutateAsync } = useSignAndExecuteTransaction();
  const [sourceChain, setSourceChain] = useState<string>("Ethereum");
  const [destinationChain, setDestinationChain] = useState<string>("Sui");
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  const handleTransfer = async () => {
    setStatus("Processing...");
    setTxOutput("");
    
    try {
      if (sourceChain === "Ethereum" && destinationChain === "Sui") {
        setStatus("Burning tokens on Ethereum...");
        await burnEthereumTokens(tokenAmount);
        window.dispatchEvent(
          new CustomEvent("ethTransactionSuccess", {
            detail: { type: "burn" },
          })
        );
        setStatus("Minting tokens on Sui...");
        const mintStatus = await handleMintSui(tokenAmount, mutateAsync);
        setStatus(mintStatus.message);
        const output = mintStatus.effects ? mintStatus.effects : mintStatus.digest;
        if (output) {
          setTxOutput(output);
        }
      } else if (sourceChain === "Sui" && destinationChain === "Ethereum") {
        setStatus("Burning tokens on Sui...");
        const burnStatus = await handleBurn(tokenAmount, mutateAsync);
        setStatus(burnStatus);
        
        setStatus("Minting tokens on Ethereum...");
        const mintStatus = await handleMintEthereum(tokenAmount);
        setStatus(mintStatus.message);
        if (mintStatus.hash){
          setTxOutput(mintStatus.hash);
        }
      } else {
        throw new Error("Invalid source or destination chain.");
      }
    } catch (error: any) {
      setStatus(error.message || "An unknown error occurred");
    }
  };

  return (
    <div>
      <h2 style={bridgeStyles.title}>Token Bridge</h2>
      <div style={bridgeStyles.row}>
        <label style={bridgeStyles.label}>
          Source Chain:
          <select
            style={bridgeStyles.select}
            value={sourceChain}
            onChange={(e) => setSourceChain(e.target.value)}
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Sui">Sui</option>
          </select>
        </label>
      </div>
      <div style={bridgeStyles.row}>
        <label style={bridgeStyles.label}>
          Destination Chain:
          <select
            style={bridgeStyles.select}
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value)}
          >
            <option value="Sui">Sui</option>
            <option value="Ethereum">Ethereum</option>
          </select>
        </label>
      </div>
      <div style={bridgeStyles.row}>
        <label style={bridgeStyles.label}>
          Token Amount:
          <input
            type="number"
            style={bridgeStyles.input}
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Number(e.target.value))}
          />
        </label>
      </div>
      <button style={bridgeStyles.button} onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  );
};

const bridgeStyles = {
  container: {
    backgroundColor: "#1e1e1e",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    color: "#f0f0f0",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#00acc1",
  },
  row: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#b0bec5",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #444",
    backgroundColor: "#1e1e1e",
    color: "#f0f0f0",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #444",
    backgroundColor: "#1e1e1e",
    color: "#f0f0f0",
  },
  button: {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#00bcd4",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default TokenBridge;
