const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    visit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit',
    }],
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
