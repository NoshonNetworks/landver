import React, { useState, useEffect, useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { BrowserProvider } from 'ethers';
import { AuthContext } from '../context/AuthContext';

function WalletConnection() {
  const [account, setAccount] = useState(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsAuthenticated(true);
          localStorage.setItem('walletAddress', accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsAuthenticated(true);
        localStorage.setItem('walletAddress', address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet: " + error.message);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsAuthenticated(false);
    localStorage.removeItem('walletAddress');
  };

  return (
    <div>
      {account ? (
        <div>
          <Typography variant="body2" style={{ marginBottom: '8px' }}>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </Typography>
          <Button onClick={disconnectWallet} variant="outlined" color="secondary">
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button onClick={connectWallet} variant="contained" color="primary">
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default WalletConnection;