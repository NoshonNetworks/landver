# LandVer - Land Verification System

LandVer is a decentralized protocol for land registration and verification, utilizing blockchain technology to provide a secure, transparent, and immutable system for managing land records. The protocol facilitates land transactions and ownership verification across multiple blockchains, starting with StarkNet.

While initially built on StarkNet, LandVer is designed to be cross-chain compatible, allowing land transactions and records to be securely managed across multiple blockchains.

**STARKNET_CONTRACT_ADDRESS: [address]**

**TEST LAND_REGISTRY_CONTRACT_ADDRESS On SEPOLIA:  0x30245138112a2a7E2577aD16b2740803a50Ec16C**


You can monitor the LandRegistered Events Here: [https://sepolia.etherscan.io/address/0x30245138112a2a7e2577ad16b2740803a50ec16c#events](https://sepolia.etherscan.io/address/0x30245138112a2a7e2577ad16b2740803a50ec16c#events)

## Roadmap
- Cross-Chain Support: Extend the protocol to support Ethereum, Binance Smart Chain, and other blockchains.
- Advanced Land Disputes Resolution: Implement on-chain dispute resolution mechanisms.
- Tokenized Land Ownership: Explore integration with NFTs for land tokenization.
nd locations on a map.

## Project Structure

The project is divided into three main components:

- `frontend/`: React-based web application
- `backend/`: Node.js and Express-based API server
- `contracts/`: Solidity smart contracts for the Ethereum blockchain

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MetaMask browser extension
- Ethereum wallet with testnet ETH (for Sepolia testnet)

## Setup and Running the Application

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/landver.git
   cd landver
   ```

2. Install dependencies for all components:
   ```
   npm run install-all
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend/` directory (see `backend/README.md` for required variables)
   - Create a `.env` file in the `frontend/` directory (see `frontend/README.md` for required variables)

4. Deploy the smart contract (see `contracts/README.md` for instructions)

5. Start the backend server:
   ```
   cd backend
   npm start
   ```

6. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000` to use the application.
