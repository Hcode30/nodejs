export const globalError = (error, req, res, next) => {
  const mode = process.env.NODE_ENV;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (mode === 'Development') {
    errorForDev(res, error);
  } else if (mode === 'Production') {
    errorForProductiuon(res, error);
  }
};

const errorForDev = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    msg: error.message,
    statusCode: error.statusCode,
    stack: error.stack,
  });
};

const errorForProductiuon = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    msg: error.message,
    statusCode: error.statusCode,
  });
};
