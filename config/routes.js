const { getAllCubes } = require('../controllers/cubes')
const { getCube, del } = require('../controllers/database')
const fs = require('fs')
const Cube = require('../models/cube')

module.exports = (app) => {

    app.get('/', (req, res) => {
        getAllCubes((cubes) => {
            res.render('index', {
                title: 'Cube Workshop',
                cubes
            })
        })
    })

    app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About | Cube Workshop'
        })
    })

    app.get('/create', (req, res) => {
        res.render('create', {
            title: 'Create Cube | Cube Workshop'
        })
    })

    app.post('/create', (req, res) => {
        const {
            name,
            description,
            imageUrl,
            difficultyLevel
        } = req.body
        const cube = new Cube(name, description, imageUrl, difficultyLevel)
        cube.save(() => {
            res.redirect('/')
        })
    })

    app.get('/details/:id', (req, res) => {
        getCube(req.params.id, (cube) => {

            res.render('details', {
                title: 'Details Cube | Cube Workshop',
                ...cube
            })
        })
    })

    app.get('/delete/:id', (req, res) => {
        const id = req.params.id;
        del(id)
        res.redirect('/')
    })

    app.get('*', (req, res) => {
        res.render('404', {
            title: 'Error | Cube Workshop'
        })
    })
}