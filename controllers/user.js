const env = process.env.NODE_ENV || 'development'

const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]
const bcrypt = require('bcrypt')
const User = require('../models/user')

const generateToken = data => {
    const token = jwt.sign(data, privateKey)

    return token
}

const saveUser = async (req, res) => {
    // hashing
    const { username, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({ username, password: hashedPassword })
    const userObj = await user.save()

    if (status) {
        const token = generateToken({
            userID: userObj._id,
            username: userObj.username
        })
        res.cookie('aid', token);
    }


    return true
}

const verifyUser = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const status = bcrypt.compare(password, user.password)

    if (status) {
        const token = generateToken({
            userID: user._id,
            username: user.username
        })
        res.cookie('aid', token);
    }


    return status
}

const checkAuth = (req, res, next) => {
    const token = req.cookie['aid']

    if (!token) {
        res.redirect('/')
    }

    const decodedObj = jwt.verify(token, config.privateKey)
    next()
}

module.exports = {
    saveUser,
    verifyUser,
    checkAuth
}