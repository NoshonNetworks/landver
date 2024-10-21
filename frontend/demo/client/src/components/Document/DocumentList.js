import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { List, ListItem, ListItemText, Typography, Button, CircularProgress } from '@mui/material';

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('/api/document', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setDocuments(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Document List</Typography>
      <Button component={Link} to="/documents/add" variant="contained" color="primary" style={{ marginBottom: '1rem' }}>
        Add New Document
      </Button>
      <List>
        {documents.map(document => (
          <ListItem key={document._id}>
            <ListItemText 
              primary={document.name} 
              secondary={`Type: ${document.type} - Status: ${document.verificationStatus}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DocumentList;