import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { TextField, Button, Typography, Grid } from '@mui/material';

function LandOwnerForm() {
  const navigate = useNavigate();
  const [landOwner, setLandOwner] = useState({
    userId: '',
    name: '',
    walletAddress: '',
    email: '',
    phoneNumber: '',
    nationalId: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLandOwner({ ...landOwner, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.userId = landOwner.userId ? "" : "User ID is required";
    tempErrors.name = landOwner.name ? "" : "Name is required";
    tempErrors.walletAddress = landOwner.walletAddress ? "" : "Wallet Address is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(landOwner.email) ? "" : "Email is not valid";
    tempErrors.nationalId = landOwner.nationalId ? "" : "National ID is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('/api/landowner/register', landOwner, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        alert('Land owner registered successfully');
        navigate('/landowners');
      } catch (error) {
        console.error('Error registering land owner:', error);
        alert('Failed to register land owner');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Register Land Owner</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="userId" label="User ID" value={landOwner.userId} onChange={handleChange} required />
          <Typography color="error">{errors.userId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="name" label="Name" value={landOwner.name} onChange={handleChange} required />
          <Typography color="error">{errors.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="walletAddress" label="Wallet Address" value={landOwner.walletAddress} onChange={handleChange} required />
          <Typography color="error">{errors.walletAddress}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="email" label="Email" type="email" value={landOwner.email} onChange={handleChange} required />
          <Typography color="error">{errors.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="phoneNumber" label="Phone Number" value={landOwner.phoneNumber} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="nationalId" label="National ID" value={landOwner.nationalId} onChange={handleChange} required />
          <Typography color="error">{errors.nationalId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Register Land Owner</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LandOwnerForm;