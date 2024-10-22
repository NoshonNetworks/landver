import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

function LandDetail() {
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const res = await axios.get(`/api/land/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setLand(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching land details:', error);
        setLoading(false);
      }
    };
    fetchLand();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!land) {
    return <Typography variant="h6">Land not found</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Land Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Land ID:</strong> {land.landId}</Typography>
            <Typography variant="body1"><strong>Address:</strong> {land.address}</Typography>
            <Typography variant="body1"><strong>Use Type:</strong> {land.useType}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Area:</strong> {land.area} {land.unit}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {land.status}</Typography>
            <Typography variant="body1"><strong>Registration Date:</strong> {new Date(land.registrationDate).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default LandDetail;