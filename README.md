# Cross-Chain Token Bridge (Sui ↔ Ethereum)

This project implements a full-stack cross-chain bridge enabling token transfers between the Ethereum and Sui blockchains. It features smart contracts on both chains, a web frontend, automated deployment scripts, and developer tooling for seamless testing and interaction.

## Features

### Core Capabilities
- Burn/mint token bridging between Ethereum and Sui
- Secure token transfers using ERC20 and Move contracts
- Dual ownership enforcement via smart contracts
- Full-stack integration with a web dashboard
- Persistent token tracking and live balances

### Blockchain Stack
- **Ethereum:** Solidity smart contracts using OpenZeppelin and Foundry
- **Sui:** Move-based token definition and bridge logic
- **Bridge Contracts:**
  - `IBTToken` ERC20 contract with mint/burn
  - `Bridge` contract for coordinated token operations
  - Sui module `ibt_token` defining IBT_TOKEN asset

### Frontend
- React + Vite + TypeScript
- Real-time wallet integration via MetaMask (Ethereum) and Sui Wallet Kit
- Token bridging UI with cross-chain awareness
- Live balance readouts and transaction logs
- Supports both Ethereum testnets and local Sui nodes

### Dev & Tooling
- Foundry for Solidity contract testing and gas reporting
- Move testing for Sui logic
- ESLint and strict TS configurations
- Environment-driven configuration for chain connectivity
- Docker-ready backend setup

## Getting Started

### Prerequisites
- Node.js, npm
- MetaMask wallet
- Sui CLI and local network (or access to Sui testnet)
- Foundry (`forge` CLI)

### 1. Install Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2. Deploy Ethereum Contracts (via Foundry)

```bash
forge build
forge test
```

Or deploy manually using `deploy_contracts.sol`.

### 3. Deploy Sui Package

```bash
sui move build
sui client publish
```

### 4. Configure Environment

Update `.env` in `/frontend` with:
- Ethereum contract address and ABI
- Sui contract address and TreasuryCap
- Wallet addresses

## Architecture

- `contracts/ethereum`: Solidity contracts, tests, and deploy scripts
- `contracts/sui`: Move modules and tests
- `frontend/`: React UI and token dashboard
- `forge.toml`: Foundry build configuration
- `Dockerfile`: Backend deployment config (currently not containerized)

## License

This project is licensed under the MIT License.
