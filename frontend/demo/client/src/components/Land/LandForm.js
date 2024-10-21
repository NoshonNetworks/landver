import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { ethers } from 'ethers';

function LandForm() {
  const navigate = useNavigate();
  const [land, setLand] = useState({
    landId: '',
    location: '',
    area: '',
    landUse: '',
    document: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'document') {
      setLand({ ...land, document: e.target.files[0] });
    } else {
      setLand({ ...land, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('landId', land.landId);
    formData.append('location', land.location);
    formData.append('area', land.area);
    formData.append('landUse', land.landUse);
    formData.append('document', land.document);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const message = `Register land: ${land.landId}`;
      const signature = await signer.signMessage(message);

      const response = await axios.post('/api/land/add', formData, {
        headers: {
          'x-auth-signature': signature,
          'x-auth-address': address,
          'x-auth-message': message,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Land added successfully');
      navigate('/lands');
    } catch (error) {
      console.error('Error adding land:', error);
      alert('Failed to add land');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Add New Land</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="landId" label="Land ID" value={land.landId} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="location" label="Location" value={land.location} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="landUse" label="Use Type" value={land.landUse} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth name="area" label="Area" type="number" value={land.area} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <input type="file" name="document" onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Add Land</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LandForm;