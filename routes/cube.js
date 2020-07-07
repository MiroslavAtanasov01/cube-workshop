const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const router = require('express')()
const jwt = require('jsonwebtoken')
const Cube = require('../models/cube')
const { authAccess } = require('../controllers/user')
const { getCubeWithAccessories, editCube, deleteCube } = require('../controllers/cubes')


router.get('/create', authAccess, (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop',
    })
})

router.post('/create', authAccess, async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body

    const token = req.cookies[config.development.cookie]
    const decodedObject = jwt.verify(token, config.privateKey)

    const cube = new Cube({ name: name.trim(), description: description.trim(), imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userID })

    try {
        await cube.save()
        return res.redirect('/')
    } catch (err) {
        return res.render('create', {
            title: 'Create Cube | Cube Workshop',
            error: 'Cube details is not valid'
        })
    }
})

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)

    res.render('details', {
        title: 'Details Cube | Cube Workshop',
        ...cube,
    })
})

router.get('/edit/:id', authAccess, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)

    res.render('editCubePage', {
        title: 'Edit cube| Cube Workshop',
        cube,
    })
})

router.post('/edit/:id', authAccess, async (req, res, next) => {
    const { name, description, imageUrl, difficultyLevel } = req.body

    try {
        await editCube(req.params.id, { name, description, imageUrl, difficulty: difficultyLevel })
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        next(err)
    }
})

router.get('/delete/:id', authAccess, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id)
    res.render('deleteCubePage', {
        title: 'deleteCube | Cube Workshop',
        ...cube,
    })
})

router.post('/delete/:id', authAccess, async (req, res) => {
    try {
        await deleteCube(req.params.id)
        res.redirect(`/`)
    } catch (err) {
        next(err)
    }
})



module.exports = router