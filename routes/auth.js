const router = require('express')()
const { saveUser, verifyUser, getUserStatus } = require('../controllers/user')

router.get('/login', getUserStatus, (req, res) => {
    res.render('loginPage', {
        title: 'Login | Cube Workshop',
    })
})

router.get('/register', getUserStatus, (req, res) => {
    res.render('registerPage', {
        title: 'Register | Cube Workshop',
    })
})

router.post('/register', async (req, res) => {
    const { password, repeatPassword } = req.body

    if (!password || password.length < 8 || password.match(/^[A-Za-z0-9]+$/g) || password !== repeatPassword) {
        return res.render('registerPage', {
            error: 'Username or password is not valid'
        })
    }

    const { error } = await saveUser(req, res)

    if (error) {
        return res.render('registerPage', {
            error: 'Username or password is not valid'
        })
    }

    res.redirect('/')
})

router.post('/login', async (req, res) => {
    const { error } = await verifyUser(req, res)

    if (error) {
        return res.render('loginPage', {
            error: 'Username or password is not correct'
        })
    }

    res.redirect('/')
})

module.exports = router