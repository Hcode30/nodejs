import { ApiError } from '../utils/apiError.js';
import AsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

export const validateMiddleware = AsyncHandler((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ApiError(errors.array({ onlyFirstError: true })[0].msg, 404)
    );
  }
  next();
});
