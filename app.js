const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const route = require('./Routes/indexRoute');
const mongoDb = require('./dB/utils/connection');
const bodyParser = require('body-parser');

mongoDb.dbConnect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', route);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})