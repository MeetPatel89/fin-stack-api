const express = require('express');
const logger = require('../logger');
const TransactionsService = require('../transactions-service');

const transactionsRouter = express.Router();
const bodyParser = express.json();

transactionsRouter
  .route('/api/transactions/:userId')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    const { userId } = req.params;

    TransactionsService.getTransactionsByUserId(knexInstance, userId)
      .then((transactions) => res.json(transactions))
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { userId } = req.params;
    const newTransaction = req.body;
    Object.assign(newTransaction, { user_id: userId });
    if (!newTransaction.category) {
      logger.error('Category is required');
      return res.status(400).send('Invalid data');
    }
    if (!newTransaction.accounts) {
      logger.error('Accounts is required');
      return res.status(400).send('Invalid data');
    }
    if (!newTransaction.amount) {
      logger.error('Amount is required');
      return res.status(400).send('Invalid data');
    }
    if (!newTransaction.date_time) {
      logger.error('Datetime is required');
      return res.status(400).send('Invalid data');
    }
    if (!newTransaction.type) {
        logger.error('Type is required');
        return res.status(400).send('Invalid data')
    }
    return TransactionsService.insertTransactions(knexInstance, newTransaction)
      .then((transaction) => res.status(201).json(transaction))
      .catch(next);
  });

transactionsRouter
  .route('/api/transactions/:id')
  .delete((req, res, next) => {
      const knexInstance = req.app.get('db');
      const { id } = req.params;
      TransactionsService.deleteTransactionsById(knexInstance, id)
        .then(transaction => {
            if (!transaction.length) {
                logger.error(`Transaction with id ${id} not found`);
                return res.status(400).send('Transaction not found')
            }
            return res.status(204).end();
        })
        .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
      const knexInstance = req.app.get('db');
      const { id } = req.params;
      const { category, type, accounts, amount, date_time } = req.body;
      const updatedTransaction = {
          category,
          type,
          accounts,
          amount,
          date_time
      }
      if (!updatedTransaction) {
          logger.error('At least one field is required to update transaction');
          return res.status(400).send('Invalid data')
      }
      
  })

module.exports = transactionsRouter;
