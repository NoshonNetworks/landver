const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
    landId: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    landUse: {
        type: String,
        required: true
    },
    documentHash: {
        type: String,
        required: true
    },
    documentPath: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifier: {
        type: String
    }
});

module.exports = mongoose.model('Land', landSchema);