const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const route = require('./Routes/indexRoute');
const mongoDb = require('./dB/utils/connection');
const bodyParser = require('body-parser');

mongoDb.dbConnect();                                    //mongo connection

app.use(bodyParser.urlencoded({ extended: false }));    //body-parser 
app.use(bodyParser.json());


app.use('/', route);                                    //route Initialize

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})