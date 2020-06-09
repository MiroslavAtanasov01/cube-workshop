const fs = require('fs')
const path = require('path');

const databaseFile = path.join(__dirname, '..', 'config/database.json')

const saveCube = (cube, cb) => {
    getCubes((cubes) => {
        cubes.push(cube)

        fs.writeFile(databaseFile, JSON.stringify(cubes), err => {
            if (err) {
                throw err
            }
            console.log('New cube is stored');
            cb()
        })
    })
}

const getCube = (id, cb) => {
    getCubes(cubes => {
        const cube = cubes.filter(c => c.id === id)[0]
        cb(cube)
    })
}


const getCubes = (cb) => {
    fs.readFile(databaseFile, (err, data) => {
        if (err) {
            throw err
        }
        const cubes = JSON.parse(data);
        cb(cubes)
    })
}

const del = (id) => {
    getCubes(cubes => {
        const cube = cubes.findIndex(c => c.id === id)
        cubes.splice(cube, 1)

        fs.writeFile('./config/database.json', JSON.stringify(cubes), err => {
            if (err) {
                throw err;
            }
            console.log('The file has been deleted');
        })
    })

}

module.exports = {
    saveCube,
    getCubes,
    getCube,
    del
}