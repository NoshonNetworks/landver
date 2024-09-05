import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { List, ListItem, ListItemText, Typography, Button, CircularProgress } from '@mui/material';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('/api/transaction', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setTransactions(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Transaction List</Typography>
      <Button component={Link} to="/transactions/add" variant="contained" color="primary" style={{ marginBottom: '1rem' }}>
        Add New Transaction
      </Button>
      <List>
        {transactions.map(transaction => (
          <ListItem key={transaction._id}>
            <ListItemText 
              primary={`${transaction.type} - ${transaction.status}`} 
              secondary={`From: ${transaction.fromOwnerId.name} To: ${transaction.toOwnerId.name}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TransactionList;