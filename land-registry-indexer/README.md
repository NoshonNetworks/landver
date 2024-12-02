# Land Registry Indexer

An Apibara indexer for tracking and storing Land Registry smart contract events on StarkNet. This indexer maintains a complete history of land registrations, transfers, verifications, and marketplace activities in a PostgreSQL database.

## Features

- Tracks all Land Registry contract events
- Stores event data in a normalized PostgreSQL database
- Maintains relationships between lands, inspectors, and listings
- Provides complete history of all land-related transactions
- Supports Docker deployment

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- Docker and Docker Compose (for containerized deployment)
- StarkNet node access (via Apibara)
