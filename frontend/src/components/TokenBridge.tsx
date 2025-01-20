import React, { useState } from "react";

export const TokenBridge = () => {
  const [amount, setAmount] = useState("");
  const [sourceChain, setSourceChain] = useState("Ethereum");
  const [destinationChain, setDestinationChain] = useState("Sui");

  const handleBridge = async () => {
    console.log(`Bridging ${amount} IBT from ${sourceChain} to ${destinationChain}`);
    // Add logic to burn tokens on source chain and mint on destination chain
  };

  return (
    <div>
      <h2>Bridge IBT Tokens</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={sourceChain} onChange={(e) => setSourceChain(e.target.value)}>
        <option value="Ethereum">Ethereum</option>
        <option value="Sui">Sui</option>
      </select>
      <select value={destinationChain} onChange={(e) => setDestinationChain(e.target.value)}>
        <option value="Sui">Sui</option>
        <option value="Ethereum">Ethereum</option>
      </select>
      <button onClick={handleBridge}>Bridge Tokens</button>
    </div>
  );
};
