import { BrowserProvider, Contract, parseUnits } from "ethers";

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

  const tx = await contract.burn(parseUnits(amount.toString(), 18));
  await tx.wait();
};

export const mintEthereumTokens = async (amount: number) => {
  const abi = getAbi("VITE_ETH_MINT_ABI");
  const contractAddress = getContractAddress();

  const contract = new Contract(contractAddress, abi, signer);

  const tx = await contract.mint(parseUnits(amount.toString(), 18));
  await tx.wait();
};
