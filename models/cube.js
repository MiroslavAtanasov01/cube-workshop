const { v4 } = require("uuid")
const fs = require('fs');
const path = require('path');
const databaseFIle = path.join(__dirname, '..', 'config/database.json')

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'No name'
        this.description = description
        this.imageUrl = imageUrl || 'Placeholder'
        this.difficulty = difficulty || 0
    }

    save() {
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty

        }
        fs.readFile(databaseFIle, (err, data) => {
            if (err) {
                throw err
            }
            const cubes = JSON.parse(data);
            cubes.push(newCube)

            fs.writeFile(databaseFIle, JSON.stringify(cubes), err => {
                if (err) {
                    throw err
                }
                console.log('New cube is stored');
            })
        })

    }
}

module.exports = Cube