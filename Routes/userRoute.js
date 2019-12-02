const express = require('express');
const router = express.Router()
const Users = require('../dB/models/userSchema');
const userOperations = require('../dB/services/userOperations');

router.get('/', (req, res) => {
    res.send("SERVER running successfully");
});

router.post('/signup', (req, res) => {
    const userDetail = req.body;
    console.log("req.body.firstName", req.body.firstName);
    let newUser = new Users({
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        emailId: userDetail.emailId,
        password: userDetail.password,
        address: userDetail.address,
        phoneNo: userDetail.phoneNo
    });
    console.log("Users>>>", newUser);
    userOperations.register(newUser).then(data=>{
        console.log("data>>>", data)
        res.status(200).send(data);
    }).catch(err=>{
        console.log("error>>>>>>>", err)
        res.status(404).send(err);
    })
});

module.exports = router;