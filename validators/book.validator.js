const { body, validationResult, param } = require('express-validator');

const translatedMessage = (key) => (_value, { req }) => req.t(key);

const validateCreateBook =
[
    body('bookName')
      .notEmpty().withMessage(translatedMessage('validation.bookNameRequired'))
      .isLength({ min: 3, max: 100 }).withMessage(translatedMessage('validation.bookNameLength')),
    body('countInStock')
      .notEmpty().withMessage(translatedMessage('validation.countInStockRequired'))
      .isNumeric().withMessage(translatedMessage('validation.countInStockNumber'))
      .isInt({ min: 1, max: 100 }).withMessage(translatedMessage('validation.countInStockRange')),
    body('price')
      .notEmpty().withMessage(translatedMessage('validation.priceRequired'))
      .isNumeric().withMessage(translatedMessage('validation.priceNumber'))
      .isFloat({ min: 1, max: 1000 }).withMessage(translatedMessage('validation.priceRange')),
    body('image')
      .notEmpty().withMessage(translatedMessage('validation.imageRequired'))
      .isURL().withMessage(translatedMessage('validation.imageInvalid')),
  ]
  const validateUpdateBook = 
  [
    param('id').isMongoId().withMessage(translatedMessage('validation.invalidBookId')),
    body('bookName')
      .optional()
      .isLength({ min: 3, max: 100 }).withMessage(translatedMessage('validation.bookNameLength')),
    body('countInStock')
      .optional()
      .isNumeric().withMessage(translatedMessage('validation.countInStockNumber'))
      .isInt({ min: 1, max: 100 }).withMessage(translatedMessage('validation.countInStockRange')),
    body('price')
      .optional()
      .isNumeric().withMessage(translatedMessage('validation.priceNumber'))
      .isFloat({ min: 1, max: 1000 }).withMessage(translatedMessage('validation.priceRange')),
    body('image')
      .optional()
      .isURL().withMessage(translatedMessage('validation.imageInvalid')),
  ]

  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
    next();
  }

  const validateBookId = [
    param('id').isMongoId().withMessage(translatedMessage('validation.invalidBookId')),
  ];

  module.exports = {
    validateCreateBook,
    validateUpdateBook,
    handleValidationErrors,
    validateBookId
  };