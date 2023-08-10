import { validateMiddleware } from '../../middleWares/validatorMiddleware.js';
import { param } from 'express-validator';
// used to handle validation errors in an Express application.

export const IdValidator = [
  param('id').isMongoId().withMessage('User ID is not valid.'),
  validateMiddleware,
];
