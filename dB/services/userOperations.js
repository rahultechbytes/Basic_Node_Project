const User = require('../models/userSchema');

register = (userDetail) => {
    console.log("inside register function",userDetail); 
    return userDetail.save()
};

module.exports = {
    register
}