const mongoose = require('mongoose');
const dbConfig = require('./dbConfig');

function dbConnect() {
    mongoose.connect(dbConfig.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connection.once('open', () => {
        console.log(`db started on URL: ${process.env.DB_URL}`);
    });
}

module.exports = {
    dbConnect
}