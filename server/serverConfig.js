import morgan from 'morgan';

export function getConfig(APP, MODE, DEV_PORT, PROD_PORT) {
  if (MODE === 'Development') {
    APP.use(morgan('dev'));
    const config = { port: DEV_PORT, mode: MODE };
    return config;
  } else {
    const config = { port: PROD_PORT, mode: MODE };
    return config;
  }
}
