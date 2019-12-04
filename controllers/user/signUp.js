const userOperations = require('../../dB/services/userOperations');


module.exports.signUp = (req, res) => {
    const userDetail = req.body;
    userOperations.register(userDetail).then(data => {
        console.log("Data", data);
        res.status(200).json({
            'statusCode': 200,
            'success': true,
            'timestamp': new Date(),
            'message': 'REGISTERED',
            'data': data,
        })
    }).catch(err => {
        console.log("catch of signUp", err)
        res.status(404).send(err);
    })
}
