const User = require('../models/userSchema');
const bcrypt = require('../../helpers/bcrypt')

const register = async (userDetail) => {
    let userPwd = await bcrypt.passEncode(userDetail.password);
    let newUser = new User({
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        emailId: userDetail.emailId,
        password: userPwd,
        address: userDetail.address,
        phoneNo: userDetail.phoneNo
    });
    return newUser.save()
};

const signInUser = async (emailId, userPassword) => {
    let userDetail = await User.findOne({ emailId: emailId })
    let decodedPwd = await bcrypt.passCompare(userPassword, userDetail.password);
    if(decodedPwd){
        return userDetail;
    }
}

const usersList = () => {
    return User.find({});
}

const deleteUser = (id) => {
    return User.findByIdAndDelete({ _id: id });
}

module.exports = {
    register,
    signInUser,
    usersList,
    deleteUser
}