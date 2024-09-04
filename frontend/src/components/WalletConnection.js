import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { BrowserProvider } from 'ethers';
import { AuthContext } from '../context/AuthContext';

function WalletConnection() {
  const [account, setAccount] = useState(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    console.log("Checking wallet connection...");
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        console.log("Accounts:", accounts);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsAuthenticated(true);
          localStorage.setItem('walletAddress', accounts[0]);
          console.log("Wallet already connected:", accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    } else {
      console.log("Ethereum object not found, MetaMask not installed?");
    }
  };

  const connectWallet = async () => {
    console.log("Attempting to connect wallet...");
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsAuthenticated(true);
        localStorage.setItem('walletAddress', address);
        console.log("Wallet connected:", address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet: " + error.message);
      }
    } else {
      console.log("Ethereum object not found, MetaMask not installed?");
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected: {account.toString()}</p>
      ) : (
        <Button onClick={connectWallet} variant="contained" color="primary">
          Connect Wallet
        </Button>
      )}
    </div>
  );
}

export default WalletConnection;