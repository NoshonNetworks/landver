# LandVer - Land Verification System

LandVer is a decentralized application (dApp) for land registration and verification using blockchain technology. It provides a secure and transparent way to manage land records, verify ownership, and facilitate land transactions.

**LAND_REGISTRY_CONTRACT_ADDRESS:  0x30245138112a2a7E2577aD16b2740803a50Ec16C**


## Features

- Land Registration: Users can register their land by providing details such as location, area, land use, and uploading a Certificate of Occupancy.
- Land Verification: Anyone can verify the authenticity of registered land using the unique Land ID.
- Blockchain Integration: All land records are stored on the Ethereum blockchain, ensuring immutability and transparency.
- Interactive Map: Users can select land locations using an interactive map interface.
- Wallet Connection: Integration with MetaMask for secure user authentication and blockchain transactions.
- Land Listing: View all registered lands with their details a
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