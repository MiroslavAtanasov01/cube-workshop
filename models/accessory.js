const mongoose = require('mongoose')

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        match: [/^[A-Za-z0-9]+$/g, 'Accessory is not valid'],
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 2000,
        match: [/^[A-Za-z0-9 ]+$/g, 'Accessory description is not valid'],
    },
    imageUrl: {
        type: String,
        required: true,
    },
    cubes: [{
        type: 'ObjectId',
        ref: "Cube"
    }]
})

AccessorySchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http://') || url.startsWith('https://')
}, 'Image url is not valid')

module.exports = mongoose.model('Accessory', AccessorySchema)