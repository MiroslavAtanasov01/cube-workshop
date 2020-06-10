module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://user:softuni-password@cluster0-tfdcl.azure.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};