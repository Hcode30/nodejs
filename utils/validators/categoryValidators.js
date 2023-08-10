import { validateMiddleware } from '../../middleWares/validatorMiddleware.js';
import { param, body } from 'express-validator';

export const createValidator = [
  body('name')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Minimum number of letters for name is 3')
    .isLength({ max: 32 })
    .withMessage('Maximum number of letters for name is 32'),
  body('image').notEmpty().isURL().withMessage('Not A Valid Image url'),

  validateMiddleware,
];

export const getValidator = [
  param('id').isMongoId().withMessage('Category ID is not valid.'),
  validateMiddleware,
];

export const updateValidator = [
  param('id').isMongoId().withMessage('Category ID is not valid.'),
  body('name')
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Minimum number of letters for name is 3')
    .isLength({ max: 32 })
    .withMessage('Maximum number of letters for name is 32'),
  body('image')
    .optional()
    .notEmpty()
    .isURL()
    .withMessage('Not A Valid Image url'),
  validateMiddleware,
];

export const deleteValidator = [
  param('id').isMongoId().withMessage('Category ID is not valid.'),
  validateMiddleware,
];
