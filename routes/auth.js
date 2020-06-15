const { Router } = require('express')
const User = require('../models/user')
const { saveUser } = require('../controllers/user')

const router = Router()

router.get('/login', (req, res) => {
    res.render('loginPage', {
        title: 'Login | Cube Workshop'
    })
})

router.get('/register', (req, res) => {
    res.render('registerPage', {
        title: 'Register | Cube Workshop'
    })
})

router.post('/register', async (req, res) => {
    const status = await saveUser(req, res)

    if (status) {
        return res.redirect('/')
    }
})


module.exports = router