const { index } = require('../controllers/cubes')
const { Router } = require('express')
const { getUserStatus } = require('../controllers/user')

const router = Router()

router.get('/', getUserStatus, index)

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop',
        isLoggedIn: req.isLoggedIn,
    })
})

module.exports = router