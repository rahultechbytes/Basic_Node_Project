// const userOperations = require('../../dB/services/userOperations');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET


module.exports.signIn = (req, res) => {
    console.log("inside signIn")
    const userData = req.body;
    console.log("userdata>>>", userData);
    jwt.sign({ userData: userData.emailId }, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            console.log("jwt token error", err);
            res.status(404).json({
                'statusCode': 404,
                'success': false,
                'timestamp': new Date(),
                'message': 'TOKEN ERROR',
                err
            });
        }
        else {
            console.log("token", token)
            res.status(200).json({
                'statusCode': 200,
                'success': true,
                'timestamp': new Date(),
                'message': 'USER LOGIN SUCCESSFULLY',
                Data: userData,
                token
            });
        }
    });
}

// module.exports.signIn = (req, res) => {
//     const userData = req.body;
//     userOperations.signInUser(userData).then(data => {
//         if (data.emailId && data.password) {
//             jwt.sign({ userData: userData }, secretKey, { expiresIn: '1h' }, (err, token) => {
//                 if (err) {
//                     console.log("jwt token error", err);
//                     res.status(404).json({
//                         'statusCode': 404,
//                         'success': false,
//                         'timestamp': new Date(),
//                         'message': 'TOKEN ERROR',
//                         err
//                     });
//                 }
//                 else {
//                     res.status(200).json({
//                         'statusCode': 200,
//                         'success': true,
//                         'timestamp': new Date(),
//                         'message': 'USER LOGIN SUCCESSFULLY',
//                         data,
//                         token
//                     });
//                 }
//             });
//         }
//         else {
//             res.status(200).json({
//                 'statusCode': 200,
//                 'success': false,
//                 'timestamp': new Date(),
//                 'message': 'USER DONT EXIST',
//                 data,
//             });
//         }
//     }).catch(err => {
//         res.status(400).json({
//             'statusCode': 404,
//             'success': false,
//             'timestamp': new Date(),
//             'message': 'The User ID or Password you entered does not match',
//             error: err
//         });
//     })

// }