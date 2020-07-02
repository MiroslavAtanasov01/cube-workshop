const indexRouter = require('../routes')
const authRouter = require('../routes/auth')
const cubeRouter = require('../routes/cube')
const accessoryRouter = require('../routes/accessory')

module.exports = (app) => {
    app.use('/', indexRouter)
    app.use('/', authRouter)
    app.use('/', cubeRouter)
    app.use('/', accessoryRouter)

    app.get('*', (req, res) => {
        res.render('404', {
            title: 'Error | Cube Workshop'
        })
    })

}