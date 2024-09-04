import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LandList() {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await axios.get('/api/land');
        setLands(response.data);
      } catch (error) {
        console.error('Error fetching lands:', error);
      }
    };

    fetchLands();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>All Registered Lands</Typography>
      <Button component={Link} to="/register" variant="contained" color="primary" style={{ marginBottom: '1rem' }}>
        Register New Land
      </Button>
      <Grid container spacing={3}>
        {lands.map(land => (
          <Grid item xs={12} sm={6} md={4} key={land._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{land.landUse}</Typography>
                <Typography>Area: {land.area} sq. meters</Typography>
                <Typography>Location: {land.location}</Typography>
                <MapContainer center={land.location.split(',').map(Number)} zoom={13} style={{ height: '200px', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={land.location.split(',').map(Number)}>
                    <Popup>{land.landUse}</Popup>
                  </Marker>
                </MapContainer>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/lands/${land.landId}`}>View Details</Button>
                <Button size="small" component={Link} to={`/lands/${land.landId}/verify`}>Verify</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LandList;