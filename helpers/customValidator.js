const { validationResult } = require('express-validator');
const { body } = require('express-validator')

const signupValidations = [
    body('firstName').not().isEmpty().withMessage('First Name is required.'),
    body('lastName').not().isEmpty().withMessage('Last Name is required.'),
    body('emailId').not().isEmpty().withMessage('please enter a valid Email address.').normalizeEmail().isEmail(),
    body('password')
        .not().isEmpty().withMessage('password is required')
        .isLength({ min: 10, max: 32 })
        .withMessage('must be 10 to 32 characters')
        .withMessage('password should be combination of one uppercase,'
            + ' one lower case, one special char, one digit'),
];

const loginValidation = [
    body('password').isLength({ min: 5 }),
];

const validate = (validations) => async (req, res, next) => {
    // console.log("validations >>>>>", validations)
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.json({
        'statusCode': 400,
        'success': false,
        'timestamp': new Date(),
        'message': 'INPUT VALIDATION FAILED',
        errors: errors.array()
    })
}

module.exports = {
    loginValidation,
    signupValidations,
    validate
}

