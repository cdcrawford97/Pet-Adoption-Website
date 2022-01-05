const mongoose = require('mongoose');

const contactMessageSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    message: {
        type: String,
        required: true
    }

});

const Users = module.exports = mongoose.model('Message', contactMessageSchema);