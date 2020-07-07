const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minlength: [3, 'Username is not valid'],
        match: [/^[A-Za-z0-9]+$/g, 'Username is not valid'],

    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    }
})

module.exports = mongoose.model('User', UserSchema)