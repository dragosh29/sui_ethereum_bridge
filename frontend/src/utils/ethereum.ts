import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";

let provider: BrowserProvider;
let signer: any;

export const connectEthereumWallet = async () => {
  try {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
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
  await tx.wait();
};

export const mintEthereumTokens = async (amount: number) => {
  const abi = getAbi("VITE_ETH_MINT_ABI");
  const contractAddress = getContractAddress();

  const contract = new Contract(contractAddress, abi, signer);
  const address = await signer.getAddress();

  const tx = await contract.mint(address, parseUnits(amount.toString(), 18));
  await tx.wait();
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
    return formatUnits(rawBalance, 18); // Convert from wei to human-readable format
  } catch (error) {
    console.error("Error fetching IBT balance:", error);
    throw error;
  }
};