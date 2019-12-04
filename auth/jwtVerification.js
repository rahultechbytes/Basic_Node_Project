const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authentication, SECRET, function (err, decoded) {
        if(err){
            res.status(404).json({
                'statusCode': 404,
                'success': false,
                'timestamp': new Date(),                
                'message': 'INVALID TOKEN'
            })
        }
        else{
            req.user = decoded;
            next();
        }
    });
}

module.exports = verifyToken;