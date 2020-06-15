const { Router } = require('express')
const { saveUser, verifyUser } = require('../controllers/user')

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

router.post('/login', async (req, res) => {
    const status = await verifyUser(req, res)

    if (status) {
        return res.redirect('/')
    }

    res.redirect('/')
})



module.exports = router