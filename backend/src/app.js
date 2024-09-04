const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const landRoutes = require('./routes/landRoutes');
const adminRoutes = require('./routes/adminRoutes');
const landOwnerRoutes = require('./routes/landOwnerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const documentRoutes = require('./routes/documentRoutes');

app.use('/api/land', landRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/landowner', landOwnerRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/document', documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});