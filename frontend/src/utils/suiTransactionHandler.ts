import { SuiClient } from "@mysten/sui/client";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { burnSuiTokens, mintSuiTokens } from "./sui";

const suiClient = new SuiClient({
    url: import.meta.env.VITE_SUI_URL || "",
  });

  const contractAddress = import.meta.env.VITE_SUI_CONTRACT_ADDRESS || "";
  const bridgeAdminObjectId = import.meta.env.VITE_SUI_BRIDGE_ADMIN_OBJECT_ID || "";
  const userAddress = import.meta.env.VITE_SUI_USER_ADDRESS || "";

// Burn tokens on the Sui blockchain
export const handleBurn = async (
  amount: number,
  mutateAsync: ReturnType<typeof useSignAndExecuteTransaction>["mutateAsync"]
) => {
  try {
    const tx = await burnSuiTokens(
      amount,
      contractAddress,
      suiClient,
      userAddress,
      bridgeAdminObjectId
    );

    const result = await mutateAsync({ transaction: tx });

    if ("digest" in result) {
      return `Burn transaction successful! Digest: ${result.digest}`;
    } else if (result.effects?.bcs) {
      return `Burn transaction successful! Effects: ${result.effects.bcs}`;
    } else {
      return "Burn transaction executed successfully, but no digest available.";
    }
  } catch (error: any) {
    throw new Error(
      error instanceof Error
        ? `Error burning tokens: ${error.message}`
        : "An unknown error occurred"
    );
  }
};

// Mint tokens on the Sui blockchain
export const handleMint = async (
  amount: number,
  mutateAsync: ReturnType<typeof useSignAndExecuteTransaction>["mutateAsync"]
) => {
  try {
    const tx = mintSuiTokens(amount, contractAddress);

    const result = await mutateAsync({ transaction: tx });

    if ("digest" in result) {
      return `Mint transaction successful! Digest: ${result.digest}`;
    } else if (result.effects?.bcs) {
      return `Mint transaction successful! Effects: ${result.effects.bcs}`;
    } else {
      return "Mint transaction executed successfully, but no digest available.";
    }
  } catch (error: any) {
    throw new Error(
      error instanceof Error
        ? `Error minting tokens: ${error.message}`
        : "An unknown error occurred"
    );
  }
};
