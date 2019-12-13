const assert = require('assert');
const validate = require('../../test/user');

run();
function run(){
    describe('/signIn', function () {
        it('return INPUT VALIDATION Failed', (done) => {
            req.post({
                url: '/signIn',
                body: {},
                json: true
            }, function (err, response, body) {
                let cust_valid = validate()
                assert.equal({
                    'statusCode': 400,
                    'success': false,
                    'timestamp': new Date(),
                    'message': 'INPUT VALIDATION FAILED',
                })
                done()
            })
        })
    })
}
