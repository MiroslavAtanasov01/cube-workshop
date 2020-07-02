const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const router = require('express')()
const jwt = require('jsonwebtoken')
const Cube = require('../models/cube')
const { authAccess, getUserStatus } = require('../controllers/user')
const { getCubeWithAccessories, editCube, deleteCube } = require('../controllers/cubes')

router.get('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)

    res.render('editCubePage', {
        title: 'Edit cube| Cube Workshop',
        cube,
    })
})

router.post('/edit/:id', authAccess, getUserStatus, async (req, res, next) => {
    const { name, description, imageUrl, difficultyLevel } = req.body

    try {
        await editCube(req.params.id, { name, description, imageUrl, difficulty: difficultyLevel })
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        next(err)
    }
})

router.get('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)
    res.render('deleteCubePage', {
        title: 'deleteCube | Cube Workshop',
        ...cube,
    })
})

router.post('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    try {
        await deleteCube(req.params.id)
        res.redirect(`/`)
    } catch (err) {
        next(err)
    }
})

router.get('/create', getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop',
    })
})

router.post('/create', authAccess, async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body

    const token = req.cookies['aid']
    const decodedObject = jwt.verify(token, config.privateKey)

    const cube = new Cube({ name: name.trim(), description: description.trim(), imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userID })

    try {
        await cube.save()
        return res.redirect('/')
    } catch (err) {
        return res.render('create', {
            title: 'Create Cube | Cube Workshop',
            isLoggedIn: req.isLoggedIn,
            error: 'Cube details is not valid'
        })
    }
})

router.get('/details/:id', getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)

    res.render('details', {
        title: 'Details Cube | Cube Workshop',
        ...cube,
    })
})

module.exports = router