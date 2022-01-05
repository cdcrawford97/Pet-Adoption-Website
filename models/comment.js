const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    advert: { 
        type: mongoose.Schema.Types.ObjectId 
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    childComments: {
        type: [ this ],
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);