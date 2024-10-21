import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { TextField, Button, Typography, Grid } from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', credentials);
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="email" label="Email" type="email" value={credentials.email} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="password" label="Password" type="password" value={credentials.password} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;