const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  landId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land',
    required: true
  },
  fromOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LandOwner',
    required: true
  },
  toOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LandOwner',
    required: true
  },
  type: {
    type: String,
    enum: ['transfer', 'registration'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  initiationDate: {
    type: Date,
    default: Date.now
  },
  completionDate: Date,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
});

module.exports = mongoose.model('Transaction', transactionSchema);