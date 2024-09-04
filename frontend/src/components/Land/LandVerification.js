import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

function LandVerification() {
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const verifyLand = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(`/api/land/${id}/verify`);
          setVerificationResult(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error verifying land:', error);
          setLoading(false);
        }
      }
    };

    verifyLand();
  }, [id, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Land Verification Result</Typography>
      {verificationResult && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color={verificationResult.isVerified ? 'green' : 'red'}>
              {verificationResult.isVerified ? 'Verified' : 'Not Verified'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Database Details</Typography>
            <Typography><strong>Land ID:</strong> {verificationResult.databaseDetails.landId}</Typography>
            <Typography><strong>Owner:</strong> {verificationResult.databaseDetails.owner}</Typography>
            <Typography><strong>Location:</strong> {verificationResult.databaseDetails.location}</Typography>
            <Typography><strong>Area:</strong> {verificationResult.databaseDetails.area} sq. meters</Typography>
            <Typography><strong>Land Use:</strong> {verificationResult.databaseDetails.landUse}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Blockchain Details</Typography>
            <Typography><strong>Land ID:</strong> {verificationResult.blockchainDetails.landId}</Typography>
            <Typography><strong>Owner:</strong> {verificationResult.blockchainDetails.owner}</Typography>
            <Typography><strong>Location:</strong> {verificationResult.blockchainDetails.location}</Typography>
            <Typography><strong>Area:</strong> {verificationResult.blockchainDetails.area.toString()} sq. meters</Typography>
            <Typography><strong>Land Use:</strong> {verificationResult.blockchainDetails.landUse}</Typography>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default LandVerification;