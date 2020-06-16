const { Router } = require('express')
const { getAccessories } = require('../controllers/accessories')
const { getCube, updateCube } = require('../controllers/cubes')
const { authAccess, getUserStatus } = require('../controllers/user')
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
    const accessory = new Accessory({ name, description, imageUrl })

    await accessory.save((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/')
    })
})

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAccessories()
    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0

    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString())

    const notAttachedAccessories = accessories.filter(acc => {
        const accessoriesToString = acc._id.valueOf().toString()
        return !cubeAccessories.includes(accessoriesToString)
    })

    res.render('attachAccessory', {
        title: 'Attach Accessory | Cube Workshop',
        ...cube,
        accessories: notAttachedAccessories,
        canAttachAccessory,
        isLoggedIn: req.isLoggedIn,
    })
})

router.post('/attach/accessory/:id', authAccess, async (req, res) => {
    const { accessory } = req.body
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router