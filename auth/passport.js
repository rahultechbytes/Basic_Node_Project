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
            console.log("result ===> ", result);
            if (result) {
                console.log("inside success IF");
                done(null, result)
            } else {
                console.log("inside success ELSE")
                done(null, false, { message: "invalid username/password" })
            }
        }).catch(err => {
            console.log("Error in DB OPERATION>>>", err);
        })
    })
);
