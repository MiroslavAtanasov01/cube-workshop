const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const privateKey = 'CUBE-WORKSHOP-SOFTUNI'

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

module.exports = {
    saveUser,
    verifyUser
}