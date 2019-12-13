const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.passEncode = async (pwd) =>{
    let pass = await bcrypt.hash(pwd, saltRounds);
    return pass;
}


module.exports.passCompare = async (userPwd, encodedPwd) => {
    let passCompareRes = await bcrypt.compare(userPwd, encodedPwd)
    return passCompareRes;
}


