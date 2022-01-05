const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    advertId: { 
        type: mongoose.Schema.Types.ObjectId 
    },
    adopterName: {
        type: String,
        required: true
    },
    adopterDOB: {
        type: Date,
        required: true
    },
    adopterLocation: {
        type: String,
        required: true
    },
    adopterPhone: {
        type: String,
        required: true
    },
    adopterEmail: {
        type: String,
        required: true
    },
    reasons: {
        type: String,
        required: true
    },
    hasGarden: {
        type: Boolean
    },
    hasChildren: {
        type: Boolean
    },
    hasPets: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);