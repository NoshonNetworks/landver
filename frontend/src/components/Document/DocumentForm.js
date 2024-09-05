import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { TextField, Button, Typography, Grid } from '@mui/material';

function DocumentForm() {
  const navigate = useNavigate();
  const [document, setDocument] = useState({
    name: '',
    file: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setDocument({ ...document, file: e.target.files[0] });
    } else {
      setDocument({ ...document, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', document.name);
    formData.append('document', document.file);

    try {
      await axios.post('/api/document/upload', formData, {
        headers: { 
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Document uploaded successfully');
      navigate('/documents');
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Upload Document</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="name" label="Document Name" value={document.name} onChange={handleChange} required />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*,application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleChange}
            name="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload File
            </Button>
          </label>
          {document.file && <Typography variant="body2">{document.file.name}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Upload Document</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default DocumentForm;