import { WalletStandardAdapterProvider, useStandardWalletAdapters } from "@mysten/dapp-kit";

export async function connectSuiWallet() {
  try {
    const walletAdapters = useStandardWalletAdapters(); // Get all available wallet adapters

    if (walletAdapters.length === 0) {
      throw new Error("No wallets found. Please install a supported wallet.");
    }

    const walletAdapter = walletAdapters[0]; // Use the first available wallet (or let the user choose)
    await walletAdapter.connect(); // Prompt the user to connect their wallet

    const accounts = await walletAdapter.getAccounts(); // Fetch accounts from the wallet
    if (accounts.length === 0) {
      throw new Error("No accounts found in the connected wallet.");
    }

    return {
      address: accounts[0].address, // Return the first account's address
      wallet: walletAdapter, // Return the wallet adapter instance
    };
  } catch (error) {
    console.error("Error connecting to Sui Wallet:", error);
    throw error;
  }
}
