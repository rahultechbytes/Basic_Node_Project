const User = require('../models/userSchema');

register = (userDetail) => {
    let newUser = new User({
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        emailId: userDetail.emailId,
        password: userDetail.password,
        address: userDetail.address,
        phoneNo: userDetail.phoneNo
    });
    return newUser.save()
};

signInUser = (userDetail) =>{
    return User.find({
        emailId: userDetail.emailId,
        password: userDetail.password
    });
} 

module.exports = {
    register,
    signInUser
}