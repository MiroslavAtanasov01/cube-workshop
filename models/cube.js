const { v4 } = require("uuid")
const { saveCube } = require('../controllers/database')

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'No name'
        this.description = description
        this.imageUrl = imageUrl || 'https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg'
        this.difficulty = difficulty || 0
    }

    save(cb) {
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty

        }
        saveCube(newCube, cb)
    }
}

module.exports = Cube