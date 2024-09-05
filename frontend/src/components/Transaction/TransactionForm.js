import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { TextField, Button, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function TransactionForm() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    landId: '',
    fromOwnerId: '',
    toOwnerId: '',
    type: 'transfer'
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transaction/create', transaction, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      alert('Transaction created successfully');
      navigate('/transactions');
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Create Transaction</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="landId" label="Land ID" value={transaction.landId} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="fromOwnerId" label="From Owner ID" value={transaction.fromOwnerId} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="toOwnerId" label="To Owner ID" value={transaction.toOwnerId} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Transaction Type</InputLabel>
            <Select
              labelId="type-label"
              name="type"
              value={transaction.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="transfer">Transfer</MenuItem>
              <MenuItem value="registration">Registration</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Create Transaction</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default TransactionForm;