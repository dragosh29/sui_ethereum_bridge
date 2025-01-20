import { BrowserProvider } from "ethers";

export async function connectEthereumWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider instead of Web3Provider
  const accounts = await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return signer;
}
