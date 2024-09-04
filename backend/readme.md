# LandVer Backend

This is the backend server for the LandVer land verification system. It's built with Node.js and Express, and interacts with both MongoDB and the Ethereum blockchain.

## Features

- RESTful API for land registration, verification, and retrieval
- Integration with Ethereum smart contracts
- MongoDB database for storing land details
- File upload handling for land documents

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB instance

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root of the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ETHEREUM_RPC_URL=your_ethereum_node_url
   PRIVATE_KEY=your_ethereum_private_key
   LAND_REGISTRY_CONTRACT_ADDRESS=your_deployed_contract_address

   . Start the server:
   ```
   npm start
   ```

For development with auto-restart on file changes:
```
npm run dev
```

## API Endpoints

- `POST /api/land/register`: Register a new land
- `GET /api/land`: Get all registered lands
- `GET /api/land/:id`: Get details of a specific land
- `GET /api/land/:id/verify`: Verify a land's registration
- `POST /api/land/:id/upload`: Upload land documents

## Dependencies

Key dependencies include:

- Express
- Mongoose
- Ethers.js
- Multer (for file uploads)

For a full list of dependencies, see `package.json`.