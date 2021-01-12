const express = require('express');
const AccountsService = require('../accounts-service');
const logger = require('../logger');

const accountsRouter = express.Router();
const bodyParser = express.json();

accountsRouter
  .route('/api/accounts/:userId')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    const { userId } = req.params;
    AccountsService.getAccountsByUserId(knexInstance, userId)
      .then((accounts) => res.json(accounts))
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const newAccount = {
      accounts: req.body.accounts,
      user_id: req.params.userId,
    };
    if (!newAccount.user_id) {
      logger.error('User id is required');
      return res.status(400).send('Invalid data');
    }
    if (!newAccount.accounts) {
      logger.error('Account is required');
      return res.status(400).send('Invalid data');
    }
    return AccountsService.insertAccount(knexInstance, newAccount)
      .then((account) => res.status(201).json(account))
      .catch(next);
  });

module.exports = accountsRouter;
