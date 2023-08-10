//  ===== Global Imports =====

import express from 'express';

import dotenv from 'dotenv';

//  ===== Local Imports =====

import { ConnectToDB } from './config/Database.js';

import { runServer } from './server/runServer.js';

import { getConfig } from './server/serverConfig.js';

import { routerAccess } from './routes/categoryRoute.js';

import { ApiError } from './utils/apiError.js';

import { globalError } from './middleWares/errorMiddleWare.js';

//  ===== Initiate Express App =====

const app = express();

// Initiate The Router

const router = express.Router();

//  ===== Setup Environment Variables =====

dotenv.config({ path: './config.env' });

export const MODE = process.env.NODE_ENV;
const DEV_PORT = process.env.DEV_PORT;
const PROD_PORT = process.env.PROD_PORT;
const DB_URL = process.env.DB_URL;

//  ===== Connect To Database =====

ConnectToDB(DB_URL);

//  ===== Middlewares =====

// JSON Middleware

app.use(express.json());

//  ===== Welcome Message =====

app.get('/', (req, res) => {
  res.send(
    '<h1 style="text-align:center;color:#121278" >Hi From BackEnd again</h1>'
  );
});

// Operate On Used Routes

app.use('/api/v1/categories', router);
routerAccess(router, MODE);

// Operate On Unused Routes

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find the requested route: ${req.originalUrl}`, 404));
});

// Handle Express Errors

app.use(globalError);

//  ===== Run The Server =====

let config = getConfig(app, MODE, DEV_PORT, PROD_PORT);
let server = runServer(app, config.port, config.mode);

// ===== Handle Promises Errors =====

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error : ${err.name} | ${err.message}`);

  server.close(() => {
    console.error('Shutting Down Server ...');
    process.exit(1);
  });
});
//  ===== End =====
