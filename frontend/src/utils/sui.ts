import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from '@mysten/sui/client';

const suiClient = new SuiClient({
  url: import.meta.env.VITE_SUI_URL || "",
});

const contractAddress = import.meta.env.VITE_SUI_CONTRACT_ADDRESS || "";
const treasuryCapObjectId = import.meta.env.VITE_SUI_TREASURY_CAP || "";
const userAddress = import.meta.env.VITE_SUI_USER_ADDRESS || "";

// Burn tokens on the Sui blockchain
export const burnSuiTokens = async (amount: number): Promise<Transaction> => {
  const tx = new Transaction();
  const burnAmount = tx.pure.u64(BigInt(amount));

  const coins = await suiClient.getCoins({
    owner: userAddress,
    coinType: `${contractAddress}::ibt_token::IBT_TOKEN`,
  });

  if (!coins || coins.data.length === 0) {
    throw new Error('No IBT_TOKEN coins found for this user.');
  }

  // Accumulate coins to cover the burn amount
  const selectedCoins = [];
  let accumulatedBalance = BigInt(0);

  for (const coin of coins.data) {
    selectedCoins.push(tx.object(coin.coinObjectId));
    accumulatedBalance += BigInt(coin.balance);

    if (accumulatedBalance >= BigInt(amount)) {
      break;
    }
  }

  if (accumulatedBalance < BigInt(amount)) {
    throw new Error('Insufficient total balance across all coins for the burn amount.');
  }

  // Merge selected coins if multiple coins are used
  const mergedCoin = selectedCoins.length > 1
    ? tx.mergeCoins(selectedCoins[0], selectedCoins.slice(1))
    : selectedCoins[0];

  // If the merged coin's balance is greater than the burn amount, split it
  const coinArgument =
    accumulatedBalance === BigInt(amount)
      ? mergedCoin
      : tx.splitCoins(mergedCoin, [burnAmount]);

  tx.moveCall({
    target: `${contractAddress}::ibt_token::burn`,
    arguments: [
      tx.object(treasuryCapObjectId),
      coinArgument,
    ],
  });

  return tx;
};

// Mint tokens on the Sui blockchain
export const mintSuiTokens = (amount: number): Transaction => {
  const tx = new Transaction();
  const pureAmount = tx.pure.u64(BigInt(amount));

  tx.moveCall({
    target: `${contractAddress}::ibt_token::mint`,
    arguments: [
      tx.object(treasuryCapObjectId),
      pureAmount,
    ],
  });

  return tx;
};
