const { Router } = require('express')
const { authAccess, getUserStatus } = require('../controllers/user')
const { attachedAccessories } = require('../controllers/accessories')
const { updateCube } = require('../controllers/cubes')
const Accessory = require('../models/accessory')

const router = Router()

router.get('/create/accessory', getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory | Cube Workshop',
        isLoggedIn: req.isLoggedIn,
    })
})

router.post('/create/accessory', authAccess, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body
    const accessory = new Accessory({ name: name.trim(), description: description.trim(), imageUrl })

    try {
        await accessory.save()
        return res.redirect('/')
    } catch (err) {
        return res.render('createAccessory', {
            title: 'Create Accessory | Cube Workshop',
            isLoggedIn: req.isLoggedIn,
            error: 'Accessory details is not valid'
        })
    }
})

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res, next) => {
    const { id: cubeId } = req.params
    try {
        const data = await attachedAccessories(cubeId)

        res.render('attachAccessory', {
            title: 'Attach accessory | Cube Workshop',
            ...data,
            isLoggedIn: req.isLoggedIn
        });
    } catch (err) {
        next(err)
    }
})

router.post('/attach/accessory/:id', authAccess, async (req, res, next) => {
    const { accessory: accessoryId } = req.body
    const { id: cubeId } = req.params

    try {
        await updateCube(cubeId, accessoryId)
        res.redirect(`/details/${cubeId}`)
    } catch (err) {
        next(err)
    }

})

module.exports = router