import { validateMiddleware } from '../../middleWares/validatorMiddleware.js';
import { param, body } from 'express-validator';

export const createValidator = [
  body('email').isEmail().withMessage('Not A Valid Email'),
  body('name')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Minimum number of letters for name is 3')
    .isLength({ max: 32 })
    .withMessage('Maximum number of letters for name is 32'),
  body('age').isNumeric({ no_symbols: true }).withMessage('Not A Valid age'),
  body('image').notEmpty().isURL().withMessage('Not A Valid Image url'),

  validateMiddleware,
];

export const getValidator = [
  param('id').isMongoId().withMessage('User ID is not valid.'),
  validateMiddleware,
];

export const updateValidator = [
  param('id').isMongoId().withMessage('User ID is not valid.'),
  body('email').optional().isEmail().withMessage('Not A Valid Email'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Minimum number of letters for name is 3')
    .isLength({ max: 32 })
    .withMessage('Maximum number of letters for name is 32'),
  body('age')
    .optional()
    .isNumeric({ no_symbols: true })
    .withMessage('Not A Valid age'),
  body('image')
    .optional()
    .notEmpty()
    .isURL()
    .withMessage('Not A Valid Image url'),
  validateMiddleware,
];

export const deleteValidator = [
  param('id').isMongoId().withMessage('User ID is not valid.'),
  validateMiddleware,
];
