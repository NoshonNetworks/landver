import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Typography, Button, Grid, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AuthContext } from '../../context/AuthContext';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function LandList() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchLands = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get('/api/land');
          setLands(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching lands:', error);
          setLoading(false);
        }
      }
    };

    fetchLands();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <CircularProgress />;
  }

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