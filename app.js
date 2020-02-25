const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// const port = normalizePort(process.env.PORT || '3000');
const route = require('./Routes/indexRoute');
const mongoDb = require('./dB/utils/connection');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const job = require('./utils/cronJob');
const https = require('https');
const fs = require('fs');

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

job.start()                                           //CRON JOB

// const { dbDump } = require('./dB/utils/dbBackup');
// dbDump()

app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    }
    else {
        res.redirect(307, 'https://' + req.hostname + ':' + 5003 + req.url);
    }
});


app.use('/', route);

var options = {
    key: fs.readFileSync(__dirname + '/cert/private.key'),
    cert: fs.readFileSync(__dirname + '/cert/certificate.pem')
}
var secureServer = https.createServer(options, app);

secureServer.listen(5003, () => {
    console.log('HTTPS Server listening on port ', 5003);
});

//route Initialize

// app.listen(PORT, () => {
//     console.log('HTTP server running on port', PORT);
// })