const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pets: [
        {
            petId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pet',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
