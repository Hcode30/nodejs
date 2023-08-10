/* eslint-disable import/extensions */
import AsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import ApiError from '../utils/apiError.js';

export default AsyncHandler((req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ApiError(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }
  next();
});
