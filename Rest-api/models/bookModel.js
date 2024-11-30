const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true,
        validate: /^https?:\/\//,
    },
    // subscribers: [{
    //     type: ObjectId,
    //     ref: "User"
    // }],
    description: {
        type: String,
        // required: true,
        minLength: 10
    }, 
    userId: {
        type: ObjectId,
        ref: "User"
    },
    likedList: [{
        type: ObjectId,
        ref: 'User'
    }],
    owner: {
        type: ObjectId,
        ref: 'User'
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Book', bookSchema);
