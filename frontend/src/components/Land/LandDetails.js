import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { Typography, Paper, Grid, CircularProgress, Box } from '@mui/material';
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

function LandDetails() {
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(`/api/land/${id}`);
        setLand(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching land details:', error);
        setError(error.response?.data?.message || 'An error occurred while fetching land details');
        setLoading(false);
      }
    };

    fetchLandDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!land) {
    return <Typography variant="h6">Land not found</Typography>;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h4" gutterBottom>Land Details</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography><strong>Land ID:</strong> {land.landId}</Typography>
          <Typography><strong>Owner:</strong> {land.owner}</Typography>
          <Typography><strong>Location:</strong> {land.location}</Typography>
          <Typography><strong>Area:</strong> {land.area} sq. meters</Typography>
          <Typography><strong>Land Use:</strong> {land.landUse}</Typography>
          <Typography><strong>Document Hash:</strong> {land.documentHash}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height={300} width="100%">
            <MapContainer center={land.location.split(',').map(Number)} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={land.location.split(',').map(Number)}>
                <Popup>{land.landUse}</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Grid>
        {land.blockchainDetails && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Blockchain Details</Typography>
            <Typography><strong>Is Registered:</strong> {land.blockchainDetails.isRegistered ? 'Yes' : 'No'}</Typography>
            <Typography><strong>Is Verified:</strong> {land.blockchainDetails.isVerified ? 'Yes' : 'No'}</Typography>
            <Typography><strong>Last Transaction Timestamp:</strong> {new Date(land.blockchainDetails.lastTransactionTimestamp * 1000).toLocaleString()}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default LandDetails;