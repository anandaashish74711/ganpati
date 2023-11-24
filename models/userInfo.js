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
<<<<<<< HEAD
    visit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visit',
    }],
=======
   
>>>>>>> 76ce3da06d2885c2a558f107c2e0dfbb9488b0ee
});
