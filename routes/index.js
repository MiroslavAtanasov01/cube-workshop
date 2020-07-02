const router = require('express')()
const { getUserStatus } = require('../controllers/user')
const Cube = require('../models/cube')


router.get('/', getUserStatus, async (req, res, next) => {
    const { from, to, search } = req.query;
    let query = {};

    if (search) {
        query = { ...query, name: { $regex: new RegExp("^" + search.toLowerCase(), "i") } }
    }
    if (to) {
        query = { ...query, difficultyLevel: { $lte: +to } }
    }
    if (from) {
        query = { ...query, difficultyLevel: { ...query.difficultyLevel, $gte: +from } }
    }

    Cube.find(query).then(cubes => {
        res.render('index', {
            title: 'Cube Workshop', cubes, search, from, to
        });
    }).catch(next);

})

router.get('/logout', (req, res) => {
    res.clearCookie('aid')

    res.redirect('/')
})

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop',
    })
})

module.exports = router