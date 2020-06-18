const mongoose = require('mongoose')

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        match: [/^[A-Za-z0-9]+$/g, 'Cube is not valid'],
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 2000,
        match: [/^[A-Za-z0-9 ]+$/g, 'Cube description is not valid'],
    },
    imageUrl: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }],
    creatorId: {
        type: 'ObjectId',
        ref: 'User'
    }
})

CubeSchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http://') || url.startsWith('https://')
}, 'Image url is not valid')

module.exports = mongoose.model('Cube', CubeSchema)