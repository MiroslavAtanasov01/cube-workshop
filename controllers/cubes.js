const fs = require('fs')
const { getCubes } = require('./database')

const getAllCubes = (cb) => {
    getCubes((cubes) => {
        cb(cubes)
    })
}


module.exports = {
    getAllCubes,
}
