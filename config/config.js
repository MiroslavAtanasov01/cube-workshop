module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://user:softuni-password@softuni-l24ab.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};