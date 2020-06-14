const { Router } = require('express')

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


module.exports = router