const mongoose = require('mongoose');

const landOwnerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: String,
  nationalId: {
    type: String,
    required: true,
    unique: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  ownedLands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land'
  }]
});

module.exports = mongoose.model('LandOwner', landOwnerSchema);