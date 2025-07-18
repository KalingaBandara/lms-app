const { body, param } = require('express-validator');

exports.requestBodyValidator = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),

//   Custom validator to check for extra fields
  body().custom((body) => {
    const allowedFields = ['name', 'email'];
    const extraFields = Object.keys(body).filter(key => !allowedFields.includes(key));

    if (extraFields.length > 0) {
      throw new Error(`Only 'name' and 'email' are allowed. Extra fields: ${extraFields.join(', ')}`);
    }

    return true;
  })
];


exports.emptyRequestBodyValidator = [
    (req, res, next) => {
      if (req.body && Object.keys(req.body).length > 0) {
        return res.status(400).json({
          message: "GET request should not have a request body"
        });
      }
      next();
    }
  ];

exports.requestParamValidator = [
  param('id')
    .isMongoId().withMessage('Invalid teacherId')
];

