const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    age: {
        type: Number,
    },
    ageString: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        default: ''
    },
    images: { 
        type: [String]
    },
    location: {
        type: String,
        required: true
    },
    specialNeeds: {
        type: Boolean,
    },
    childFriendly: {
        type: Boolean,
    },
    petFriendly: {
        type: Boolean,
    },
    microchipped: {
        type: Boolean,
    },
    vaccinated: {
        type: Boolean,
    },
    neutered: {
        type: Boolean,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    adopted: {
        type: Boolean,
    },
    adoptedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Application'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Advert', advertSchema);