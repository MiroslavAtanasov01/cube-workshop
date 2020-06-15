const { index } = require('../controllers/cubes')
const { Router } = require('express')

const router = Router()

router.get('/', index)
// const cubes = await getAllCubes()
// res.render('index', {
//     title: 'Cube Workshop',
//     cubes
// })

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    })
})

module.exports = router