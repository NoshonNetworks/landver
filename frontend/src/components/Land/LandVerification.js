import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Grid, TextField, Button, CircularProgress } from '@mui/material';

function LandVerification() {
  const [landId, setLandId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/land/${landId}/verify`);
      setVerificationResult(response.data);
    } catch (error) {
      console.error('Error verifying land:', error);
      setVerificationResult({ error: 'Failed to verify land. Please check the Land ID and try again.' });
    }
    setLoading(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h4" gutterBottom>Verify Land</Typography>
      <form onSubmit={handleVerify}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Land ID"
              value={landId}
              onChange={(e) => setLandId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Verify
            </Button>
          </Grid>
        </Grid>
      </form>

      {loading && <CircularProgress style={{ marginTop: '20px' }} />}

      {verificationResult && !loading && (
        <Paper elevation={2} style={{ padding: '20px', marginTop: '20px' }}>
          {verificationResult.error ? (
            <Typography color="error">{verificationResult.error}</Typography>
          ) : (
            <>
              <Typography variant="h6" gutterBottom color={verificationResult.isVerified ? 'green' : 'red'}>
                {verificationResult.isVerified ? 'Verified' : 'Not Verified'}
              </Typography>
              <Typography variant="h6" gutterBottom color="primary">
                This land is {verificationResult.isVerified ? '' : 'not '}in the LandVer Blockchain Registry
              </Typography>
              <Grid container spacing={2}>
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
            </>
          )}
        </Paper>
      )}
    </Paper>
  );
}

export default LandVerification;