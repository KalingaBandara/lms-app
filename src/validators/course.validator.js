const { body, param } = require('express-validator');

exports.requestBodyValidator = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),

//   Custom validator to check for extra fields
  body().custom((body) => {
    const allowedFields = ['title', 'description'];
    const extraFields = Object.keys(body).filter(key => !allowedFields.includes(key));

    if (extraFields.length > 0) {
      throw new Error(`Only 'title' and 'description' are allowed. Extra fields: ${extraFields.join(', ')}`);
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

exports.requestParamIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid courseId')
];

exports.requestParamUserIdValidator = [
  param('userId')
    .isMongoId().withMessage('Invalid userId')
];

exports.requestParamCourseIdValidator = [
  param('courseId')
    .isMongoId().withMessage('Invalid courseId')
];

exports.requestParamTeacherIdValidator = [
  param('teacherId')
    .isMongoId().withMessage('Invalid teacherId')
];

