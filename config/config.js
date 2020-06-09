module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://${process.env.DB_PASSWORD}@softuni-l24ab.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};