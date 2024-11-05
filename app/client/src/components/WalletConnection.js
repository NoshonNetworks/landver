import React, { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { BrowserProvider } from "ethers";
import { AuthContext } from "../context/AuthContext";

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
                    setAccount(accounts[0].address);
                    setIsAuthenticated(true);
                    localStorage.setItem("walletAddress", accounts[0].address);
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
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setIsAuthenticated(true);
                localStorage.setItem("walletAddress", address);
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
        localStorage.removeItem("walletAddress");
    };

    const formatAddress = (address) => {
        if (typeof address === "string" && address.length > 10) {
            return `${address.slice(0, 6)}...${address.slice(-4)}`;
        }
        return address;
    };

    return (
        <div>
            {account ? (
                <div>
                    <Typography variant="body2" style={{ marginBottom: "8px" }}>
                        Connected: {formatAddress(account)}
                    </Typography>
                    <Button
                        onClick={disconnectWallet}
                        variant="outlined"
                        color="secondary"
                    >
                        Disconnect Wallet
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={connectWallet}
                    variant="contained"
                    color="success"
                >
                    Connect Wallet
                </Button>
            )}
        </div>
    );
}

export default WalletConnection;
