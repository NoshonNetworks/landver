# LandVer Frontend

This is the frontend application for the LandVer land verification system. It's built with React and uses Material-UI for styling.

## Features

- User authentication with MetaMask
- Land registration form with interactive map
- Land listing and details view
- Land verification interface

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start ```

3. Create a `.env` file in the root of the frontend directory with the following content:
   ```
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. Start the development server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Folder Structure

- `src/components/`: React components
- `src/context/`: React context for global state management
- `src/services/`: API and blockchain interaction services
- `src/utils/`: Utility functions and helpers

## Dependencies

Key dependencies include:

- React
- React Router
- Material-UI
- Axios
- Ethers.js
- React Leaflet

For a full list of dependencies, see `package.json`.