import React, { useState } from 'react';
import axios from '../../api/axios';
import { Typography, Paper, Grid, TextField, Button, CircularProgress, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function LandVerification() {
  const [landId, setLandId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!landId.trim()) {
      setError('Please enter a valid Land ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log('Verifying land with ID:', landId);
      const response = await axios.get(`/api/land/${landId}/verify`);
      console.log('Verification response:', response.data);
      setVerificationResult(response.data);
    } catch (error) {
      console.error('Error verifying land:', error);
      setError(error.response?.data?.message || 'Failed to verify land. Please check the Land ID and try again.');
      console.error('Detailed error:', error.response?.data);
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
            <button className='bg-blue-600 text-white px-6 py-4 rounded hover:bg-blue-400'>
              Verify
            </button>
          </Grid>
        </Grid>
      </form>

      {loading && <CircularProgress style={{ marginTop: '20px' }} />}

      {error && (
        <Paper elevation={2} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#ffebee' }}>
          <Typography color="error" variant="h6">Error</Typography>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      {verificationResult && !loading && (
        <Paper elevation={2} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom color={verificationResult.isVerified ? 'green' : 'red'}>
            {verificationResult.message}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Land Details</Typography>
              <Typography><strong>Land ID:</strong> {verificationResult.landDetails.landId}</Typography>
              <Typography><strong>Owner:</strong> {verificationResult.landDetails.owner}</Typography>
              <Typography><strong>Location:</strong> {verificationResult.landDetails.location}</Typography>
              <Typography><strong>Area:</strong> {verificationResult.landDetails.area} sq. meters</Typography>
              <Typography><strong>Land Use:</strong> {verificationResult.landDetails.landUse}</Typography>
              <Typography><strong>Document Hash:</strong> {verificationResult.landDetails.documentHash}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Location Map</Typography>
              <Box height={300} width="100%">
                <MapContainer 
                  center={verificationResult.landDetails.location.split(',').map(Number)} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={verificationResult.landDetails.location.split(',').map(Number)}>
                    <Popup>{verificationResult.landDetails.landUse}</Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Paper>
  );
}

export default LandVerification;