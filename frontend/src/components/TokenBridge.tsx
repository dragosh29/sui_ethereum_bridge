import React, { useState } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { handleBurn, handleMint } from "../utils/suiTransactionHandler";
import { burnEthereumTokens, mintEthereumTokens } from "../utils/ethereum";

interface TokenBridgeProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const TokenBridge: React.FC<TokenBridgeProps> = ({ setStatus }) => {
  const { mutateAsync } = useSignAndExecuteTransaction();
  const [sourceChain, setSourceChain] = useState<string>("Ethereum");
  const [destinationChain, setDestinationChain] = useState<string>("Sui");
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  const handleTransfer = async () => {
    setStatus("Processing...");

    try {
      if (sourceChain === "Ethereum" && destinationChain === "Sui") {
        // Burn on Ethereum (placeholder for Ethereum logic)
        setStatus("Burning tokens on Ethereum...");
        await burnEthereumTokens(tokenAmount);

        setStatus("Minting tokens on Sui...");
        const mintStatus = await handleMint(tokenAmount, mutateAsync);
        setStatus(mintStatus);
      } else if (sourceChain === "Sui" && destinationChain === "Ethereum") {
        setStatus("Burning tokens on Sui...");
        const burnStatus = await handleBurn(tokenAmount, mutateAsync);
        setStatus(burnStatus);

        setStatus("Minting tokens on Ethereum...");
        await mintEthereumTokens(tokenAmount);
      } else {
        throw new Error("Invalid source or destination chain.");
      }
    } catch (error: any) {
      setStatus(error.message || "An unknown error occurred");
    }
  };

  return (
    <div>
      <h1>Token Bridge</h1>
      <div>
        <label>
          Source Chain:
          <select
            value={sourceChain}
            onChange={(e) => setSourceChain(e.target.value)}
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Sui">Sui</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Destination Chain:
          <select
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value)}
          >
            <option value="Sui">Sui</option>
            <option value="Ethereum">Ethereum</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Token Amount:
          <input
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleTransfer}>Transfer</button>
      <div>{status}</div>
    </div>
  );
};

export default TokenBridge;
