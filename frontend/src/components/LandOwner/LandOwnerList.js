import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { List, ListItem, ListItemText, Typography, Button, CircularProgress } from '@mui/material';

function LandOwnerList() {
  const [landOwners, setLandOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandOwners = async () => {
      try {
        const res = await axios.get('/api/landowner', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setLandOwners(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching land owners:', error);
        setLoading(false);
      }
    };
    fetchLandOwners();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Land Owner List</Typography>
      <Button component={Link} to="/landowners/add" variant="contained" color="primary" style={{ marginBottom: '1rem' }}>
        Add New Land Owner
      </Button>
      <List>
        {landOwners.map(owner => (
          <ListItem key={owner._id}>
            <ListItemText primary={owner.name} secondary={owner.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default LandOwnerList;