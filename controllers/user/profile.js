const userOperations = require('../../dB/services/userOperations');

module.exports.userProfile = (req, res) =>{
    userOperations.usersList().then(data=>{
        res.json({
            'statusCode': 200,
            'success': true,
            'timestamp': new Date(),
            'message': 'FETCHED ALL USERS',
            data,
        })
    })
} 