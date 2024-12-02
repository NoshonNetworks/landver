const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'manager', 'clerk'],
    required: true
  },
  lastLogin: Date
});

adminSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { user: { id: this._id, role: this.role } },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = mongoose.model('Admin', adminSchema);