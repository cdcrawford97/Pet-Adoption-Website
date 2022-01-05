const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    seller: {
        type: Boolean,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Users = module.exports = mongoose.model('User', userSchema);