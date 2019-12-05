const userOperations = require('../../dB/services/userOperations');

module.exports.userProfile = (req, res) => {
    userOperations.usersList().then(data => {
        res.json({
            'statusCode': 200,
            'success': true,
            'timestamp': new Date(),
            'message': 'FETCHED ALL USERS',
            data,
        })
    })
}

module.exports.userDelete = (req, res) => {
    const userid = req.query.id;
    userOperations.deleteUser(userid).then(data=>{
        res.status(200).json({
            'statusCode': 200,
            'success': true,
            'timestamp': new Date(),
            'message': 'USER DELETED',
            data
        });
    }).catch(err=>{
        res.status(400).json({
            'statusCode': 404,
            'success': false,
            'timestamp': new Date(),
            'message': 'USER NOT DELETED',
            error: err
        });
    })
}