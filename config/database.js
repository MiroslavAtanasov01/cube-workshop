const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
    return mongoose.connect(config.development.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }

        console.log('Database setup and running');
    })
}



