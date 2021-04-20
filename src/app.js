require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const logger = require('./logger');
const usersRouter = require('./users/users-router');
const accountsRouter = require('./accounts/accounts-router');
const categoriesRouter = require('./categories/categories-router');
const transactionsRouter = require('./transactions/transactions-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(usersRouter);
app.use(accountsRouter);
app.use(categoriesRouter);
app.use(transactionsRouter);

app.get('/', (req, res) => {
  res.send('Hello Fin Stack! Some more elaborate way to welcome you to this application fin stack!');
});

app.use(
  (errorHandler = (error, req, res, next) => {
    let response;
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } };
    } else {
      console.error(error);
      response = { message: error.message, error };
    }
    res.status(500).json(response);
  })
);

module.exports = app;
