import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from '@mysten/sui/client';

// Burn tokens on the Sui blockchain
export const burnSuiTokens = async (
  amount: number,
  contractAddress: string,
  suiClient: SuiClient,
  userAddress: string,
  bridgeAdminObjectId: string
): Promise<Transaction> => {
  const tx = new Transaction();

  const burnAmount = tx.pure.u64(BigInt(amount));

  const coins = await suiClient.getCoins({
    owner: userAddress,
    coinType: `${contractAddress}::ibt_token::IBT`,
  });

  if (!coins || coins.data.length === 0) {
    throw new Error('No IBT coins found for this user.');
  }

  // Find the first coin that can cover the burn amount or handle splitting
  const coinToUse = coins.data.find((coin) => BigInt(coin.balance) >= BigInt(amount));

  if (!coinToUse) {
    throw new Error('No coin with sufficient balance found for the burn amount.');
  }

  // If the coin's balance is greater than the burn amount, split it
  const coinArgument =
    BigInt(coinToUse.balance) === BigInt(amount)
      ? tx.object(coinToUse.coinObjectId) // Use the coin directly if exact match
      : tx.splitCoins(tx.object(coinToUse.coinObjectId), [burnAmount]); // Split the coin

  // Call the `burn` Move function
  tx.moveCall({
    target: `${contractAddress}::ibt_token::burn`,
    arguments: [
      tx.object(bridgeAdminObjectId), // Reference to the BridgeAdmin object
      coinArgument,                  // Coin to burn (split or exact match)
      tx.gas,                        // Transaction context
    ],
  });

  return tx;
};

// Mint tokens on the Sui blockchain
export const mintSuiTokens = (amount: number, contractAddress: string): Transaction => {
  const tx = new Transaction();

  const pureAmount = tx.pure.u64(BigInt(amount));

  tx.moveCall({
    target: `${contractAddress}::ibt_token::mint`,
    arguments: [pureAmount],
  });

  return tx;
};
