# Land Registry Smart Contract System

This project implements a land registry system using smart contracts on the StarkNet platform.

## Components

- LandNFT: Represents land parcels as non-fungible tokens (NFTs)
- LandRegistry: Manages land registration and ownership
- LandTransaction: Handles land transfer transactions
- LandVerification: Manages land verification process

## Deployment Instructions

1. Install the Starknet CLI and set up your development environment.
2. Compile the contracts:
   ```
   starknet-compile contracts/src/lib.cairo --output compiled_contracts/land_registry.sierra.json
   ```
3. Deploy the contracts in the following order:
   a. LandNFT
   b. LandRegistry (pass LandNFT address as constructor argument)
   c. LandTransaction (pass LandRegistry address as constructor argument)
   d. LandVerification (pass LandRegistry address as constructor argument)

   Example deployment command:
   ```
   starknet deploy --contract compiled_contracts/land_registry.sierra.json --inputs <constructor_arguments>
   ```
4. After deployment, note down the contract addresses for future interactions.

## Interacting with the Contracts

Use the Starknet CLI or a frontend application to interact with the deployed contracts. Ensure you're calling the correct contract functions with the required permissions.
