import morgan from 'morgan';

export default function getConfig(APP, MODE, DEV_PORT, PROD_PORT) {
  if (MODE === 'Development') {
    APP.use(morgan('dev'));
    const config = { port: DEV_PORT, mode: MODE };
    return config;
  }
  return { port: PROD_PORT, mode: MODE };
}
