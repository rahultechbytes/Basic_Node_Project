const express = require('express');
const router = express.Router()
const { validate, signupValidations, loginValidation } = require('../helpers/customValidator');
const signUpFile = require('../controllers/user/signUp');
const signInFile = require('../controllers/user/signIn');
const userFile = require('../controllers/user/profile');
const verifyToken = require('../auth/jwtVerification');

router.get('/', (req, res) => {
    res.send("SERVER running successfully");
});

router.post('/signIn', validate(loginValidation), signInFile.signIn)

router.post('/signup', validate(signupValidations), signUpFile.signUp);

router.get('/profiles', verifyToken, userFile.userProfile);

router.delete('/deleteUser', verifyToken, userFile.userDelete)


module.exports = router;