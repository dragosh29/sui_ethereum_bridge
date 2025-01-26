import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { burnSuiTokens, mintSuiTokens } from "./sui";
import { mintEthereumTokens } from "./ethereum";

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
        new CustomEvent("suiTransactionSuccess", {
          detail: { type: "burn", digest: result.digest },
        })
      );
      return `Burn transaction successful! Digest: ${result.digest}`;
    } else if (result.effects?.bcs) {
      window.dispatchEvent(
        new CustomEvent("suiTransactionSuccess", {
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
export const handleMintSui = async (
  amount: number,
  mutateAsync: ReturnType<typeof useSignAndExecuteTransaction>["mutateAsync"]
) => {
  try {
    const tx = mintSuiTokens(amount);

    const result = await mutateAsync({ transaction: tx });

    if ("digest" in result) {
      window.dispatchEvent(
        new CustomEvent("suiTransactionSuccess", {
          detail: { type: "mint", digest: result.digest },
        })
      );
      return { "message": `Mint transaction successful!`, "digest": `Digest: ${result.digest}` };
    } else if (result.effects?.bcs) {
      window.dispatchEvent(
        new CustomEvent("suiTransactionSuccess", {
          detail: { type: "mint", effects: result.effects.bcs },
        })
      );
      return { "message": `Mint transaction successful!`, "digest": null, "effects": `Effects: ${result.effects.bcs}` };
    } else {
      return { "message": "Mint transaction executed successfully, but no digest available.", "digest": null };
    }
  } catch (error: any) {
    throw new Error(
      error instanceof Error
        ? `Error minting tokens: ${error.message}`
        : "An unknown error occurred"
    );
  }
};

export const handleMintEthereum = async (amount: number) => {
  const mintStatus = await mintEthereumTokens(amount);
  if(mintStatus.status === 1 && "hash" in mintStatus){
    window.dispatchEvent(
      new CustomEvent("ethTransactionSuccess", {
        detail: { type: "mint", hash: mintStatus.hash },
      })
    );
    return { "message": `Minting tokens on Ethereum successful!`, "hash": `Hash:${mintStatus.hash}` };
  }
  else if(mintStatus === 1) {
    window.dispatchEvent(
      new CustomEvent("ethTransactionSuccess", {
        detail: { type: "mint", hash: null },
      })
    );
    return { "message": "Minting tokens on Ethereum successful, but no hash available.", "hash": null };
  }
  else
    return { "message": "Minting tokens on Ethereum failed!", "hash": null };
};
