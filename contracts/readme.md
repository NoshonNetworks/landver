# LandVer Smart Contracts

This directory contains the Solidity smart contracts for the LandVer land verification system.

## Contracts

- `LandRegistry.sol`: Main contract for land registration and verification

## Prerequisites

- Truffle or Hardhat (for compilation and deployment)
- An Ethereum wallet with testnet ETH (for deployment)

## Compilation

To compile the contracts:
```
truffle compile
```
or
```
npx hardhat compile
```

## Deployment

1. Set up your `.env` file with your private key and Ethereum node URL:

   ```
   PRIVATE_KEY=your_private_key_here
   ETHEREUM_RPC_URL=your_ethereum_node_url_here
   ```

2. Run the deployment script:

   ```
   truffle migrate --network sepolia
   ```

   or if using Hardhat:

   ```
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. Note the deployed contract address and update it in the backend `.env` file.

## Testing

Run the test suite with:
```
truffle test
```
or
```
npx hardhat test
```

## Contract Functions

- `registerLand`: Register a new land parcel
- `transferLand`: Transfer ownership of a land parcel
- `verifyLand`: Verify a land parcel's registration
- `getLandDetails`: Get details of a registered land parcel
- `getOwnerLands`: Get all lands owned by an address

For detailed function signatures and events, refer to the contract source code.