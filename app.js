const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const route = require('./Routes/indexRoute');
const mongoDb = require('./dB/utils/connection');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const job = require('./utils/cronJob');

mongoDb.dbConnect();                                    //mongo connection

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));    //body-parser 
app.use(bodyParser.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
}));

app.use(passport.initialize());
app.use(passport.session());
require('./auth/passport');
app.use(flash());

job.start                                           //CRON JOB

// const { dbDump } = require('./dB/utils/dbBackup');
// dbDump()

app.use('/', route);                                    //route Initialize

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})