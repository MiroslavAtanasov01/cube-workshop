const { Router } = require('express')
const { getAccessories } = require('../controllers/accessories')
const { getAllCubes, getCube, updateCube, deleteCube, getCubeWithAccessories, index } = require('../controllers/cubes')
const Accessory = require('../models/accessory')

const router = Router()

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory | Cube Workshop'
    })
})

router.post('/create/accessory', async (req, res) => {
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

router.get('/attach/accessory/:id', async (req, res) => {
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
        canAttachAccessory
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    const { accessory } = req.body
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router