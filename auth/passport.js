const userOperations = require('../dB/services/userOperations');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'emailId',
    passwordField: 'password'
},
    function (username, password, done) {
        console.log("=================> Here", username, password)
        userOperations.signInUser(username, password).then(result => {
            if (result) {
                done(null, result)
            } else {
                done(null, false, { message: "invalid username/password" })
            }
        }).catch(err => {
            console.log("Error in DB OPERATION>>>", err);
        })
    })
);
