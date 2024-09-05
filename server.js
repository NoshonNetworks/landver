const express = require('express');
const path = require('path');
const app = express();

// Import your backend app
const backendApp = require('./backend/src/app');

// Use the backend app as middleware
app.use('/api', backendApp);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//