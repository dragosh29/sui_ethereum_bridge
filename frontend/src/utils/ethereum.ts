import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";

let provider: BrowserProvider;
let signer: any;

export const connectEthereumWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const address = await signer.getAddress();
    localStorage.setItem("ethereumConnected", "true");
    localStorage.setItem("ethereumWalletAddress", address);

    return true;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    return false;
  }
};

// Check if wallet is already connected
export const restoreEthereumWallet = async () => {
  try {
    if (!window.ethereum) return false;

    const isConnected = localStorage.getItem("ethereumConnected");
    if (!isConnected) return false;

    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const address = await signer.getAddress();
    return address;
  } catch (error) {
    console.error("Failed to restore wallet:", error);
    return null;
  }
};

// Clear the persisted connection
export const disconnectEthereumWallet = () => {
  localStorage.removeItem("ethereumConnected");
  localStorage.removeItem("ethereumWalletAddress");
  signer = null;
};


// Helper function to get the ABI from environment variables
const getAbi = (envVariable: string) => {
  const abiString = import.meta.env[envVariable];
  if (!abiString) {
    throw new Error(`Missing ABI in environment variable: ${envVariable}`);
  }
  return JSON.parse(abiString);
};

// Helper function to get the contract address from environment variables
const getContractAddress = () => {
  const address = import.meta.env.VITE_ETH_CONTRACT_ADDRESS;
  if (!address) {
    throw new Error("Missing contract address in environment variables.");
  }
  return address;
};


export const burnEthereumTokens = async (amount: number) => {
  const abi = getAbi("VITE_ETH_BURN_ABI");
  const contractAddress = getContractAddress();

  const contract = new Contract(contractAddress, abi, signer);
  const address = await signer.getAddress();

  const tx = await contract.burn(address, parseUnits(amount.toString(), 18));
  return await tx.wait();
};

export const mintEthereumTokens = async (amount: number) => {
  const abi = getAbi("VITE_ETH_MINT_ABI");
  const contractAddress = getContractAddress();

  const contract = new Contract(contractAddress, abi, signer);
  const address = await signer.getAddress();

  const tx = await contract.mint(address, parseUnits(amount.toString(), 18));
  return await tx.wait();
};

export const getEthereumIbtBalance = async (): Promise<string> => {
  if (!signer) {
    throw new Error("Signer not initialized. Connect the wallet first.");
  }
  try {
    const abi = getAbi("VITE_ETH_BALANCE_ABI");
    const contractAddress = getContractAddress();

    const contract = new Contract(contractAddress, abi, signer);
    const address = await signer.getAddress();

    const rawBalance = await contract.balanceOf(address);
    return formatUnits(rawBalance, 18);
  } catch (error) {
    console.error("Error fetching IBT balance:", error);
    throw error;
  }
};