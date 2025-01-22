import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { burnSuiTokens, mintSuiTokens } from "./sui";


// Burn tokens on the Sui blockchain
export const handleBurn = async (
  amount: number,
  mutateAsync: ReturnType<typeof useSignAndExecuteTransaction>["mutateAsync"]
) => {
  try {
    const tx = await burnSuiTokens(amount);

    const result = await mutateAsync({ transaction: tx });

    if ("digest" in result) {
      window.dispatchEvent(
        new CustomEvent("transactionSuccess", {
          detail: { type: "burn", digest: result.digest },
        })
      );
      return `Burn transaction successful! Digest: ${result.digest}`;
    } else if (result.effects?.bcs) {
      window.dispatchEvent(
        new CustomEvent("transactionSuccess", {
          detail: { type: "burn", effects: result.effects.bcs },
        })
      );
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
    const tx = mintSuiTokens(amount);

    const result = await mutateAsync({ transaction: tx });

    if ("digest" in result) {
      window.dispatchEvent(
        new CustomEvent("transactionSuccess", {
          detail: { type: "mint", digest: result.digest },
        })
      );
      return `Mint transaction successful! Digest: ${result.digest}`;
    } else if (result.effects?.bcs) {
      window.dispatchEvent(
        new CustomEvent("transactionSuccess", {
          detail: { type: "mint", effects: result.effects.bcs },
        })
      );
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
