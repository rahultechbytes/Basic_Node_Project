const express = require('express');
const router = express.Router()
const userOperations = require('../dB/services/userOperations');
const {validate, signupValidations, loginValidation} = require('../helpers/customValidator');

router.get('/', (req, res) => {
    res.send("SERVER running successfully");
});

router.post('/signup', validate(signupValidations),
    (req, res) => {
        const userDetail = req.body;
        userOperations.register(userDetail).then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(404).send(err);
        })
    }
);

router.post('/signIn', (req,res)=>{
    const userData = req.body;
    userOperations.signInUser(userData).then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        console.log("inside catch", err );
        res.status(400).send(err);
    })
})

module.exports = router;